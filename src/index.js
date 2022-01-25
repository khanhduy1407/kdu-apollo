import { DollarApollo } from './dollar-apollo'
import { ApolloProvider as plugin } from './apollo-provider'

import CApolloQuery from './components/ApolloQuery'
import CApolloSubscribeToMore from './components/ApolloSubscribeToMore'
import CApolloMutation from './components/ApolloMutation'

import { installMixin } from './mixin'
import { Globals, omit } from '../lib/utils'

const keywords = [
  '$subscribe',
]

export function install (Kdu, options) {
  if (install.installed) return
  install.installed = true

  Globals.Kdu = Kdu
  const kduVersion = Kdu.version.substr(0, Kdu.version.indexOf('.'))

  // Options merging
  const merge = Kdu.config.optionMergeStrategies.methods
  Kdu.config.optionMergeStrategies.apollo = function (toVal, fromVal, vm) {
    if (!toVal) return fromVal
    if (!fromVal) return toVal

    const toData = Object.assign({}, omit(toVal, keywords), toVal.data)
    const fromData = Object.assign({}, omit(fromVal, keywords), fromVal.data)

    const map = {}
    for (let i = 0; i < keywords.length; i++) {
      const key = keywords[i]
      map[key] = merge(toVal[key], fromVal[key])
    }

    return Object.assign(map, merge(toData, fromData))
  }

  // Lazy creation
  Object.defineProperty(Kdu.prototype, '$apollo', {
    get () {
      if (!this.$_apollo) {
        this.$_apollo = new DollarApollo(this)
      }
      return this.$_apollo
    },
  })

  installMixin(KduVersion)

  if (kduVersion === '2') {
    Kdu.component('apollo-query', CApolloQuery)
    Kdu.component('ApolloQuery', CApolloQuery)
    Kdu.component('apollo-subscribe-to-more', CApolloSubscribeToMore)
    Kdu.component('ApolloSubscribeToMore', CApolloSubscribeToMore)
    Kdu.component('apollo-mutation', CApolloMutation)
    Kdu.component('ApolloMutation', CApolloMutation)
  }
}

plugin.install = install

// eslint-disable-next-line no-undef
plugin.version = VERSION

// Apollo provider
export const ApolloProvider = plugin

// Components
export const ApolloQuery = CApolloQuery
export const ApolloSubscribeToMore = CApolloSubscribeToMore
export const ApolloMutation = CApolloMutation

// Auto-install
let GlobalKdu = null
if (typeof window !== 'undefined') {
  GlobalKdu = window.Kdu
} else if (typeof global !== 'undefined') {
  GlobalKdu = global.Kdu
}
if (GlobalKdu) {
  GlobalKdu.use(plugin)
}

export default plugin
