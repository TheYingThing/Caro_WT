import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from "./router";


createApp(App).use(router).mount('#app')

