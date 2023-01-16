const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pwa: {
    name: 'Caro PWA',
    shortName: 'Caro',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    manifestOptions: {
      start_url: '/',
      icons: [{
        src: './img/icons/32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: './img/icons/16.png',
            sizes: '16x16',
          type: 'image/png'
      },
      {
        src: './img/icons/152.png',
            sizes: '152x152',
          type: 'image/png'
      },
      {
        src: './img/icons/caro-logo.svg',
            sizes: '942x942',
          type: 'image/svg+xml'
      },
      {
        src: './img/icons/144.png',
            sizes: '144x144',
          type: 'image/png'
      },
    ]
    },
    iconPaths: {
      faviconSVG: 'img/icons/caro-logo.svg',
      favicon32: 'img/icons/32.png',
      favicon16: 'img/icons/16.png',
      appleTouchIcon: 'img/icons/152.png',
      maskIcon: 'img/icons/caro-logo.svg',
      msTileImage: 'img/icons/144.png'
    },
    workboxPluginMode: 'GenerateSW'
  }
})
