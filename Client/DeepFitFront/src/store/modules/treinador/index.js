import { getField, updateField } from 'vuex-map-fields'
import treinadorApi from '@/api/treinador'

export const state = () => ({
  neverListed: true,
  list: []
})

export const getters = {
  getField,
  list(state) {
    return state.list
  }
}

export const actions = {
  async list({ commit, state }, { force = false, params } = {}) {
    if (state.neverListed || force) {
      const list = await treinadorApi.list(params)
      commit('setList', list)
      commit('setNeverListed', false)
      return list
    } else {
      return state.list
    }
  },

  async listOne(_, id) {
    const exercise = await treinadorApi.get(id)
    return exercise
  },

  async update({ dispatch }, exercise) {
    await treinadorApi.update(exercise)
    dispatch('list')
  },

  async create({ dispatch }, exercise) {
    await treinadorApi.create(exercise)
    dispatch('list')
  },

  async delete({ dispatch }, exercise) {
    await treinadorApi.delete(exercise)
    dispatch('list')
  }
}

export const mutations = {
  updateField,

  setList(state, data) {
    state.list = data
  },

  setNeverListed(state, data) {
    state.neverListed = data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
