<template>
  <v-row>
    <h2>Google Fit Sleep Data</h2>
    <v-btn @click="handleClientLoad()">Authorize and Get Sleep Data</v-btn>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AccessToken',
  data() {
    return {
      gapi: null
    }
  },
  async created() {
    this.gapi = await axios.get('https://apis.google.com/js/api.js')
    await axios.get('https://accounts.google.com/gsi/client')
  },
  methods: {
    async callgapi() {
      const response = await axios.get('https://apis.google.com/js/api.js')
      return response
    },
    async handleClientLoad() {
      console.log(this.gapi)
      await this.gapi.load('client:auth2', this.initClient())
    },

    async initClient() {
      await this.gapi.client
        .init({
          apiKey: 'AIzaSyCHqclKqtq5y4bhUNAxmoBRveNfh8_caek',
          clientId: '803696687289-2ia3t6gkmsfrrf4h86nqlaidt6ol5jo4.apps.googleusercontent.com',
          plugin_name: 'DeepFit',
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest'],
          scope:
            'https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.heart_rate.read',
          fetch_basic_profile: false,
          ux_mode: 'popup',
          redirect_uri: 'postmessage',
          response_type: 'permission',
          prompt: 'select_account'
        })
        .then(function () {
          this.authorizeAndGetData()
        })
    },

    async authorizeAndGetData() {
      await this.gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(function () {
          const accessToken = this.gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getAuthResponse().access_token
          console.log(accessToken)
        })
    }
  }
}
</script>

<style scoped></style>
