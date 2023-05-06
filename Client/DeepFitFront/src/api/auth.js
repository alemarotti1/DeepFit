import api from './api.config'

export default new (class {
  async registerNewUser(user) {
    const { data } = await api.axios.put('auth', { user })
    return data
  }

  async login(user) {
    const { data } = await api.axios.post('auth', { user })
    return data
  }

  async logout(user) {
    const { data } = await api.axios.get('usesrs/logout', { user })
    return data
  }

  async list(params) {
    const { data } = await api.axios.get('/usesrs', { params })
    return data
  }

  async get(id) {
    if (!id) {
      return null
    }
    const { data } = await api.axios.get(`/usesrs/${id}`)
    return data
  }

  async create(user) {
    const { data } = await api.axios.post(`/usesrs`, user)
    return data
  }

  async delete(user) {
    const { data } = await api.axios.delete(`/usesrs/${user.id}`)
    return data
  }

  async update(user) {
    const { data } = await api.axios.put(`/usesrs/${user.id}`, user)
    return data
  }
})()
