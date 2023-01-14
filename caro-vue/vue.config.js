const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pwa: {
    name: 'PWA App',
    shortName: 'App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    manifestOptions: {
      start_url: '/'
    },
    workboxPluginMode: 'GenerateSW'
  }
})
