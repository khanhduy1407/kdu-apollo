import Kdu from 'kdu'
import { CombinedKduInstance } from 'kdu/types/kdu'
import { DollarApollo } from './kdu-apollo'
import { KduApolloComponentOptions } from './options'
import { ApolloProvider } from './apollo-provider'

type DataDef<Data, Props, V> = Data | ((this: Readonly<Props> & V) => Data)

declare module 'kdu/types/options' {
  interface ComponentOptions<V extends Kdu, Data, Methods, Computed, PropsDef, Props> {
    apolloProvider?: ApolloProvider
    apollo?: KduApolloComponentOptions<
      Data extends DataDef<infer D, any, any>
        ? CombinedKduInstance<V, D, Methods, Computed, Props>
        : CombinedKduInstance<V, Data, Methods, Computed, Props>
      >
  }
}

declare module 'kdu/types/kdu' {
  interface Kdu {
    $apolloProvider: ApolloProvider
    $apollo: DollarApollo<this>
  }
}
