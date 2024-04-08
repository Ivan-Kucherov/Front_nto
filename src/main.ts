//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps';

import App from './App.vue'
import router from './router'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import CoreUI from '@coreui/vue'
import axios from 'axios'

const app = createApp(App)
axios.defaults.baseURL = 'http://127.0.0.1:8000'
axios.defaults.headers.post['Content-Type'] = 'application/json'
app.use(createYmaps({
    apikey: '35947662-8410-4e55-974a-a80dbb97c767',
  }))
app.use(createPinia())
app.use(router)
app.use(CoreUI)
app.mount('#app')
