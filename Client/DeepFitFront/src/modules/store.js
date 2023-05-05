import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import aluno from '@/store/modules/aluno'
import treinador from '@/store/modules/treinador'
import insights from '@/store/modules/insights'
import { getField, updateField } from 'vuex-map-fields'

const modules = {
  auth,
  insights,
  treinador,
  aluno
}

const store = createStore({
  strict: true,
  getters: {
    getField
  },
  mutations: {
    updateField
  },
  modules: modules,
  plugins: []
})

export default store
