import Kdu from 'kdu'
import {
  WatchQueryOptions,
  OperationVariables,
  MutationOptions,
  SubscriptionOptions,
  SubscribeToMoreOptions,
  ObservableQuery,
  NetworkStatus,
  ApolloQueryResult,
  ApolloError
} from 'apollo-client'
import { FetchResult } from 'apollo-link'
import { ServerError, ServerParseError } from 'apollo-link-http-common'
import { DocumentNode, GraphQLError } from 'graphql'
import { DeepApplyThisType } from './utils'

/* Component options */

export interface AllKduApolloComponentSpecialOptions {
  $skip: boolean
  $skipAllQueries: boolean
  $skipAllSubscriptions: boolean
  $deep: boolean
  $client: string
  $loadingKey: string
  $watchLoading: WatchLoading
  $error: ErrorHandler
  $query: Partial<KduApolloQueryDefinition>
  $subscribe: KduApolloSubscriptionProperty
}

export type KduApolloComponentSpecialOptions =
  Partial<AllKduApolloComponentSpecialOptions>

interface PrivateKduApolloComponentOptions extends KduApolloComponentSpecialOptions {
  [key: string] : KduApolloQueryProperty |
    KduApolloComponentSpecialOptions[keyof KduApolloComponentSpecialOptions]
}

// DeepApplyThisType is buggy: https://github.com/microsoft/TypeScript/issues/33392
// export type KduApolloComponentOptions<Instance> = DeepApplyThisType<PrivateKduApolloComponentOptions, Instance>
export type KduApolloComponentOptions<Instance> = PrivateKduApolloComponentOptions & ThisType<Instance>

/* Special component options */

export type WatchLoading = (isLoading: boolean, countModifier: number) => void
export type ErrorHandler = (error: ApolloError) => void

/* Query */

type QueryVariables<Variables = OperationVariables> = (() => Variables) | Variables

export type KduApolloQueryProperty =
  DocumentNode |
  KduApolloQueryDefinition |
  (() => KduApolloQueryDefinition | null)

// exclude query prop because it causes type incorrectly error
type WatchQueryOptionsWithoutQuery = Omit<WatchQueryOptions, 'query'>

export interface KduApolloQueryDefinition<Result = any, Variables = OperationVariables> extends WatchQueryOptionsWithoutQuery {
  query: DocumentNode | (() => DocumentNode | null)
  variables?: QueryVariables<Variables>
  update?: (data: Result) => any
  result?: (result: ApolloQueryResult<Result>, key: string) => void
  error?: ErrorHandler
  manual?: boolean
  loadingKey?: string
  watchLoading?: WatchLoading
  skip?: (() => boolean) | boolean
  prefetch?: ((context: any) => any) | boolean
  client?: string
  deep?: boolean
  subscribeToMore?: KduApolloSubscribeToMoreOptions<Result, Variables> | KduApolloSubscribeToMoreOptions<Result, Variables>[]
}

/* Subscriptions */

export interface KduApolloSubscribeToMoreOptions<Result = any, Variables = OperationVariables> extends Omit<SubscribeToMoreOptions<Result, Variables>, 'variables'> {
  variables?: QueryVariables<Variables>
}

export interface KduApolloSubscriptionDefinition<Variables = OperationVariables> extends Omit<SubscriptionOptions<Variables>, 'variables'> {
  variables?: QueryVariables<Variables>
  client?: string
}

export type KduApolloSubscriptionProperty =
  KduApolloSubscriptionDefinition |
  { [key: string]: KduApolloSubscriptionDefinition }
