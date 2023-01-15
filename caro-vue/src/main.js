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
import register from './service-worker/register-service-worker'
import $ from 'jquery';


const vuetify = createVuetify({
    components,
    directives,
})

export const noneBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAK0lEQVRIie3NMREAMAgEMMC/tPdUXHAdEgPpJK+OzFUkk8lkMplMJpN9mS0qlQOZEPedEwAAAABJRU5ErkJggg==";
export const redBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAABCaVRYdE1pY3Jvc29mdC5HYW1lRFZSLklkAAAAZW4tdXMAAGYyY2Q0NjlhLWNiZWUtNGYxZC1iNzY4LWNiYzE2MzAyMDkzNyUxQdsAAABNaVRYdE1pY3Jvc29mdC5HYW1lRFZSLlRpdGxlAAAAZW4tdXMAAGNvbG9yIHBpY2tlciAtIEdvb2dsZSBTZWFyY2ggLSBHb29nbGUgQ2hyb21lEyYDSgAAADRpVFh0TWljcm9zb2Z0LkdhbWVEVlIuQXV0aG9yAAAAZW4tdXMAAE1pY3Jvc29mdCBHYW1lIERWUooun3sAAAA0aVRYdE1pY3Jvc29mdC5HYW1lRFZSLkJhc2ljAAAAZW4tdXMAADAhISEhISEwISEwISExMzM3ISF/zRQDAAAAZWlUWHRNaWNyb3NvZnQuR2FtZURWUi5CYXNpY0hhc2gAAABlbi11cwAANTVkZjExMWE1MjlkNWY4YWRiNzk3N2U0NTRmMzdmZjUyMDMyZjdhNjVmODBhZDBlMTY5YmM2NDM3Y2NmOWI0YpP6+fAAAAC9aVRYdE1pY3Jvc29mdC5HYW1lRFZSLkV4dGVuZGVkAAEAZW4tdXMAAHicfYyxDsIgFEX/5c3FFIrUMrt0cbGTxuH18RqbtGAAjYnx30U/wPHmnHNfsATCpXdgYVLktOlQ0Mgs9CSdGFuzK5OkaWpVd00LFdxiIE7pgCuXiK4xrLzhJxf04Jjm4MHKClLGmIf5J6kSC6mEbAclrZZ2q09FZ+/+Cyu7Gff3iLm89v7IFLxLYOsvyugwI9jz5f0BpZM6o6gdqnQAAABgaVRYdE1pY3Jvc29mdC5HYW1lRFZSLkhhc2gAAABlbi11cwAANDQ3ZDY3NDc4NWZlOGRiOTk2ZTIxNWFkZTkzNTdiYWRlMzBlNWQ2NDFlNjJmYWExMTM4MmE2Nzk1MmJjNzhlYpv6bCcAAAAhdEVYdENyZWF0aW9uIFRpbWUAMjAyMDoxMjoxNyAyMjo0MTo1NFmCXawAAAA0SURBVEhL7c0hFQAwDMTQ6/xbqcaOzEBAyV4+CUx1Mll2Xlc5QZwgThAniBPECeIE+WWSXHpEAd6eFrCBAAAAAElFTkSuQmCC";
export const blackBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAA1SURBVEhL7c2xDQAwDMMwp///nHToAxqyFCJgeFQl6btV5/0qI4gRxAhiBDGCGEGMIL9EkgHQLwExeO5aQQAAAABJRU5ErkJggg==";
export const greyBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAzSURBVEhL7c2hAQAwDITAbyf8/ZdJTRdAxHEGyWk7WXZ/VzlBnCBOECeIE8QJ4gRxAiQP5eQCI2KRoTIAAAAASUVORK5CYII=";
export const whiteBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAySURBVEhL7c2hFQAgDMTQK/vv3CJYIKKGl28iU31l2Xld5QRxgjhBnCBOECeIE+SXSTJFYAQuGaPHiQAAAABJRU5ErkJggg==";


createApp(App).use(router)
    .use(vuetify)
    .use(Quasar, {plugins: {}})
    .mount('#app')


register()

if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_PWA_LOCAL_SERVE === 'true') {
  console.log(`PWA Local Serve: ${process.env.VUE_APP_PWA_LOCAL_SERVE}`) // eslint-disable-line no-console
  console.log(`Node Env: ${process.env.NODE_ENV}`) // eslint-disable-line no-console
}




