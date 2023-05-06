import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import aluno from '@/store/modules/aluno'
import treinador from '@/store/modules/treinador'
import insights from '@/store/modules/insights'
import exercicios from '@/store/modules/exercicios'

const modules = {
  auth,
  aluno,
  exercicios,
  treinador,
  insights
}

const store = createStore({
  strict: true,
  modules: modules,
  plugins: []
})

export default store
