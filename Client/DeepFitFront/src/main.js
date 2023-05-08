import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueFab from 'vue-float-action-button'
import store from './store/index'

import api from '@/api/api.config'

// FALTA TER PADRAO DO TOKEN QUE VAMOS USAR PARA ACESSAR A API
// api.setToken('XXXOURTOKENXXX', { type: 'BearerStatic' })
// api.setToken(null)
api.setup()

import '@mdi/font/css/materialdesignicons.min.css'

import './assets/main.css'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

app.use(vuetify)

app.use(VueFab)

// Vuex
app.use(store)

app.use(router)

app.mount('#app')
