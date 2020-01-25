module.exports = {
  'pluginOptions': {
    'i18n': {
      'locale': 'zh',
      'fallbackLocale': 'en',
      'localeDir': 'locales',
      'enableInSFC': false
    }
  },
  'transpileDependencies': [
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
