import alunoApi from '@/api/aluno'

export const state = () => ({
  neverListed: true,
  alunos: []
})

export const getters = {
  alunos(state) {
    return state.alunos
  }
}

export const actions = {
  async list({ commit, state }, { force = false, params } = {}) {
    try {
      if (state.neverListed || force) {
        const alunos = await alunoApi.list(params)
        commit('setAlunos', alunos)
        commit('setNeverListed', false)
        return alunos
      } else {
        return state.alunos
      }
    } catch (error) {
      console.log(error)
      return []
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
  setAlunos(state, data) {
    state.alunos = data
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
