import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    file: 'dist/kdu-apollo.esm.js',
    format: 'es',
    name: 'kdu-apollo',
  },
})

export default config
