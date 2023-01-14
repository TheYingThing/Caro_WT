const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pwa: {
    name: 'Caro PWA',
    shortName: 'Caro',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    manifestOptions: {
      start_url: '/'
    },
    workboxOptions: {
      skipWaiting: true
    },
    workboxPluginMode: 'GenerateSW'
  }
})
