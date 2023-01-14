import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {quasar, transformAssetUrls} from "@quasar/vite-plugin";

// https://vitejs.dev/config/

export default defineConfig({
    transpileDependencies: true,
    pwa: {
        name: "workbox",
        themeColor: "#fff3e0",
        msTileColor: "#fff3e0",
        appleMobileWbeAppCapable: "yes",
        appleMobileWebAppStatusBarStyle: "#fff3e0",
        workboxPluginMode: "GenerateSW",
        workboxOptions: {
            //swSrc: "./service-worker.js",
            exclude: [/_redirect/, /\.map$/, /_headers/],
        },
        manifestOptions: {
            background_color: "#ffe24a",
        }
    },
    plugins: [
        vue({
            template: {transformAssetUrls}
        }),
        quasar({
            sassVariables: 'src/quasar-variables.sass'
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
