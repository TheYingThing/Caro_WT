import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min'
import router from "./router/index.js";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import './registerServiceWorker'


const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(router)
    .use(vuetify)
    .use(Quasar, {plugins: {}})
    .mount('#app')

