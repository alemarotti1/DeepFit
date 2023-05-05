import { getField, updateField } from 'vuex-map-fields'
import alunoApi from '@/api/aluno'

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
      const list = await alunoApi.list(params)
      commit('setList', list)
      commit('setNeverListed', false)
      return list
    } else {
      return state.list
    }
  },

  async listOne(_, tokenAcesso) {
    const exercise = await alunoApi.getByToken(tokenAcesso)
    return exercise
  },

  async update({ dispatch }, exercise) {
    await alunoApi.update(exercise)
    dispatch('list')
  },

  async create({ dispatch }, exercise) {
    await alunoApi.create(exercise)
    dispatch('list')
  },

  async delete({ dispatch }, exercise) {
    await alunoApi.delete(exercise)
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
