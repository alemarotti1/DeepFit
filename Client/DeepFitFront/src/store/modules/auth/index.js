import authApi from '@/api/auth'

export const state = () => ({
  neverListed: true,
  counterEgg: 0,
  activeEgg: false,
  list: [],
  logged: false,
  logedUser: {
    usuario: null
  }
})

export const getters = {
  list(state) {
    return state.list
  },
  activeEgg(state) {
    return state.activeEgg
  },
  counterEgg(state) {
    return state.counterEgg
  },
  logedUser(state) {
    if (state.logged) return state.logedUser
  }
}

export const actions = {
  async addCounterToEgg({ commit }) {
    commit('setIncrementCounter')
  },
  async registerNewUser(_, user) {
    try {
      const response = await authApi.registerNewUser(user)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  },
  async login({ commit }, user) {
    try {
      const response = await authApi.login(user)
      commit('setLogedUser', { usuario: user.usuario })
      commit('setLoged', true)
      return response
    } catch (error) {
      console.error(error)
      return error
    }
  },

  async logout({ commit }, user) {
    try {
      // const response = await authApi.logout(user)
      console.log('deslogando:', { user })
      commit('setLogedUser', {
        usuario: null
      })
      commit('setLoged', false)
      return state.logedUser
    } catch (error) {
      console.error(error)
      return error
    }
  },

  async list({ commit, state }, { force = false, params } = {}) {
    if (state.neverListed || force) {
      const list = await authApi.list(params)
      commit('setList', list)
      commit('setNeverListed', false)
      return list
    } else {
      return state.list
    }
  },

  async listOne(_, id) {
    const user = await authApi.get(id)
    return user
  },

  async update({ dispatch }, user) {
    await authApi.update(user)
    dispatch('list')
  },

  async create({ dispatch }, user) {
    await authApi.create(user)
    dispatch('list')
  },

  async delete({ dispatch }, user) {
    await authApi.delete(user)
    dispatch('list')
  }
}

export const mutations = {
  setActiveEgg(state, data) {
    state.list = data
  },
  setIncrementCounter(state) {
    if (!state.activeEgg && state.counterEgg < 5) {
      state.counterEgg += 1
    } else {
      state.activeEgg = true
    }
  },
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
