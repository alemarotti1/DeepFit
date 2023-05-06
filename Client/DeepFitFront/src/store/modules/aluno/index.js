import alunoApi from '@/api/aluno'

export const state = () => ({
  neverListed: false,
  alunos: [
    {
      id: 0,
      name: 'Gabriel',
      age: 23,
      fotoUrl: 'https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp'
    },
    {
      id: 1,
      name: 'Joana',
      age: 47,
      fotoUrl: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
    },
    {
      id: 2,
      age: 24,
      name: 'Pedro Santos',
      fotoUrl: 'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'
    }
  ],
  selectedAluno: {
    id: 0,
    name: 'Gabriel',
    age: 23,
    fotoUrl: 'https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp'
  }
})

export const getters = {
  alunos(state) {
    return state.alunos
  },
  selectedAluno(state) {
    return state.selectedAluno
  }
}

export const actions = {
  async list({ state }, { force = false } = {}) {
    try {
      if (state.neverListed || force) {
        // const alunos = await alunoApi.list(params)
        // commit('setAlunos', alunos)
        // commit('setNeverListed', false)
        // return alunos
        return state.alunos
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

  async update({ dispatch }, aluno) {
    await alunoApi.update(aluno)
    dispatch('list')
  },

  async create({ dispatch, commit }, aluno) {
    // await alunoApi.create(aluno)
    commit('addAluno', aluno)
    dispatch('list')
  },

  async delete({ dispatch }, aluno) {
    await alunoApi.delete(aluno)
    dispatch('list')
  },

  async clickOpenAluno({ commit }, aluno) {
    if (aluno) {
      commit('setSelectedAluno', aluno)
    }
  }
}

export const mutations = {
  setAlunos(state, data) {
    state.alunos = data
  },

  addAluno(state, data) {
    if (state.alunos?.length) {
      state.alunos.push(data)
    } else {
      state.alunos = [data]
    }
  },

  setSelectedAluno(state, data) {
    state.selectedAluno = data
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
