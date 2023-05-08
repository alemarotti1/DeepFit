import api from './api.config'

export default new (class {
  async list(params) {
    const data = await api.axios.get('/aluno', { ...params })
    return data
  }

  async getByToken(tokenAcesso) {
    if (!tokenAcesso) {
      return null
    }
    const { data } = await api.axios.get(`/aluno/${tokenAcesso}`)
    return data
  }

  async create(aluno, treinadorUsuario) {
    const data = await api.axios.post(`/aluno`, { ...aluno, user: treinadorUsuario })
    return data
  }

  async delete(user) {
    const { data } = await api.axios.delete(`/aluno/${user.id}`)
    return data
  }

  async update(user) {
    const { data } = await api.axios.put(`/aluno`, user)
    return data
  }
})()
