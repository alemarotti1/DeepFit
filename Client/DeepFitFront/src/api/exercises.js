import api from './api.config'

export default new (class {
  async list(params) {
    const { data } = await api.axios.get('/exercises', { params })
    return data
  }

  async get(id) {
    if (!id) {
      return null
    }
    const { data } = await api.axios.get(`/exercises/${id}`)
    return data
  }

  async create(exercise) {
    const { data } = await api.axios.post(`/exercises`, exercise)
    return data
  }

  async delete(exercise) {
    const { data } = await api.axios.delete(`/exercises/${exercise.id}`)
    return data
  }

  async update(exercise) {
    const { data } = await api.axios.put(`/exercises/${exercise.id}`, exercise)
    return data
  }
})()
