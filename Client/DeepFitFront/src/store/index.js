import { createStore, createLogger } from 'vuex'
import auth from '@/store/modules/auth'
import aluno from '@/store/modules/aluno'
import treinador from '@/store/modules/treinador'
import insights from '@/store/modules/insights'

const modules = {
  auth,
  insights,
  treinador,
  aluno
}

const store = createStore({
  strict: true,
  modules: modules,
  plugins: [createLogger()]
})

export default store
