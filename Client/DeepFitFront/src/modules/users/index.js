import { getField, updateField } from 'vuex-map-fields'
import usersApi from '@/api/users'

export const state = () => ({
  neverListed: true,
  list: [],
  logged: false,
  logedUser: {
    id: null
  }
})

export const getters = {
  getField,
  list(state) {
    return state.list
  },
  logedUser(state) {
    if (state.logged) return state.logedUser
  }
}

export const actions = {
  async login({ commit }, user) {
    try {
      const loggedUser = await usersApi.login(user)
      commit('setLogedUser', loggedUser)
      commit('setLoged', true)
    } catch (error) {
      console.error(error)
    }
  },

  async logout({ commit }, user) {
    try {
      await usersApi.logout(user)
      commit('setLogedUser', {
        id: null
      })
      commit('setLoged', true)
    } catch (error) {
      console.error(error)
    }
  },

  async list({ commit, state }, { force = false, params } = {}) {
    if (state.neverListed || force) {
      const list = await usersApi.list(params)
      commit('setList', list)
      commit('setNeverListed', false)
      return list
    } else {
      return state.list
    }
  },

  async listOne(_, id) {
    const user = await usersApi.get(id)
    return user
  },

  async update({ dispatch }, user) {
    await usersApi.update(user)
    dispatch('list')
  },

  async create({ dispatch }, user) {
    await usersApi.create(user)
    dispatch('list')
  },

  async delete({ dispatch }, user) {
    await usersApi.delete(user)
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
  },

  setLogedUser(state, data) {
    state.logedUser = data
  },

  setLoged(state, data) {
    state.logged = data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
