import insightsApi from '@/api/insights'

export const state = () => ({
  neverListed: true,
  list: [],
  dadosCondicionamento: [],
  heartRate: {},
  sleep: {}
})

export const getters = {
  list(state) {
    return state.list
  },
  dadosCondicionamento(state) {
    return state.dadosCondicionamento
  },
  heartRate(state) {
    return state.heartRate
  },
  sleep(state) {
    return state.sleep
  }
}

export const actions = {
  async list({ commit, state }, { force = false, params } = {}) {
    if (state.neverListed || force) {
      const list = await insightsApi.list(params)
      commit('setList', list)
      commit('setNeverListed', false)
      return list
    } else {
      return state.list
    }
  },
  async getCondicionamento({ commit }, tokenAluno = '') {
    const token_acesso = tokenAluno
    const data = await insightsApi.condicionamentoDados({ token_acesso })
    const dadosCondicionamento = data[0]?.heart_data
    commit('setDadosCondicionamento', dadosCondicionamento)
    return dadosCondicionamento
  },
  async heartRateInsights({ commit }, { params } = {}) {
    const heartRate = await insightsApi.heartRate(params)
    commit('setHeartRate', heartRate)
    return heartRate
  },
  async sleepInsights({ commit }, { params } = {}) {
    const sleep = await insightsApi.sleep(params)
    commit('setSleep', sleep)
    return sleep
  },

  async listOne(_, id) {
    const exercise = await insightsApi.get(id)
    return exercise
  }
}

export const mutations = {
  setList(state, data) {
    state.list = data
  },

  setNeverListed(state, data) {
    state.neverListed = data
  },
  setDadosCondicionamento(state, data) {
    state.dadosCondicionamento = data
  },
  setHeartRate(state, data) {
    state.heartRate = data
  },
  setSleep(state, data) {
    state.sleep = data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
