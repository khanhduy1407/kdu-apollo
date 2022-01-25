import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    file: 'dist/kdu-apollo.umd.js',
    format: 'umd',
    name: 'kdu-apollo',
  },
})

export default config
