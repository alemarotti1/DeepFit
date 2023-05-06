// import treinadorApi from '@/api/treinador'
// AquecimentoSVG
// PolichinelosSVG
// PularCordaSVG
// AgachamentoSVG
// ElevacaoArnoldSVG
// FlexoesInclinadasSVG
// FlexoesSVG
// CobraStretchSVG
import svgs from '@/assets/index.js'

export const state = () => ({
  // ...svgs,
  list: [
    {
      nome: 'Aquecimento',
      tempo: '5:00',
      fotoUrl: svgs['AquecimentoSVG'].component
    },
    {
      nome: 'Polichinelos',
      tempo: '30x',
      fotoUrl: svgs['PolichinelosSVG'].component
    },
    {
      nome: 'Pular corda',
      tempo: '0:45',
      fotoUrl: svgs['PularCordaSVG'].component
    },
    {
      nome: 'Agachamento',
      tempo: '20x',
      fotoUrl: svgs['AgachamentoSVG'].component
    },
    {
      nome: 'Elevação Arnold',
      tempo: '12x',
      fotoUrl: svgs['ElevacaoArnoldSVG'].component
    },
    {
      nome: 'Flexões Inclinadas',
      tempo: '15x',
      fotoUrl: svgs['FlexoesInclinadasSVG'].component
    },
    {
      nome: 'Flexões',
      tempo: '10x',
      fotoUrl: svgs['FlexoesSVG'].component
    },
    {
      nome: 'Cobra Stretch',
      tempo: '1:00',
      fotoUrl: svgs['CobraStretchSVG'].component
    }
  ]
})

export const getters = {
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
