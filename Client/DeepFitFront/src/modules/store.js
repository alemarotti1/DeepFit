import { createStore } from 'vuex'
import users from '@/store/modules/users'
import exercises from '@/store/modules/exercises'
import { getField, updateField } from 'vuex-map-fields'

const modules = {
  users,
  exercises
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
