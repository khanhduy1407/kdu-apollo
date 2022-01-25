/* eslint no-unused-vars: 0 */

import Kdu, { AsyncComponent } from 'kdu'
import { ApolloClient } from 'apollo-client'
import {
  KduApolloComponentOptions,
  WatchLoading,
  ErrorHandler
} from './options'

export type KduApolloComponent<V extends Kdu = Kdu> = KduApolloComponentOptions<V> | typeof Kdu | AsyncComponent

export class ApolloProvider<TCacheShape=any> {
  provide: (key?: string) => this
  constructor (options: {
    defaultClient: ApolloClient<TCacheShape>,
    defaultOptions?: KduApolloComponentOptions<Kdu>,
    clients?: { [key: string]: ApolloClient<TCacheShape> },
    watchLoading?: WatchLoading,
    errorHandler?: ErrorHandler,
    prefetch?: boolean
  })
  clients: { [key: string]: ApolloClient<TCacheShape> }
  defaultClient: ApolloClient<TCacheShape>
}
