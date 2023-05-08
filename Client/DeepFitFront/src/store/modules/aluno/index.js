import alunoApi from '@/api/aluno'

export const state = () => ({
  neverListed: true,
  alunos: [
    {
      nascimento: convertNascimento('12/12/1976'),
      nome: 'Gabriel',
      objetivo: 'saúde e bem-estar'
    },
    {
      nascimento: convertNascimento('12/12/2000'),
      nome: 'Joana',
      objetivo: 'hipertrofia'
    },
    {
      nascimento: convertNascimento('12/12/2002'),
      nome: 'Pedro Santos',
      objetivo: 'perda de peso'
    }
  ],
  selectedAluno: {
    nascimento: convertNascimento('12/12/1976'),
    nome: 'Gabriel',
    objetivo: 'saúde e bem-estar'
  }
})

function convertNascimento(valorEmString) {
  let d = valorEmString.split('/')
  let dat = new Date(d[2] + '/' + d[1] + '/' + d[0])
  return dat
}

export const getters = {
  alunos(state) {
    return state.alunos
  },
  selectedAluno(state) {
    return state.selectedAluno
  }
}

export const actions = {
  async list({ state, commit }, { force = false, params } = {}) {
    try {
      if (state.neverListed || force) {
        const { data } = await alunoApi.list(params)
        console.log({ data })
        commit('setAlunos', data)
        commit('setNeverListed', false)
        return data
        // return state.alunos
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

  async create({ dispatch, commit }, { aluno, user: treinadorUsuario }) {
    await alunoApi.create(aluno, treinadorUsuario)
    commit('addAluno', aluno)
    dispatch('list')
    return aluno
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
