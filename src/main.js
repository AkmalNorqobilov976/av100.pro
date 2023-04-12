import { createApp } from 'vue'
import { createPinia } from 'pinia'
import registrPrimeComponents from './plugins/registerPrimeComponents'


import App from './App.vue'
import router from './router'

import "primevue/resources/themes/lara-light-indigo/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

import 'nprogress/nprogress.css'

import './assets/main.css'
import 'vue3-toastify/dist/index.css';

const app = createApp(App)
registrPrimeComponents(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
