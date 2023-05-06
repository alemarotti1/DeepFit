import { getField, updateField } from 'vuex-map-fields'
// import treinadorApi from '@/api/treinador'

export const state = () => ({
  list: [
    {
      nome: 'Aquecimento',
      tempo: '5:00',
      fotoUrl: 'src/assets/aquec.svg'
    },
    {
      nome: 'Polichinelos',
      tempo: '30x',
      fotoUrl: 'src/assets/polichinelos.svg'
    },
    {
      nome: 'Pular corda',
      tempo: '0:45',
      fotoUrl: 'src/assets/corda.svg'
    },
    {
      nome: 'Agachamento',
      tempo: '20x',
      fotoUrl: 'src/assets/agach.svg'
    },
    {
      nome: 'Elevação Arnold',
      tempo: '12x',
      fotoUrl: 'src/assets/elevaarnold.svg'
    },
    {
      nome: 'Flexões Inclinadas',
      tempo: '15x',
      fotoUrl: 'src/assets/flexoes.svg'
    },
    {
      nome: 'Flexões',
      tempo: '10x',
      fotoUrl: 'src/assets/flexoes0.svg'
    },
    {
      nome: 'Cobra Stretch',
      tempo: '1:00',
      fotoUrl: 'src/assets/cobra.svg'
    }
  ]
})

export const getters = {
  getField,
  list(state) {
    return (nome) => {
      if (state.list?.length && nome !== '') {
        return state.list.filter((item) => item.nome.includes(nome))
      }
      return state.list
    }
  }
}

export const actions = {
  async list({ state }) {
    return state.list
  },

  async listOne({ state }, nome) {
    let exercicio = {}
    state.list.forEach((element) => {
      if (element.nome === nome) {
        exercicio = element
      }
    })
    return exercicio
  },

  async create({ dispatch, commit }, exercise) {
    commit('addToList', exercise)
    dispatch('list')
  },

  async delete({ dispatch, commit }, exercise) {
    commit('deleteFromList', exercise)
    dispatch('list')
  }
}

export const mutations = {
  updateField,

  setList(state, data) {
    state.list = data
  },
  addToList(state, data) {
    if (state.list?.length) {
      state.list.push(data)
    } else {
      state.list = [data]
    }
  },
  deleteFromList(state, data) {
    if (state.list?.length) {
      const index = state.list.indexOf((item) => item === data)
      state.list.splice(index, 1)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
