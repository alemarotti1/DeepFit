import api from './api.config'

export default new (class {
  async list(params) {
    const { data } = await api.axios.get('/treinador', { params })
    return data
  }

  async get(id) {
    if (!id) {
      return null
    }
    const { data } = await api.axios.get(`/treinador/${id}`)
    return data
  }

  async create(exercise) {
    const { data } = await api.axios.post(`/treinador`, exercise)
    return data
  }

  async delete(exercise) {
    const { data } = await api.axios.delete(`/treinador/${exercise.id}`)
    return data
  }

  async update(exercise) {
    const { data } = await api.axios.put(`/treinador/${exercise.id}`, exercise)
    return data
  }
})()
