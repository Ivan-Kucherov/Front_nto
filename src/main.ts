//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import CoreUI from '@coreui/vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(CoreUI)
app.mount('#app')
