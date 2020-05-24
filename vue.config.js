const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'prod'
const cdn = {
  css: [],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/xlsx@0.16.0/dist/xlsx.min.js',
    'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js'
  ]
}

module.exports = {
  chainWebpack: config => {
    if (isProduction) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      // GZIP
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.json$|\.css/,
        threshold: 10240,
        minRatio: 0.8
      }))
      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      }
      config.externals = {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'xlsx': 'xlsx',
        'lodash': '_',
        'lodash-es': '_'
      }
    }
  },
  pluginOptions: {
    i18n: {
      'locale': 'zh',
      'fallbackLocale': 'en',
      'localeDir': 'locales',
      'enableInSFC': false
    },
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  productionSourceMap: false,
  transpileDependencies: [
    'vuetify',
    'vuex-module-decorators'
  ],
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8889',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    disableHostCheck: true
  }
}
