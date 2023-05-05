import api from './api.config'

export default new (class {
  async list(params) {
    const { data } = await api.axios.get('/insights', { params })
    return data
  }

  async sleep(params) {
    const { data } = await api.axios.get('/insights/sleep_insight', { params })
    return data
  }

  async heartRate(params) {
    const { data } = await api.axios.get('/insights/heart_rate_insight', { params })
    return data
  }

  async get(id) {
    if (!id) {
      return null
    }
    const { data } = await api.axios.get(`/insights/${id}`)
    return data
  }
})()
