import router from '@/router'
// import store from './../modules/store'
import qs from 'qs'
import axios from 'axios'

export default new (class Config {
  constructor() {
    this._token = null
    this.axios = null
  }

  setToken(token) {
    // this._token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWxlbWFyb3R0aSIsIkNSRUYiOm51bGwsIm5vbWUiOiJKb8OjbyBkYXMgbmV2ZXMiLCJlbWFpbCI6bnVsbCwiaWF0IjoxNjgzNDk5NDA2fQ._csFM7QZmu0aAqLLtO-qA7JQuu2v8nQ4qzDw-PHb5ws`
    this._token = token
    if (!token) {
      this.axios.defaults.withCredentials = false
    }
  }

  async setup() {
    try {
      // let baseURL = `http://localhost:4000`
      let baseURL = `${import.meta.env.VITE_API_BASE_URL}` || `http://localhost:4001`
      const withCredentials = false
      const axiosSetup = {
        paramsSerializer: (params) => {
          return qs.stringify(params)
        },
        withCredentials,
        baseURL
      }
      this.axios = axios.create(axiosSetup)
      this.axios.interceptors.request.use(
        (request) => {
          console.log({ meutoken: this._token })
          if (this._token) {
            // this.axios.defaults.withCredentials = true
            request.headers = { token: this._token }
          }
          // FALTA TER PADRAO DO TOKEN QUE VAMOS USAR PARA ACESSAR A API
          //   request.headers.BearerStatic = this._token.replace('BearerStatic', '')
          // } else {
          //   request.headers.Authorization = this._token
          // }
          return request
        },
        (error) => {
          return Promise.reject(error)
        }
      )
      this.axios.interceptors.response.use(
        /**
         *
         * @param {import('axios').AxiosResponse} response
         */
        (response) => {
          return response
        },
        /**
         *
         * @param {import('axios').AxiosError} error
         */
        async (error) => {
          // APENAS EXEMPLOS DE TRATAMENTO DE ERRO
          const { response } = error
          if (response?.status === 400) {
            // EXEMPLO DE CHAMADA DE UMA FUNCAO DENTRO DOS MODULOS DE USUARIO ONDE TEMOS O STATUS DO USUARIO: logged, logedUser, list
            // NESSE CASO CHAMAOS A FUNCAO logout
            router.push({ name: 'error' })
            console.error('ERRO CONHECIDO 400')
            return { status: 401, message: response.data?.error }
          }
          if (response?.status === 404) {
            router.push({ name: 'error' })
            console.error('ERRO CONHECIDO 404')
            return { status: 404, message: response.data?.error }
          }
          if (Object.keys(response?.data || {})?.length > 0) {
            const error = new Error()
            error.status = response.status
            error.message = response.data?.message || response.data
            error.errors = response.data?.errors
            throw error
          }
          return Promise.reject(error)
        }
      )
    } catch (err) {
      console.error(err)
    }
  }
})()
