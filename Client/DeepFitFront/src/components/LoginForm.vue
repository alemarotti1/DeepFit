<template>
  <v-card class="mx-auto px-1 pb-8" min-width="200" width="100%" height="100%" elevation="0">
    <v-card-title class="text-center text-wrap pa-10">Bem-vindo!</v-card-title>

    <v-form v-model="form" @submit.prevent="onSubmit" class="d-flex flex-column justify-end">
      <v-text-field
        v-model="usuario"
        :readonly="loading"
        :rules="[rules.required, rules.validUsernamme]"
        class="mb-2"
        clearable
        label="Usuário"
        density="compact"
      ></v-text-field>

      <v-text-field
        class="rounded-xl"
        v-model="senha"
        :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        :rules="[rules.required, rules.validPassword]"
        :readonly="loading"
        clearable
        label="Senha"
        density="compact"
        placeholder="Digite sua senha"
        @click:append-inner="show = !show"
        validate-on="input"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="300">
        <v-card>
          <v-card-title> Falha no Login </v-card-title>
          <v-card-text> Verifique seus dados e tente novamente. </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn rounded="xl" variant="tonal" color="grey darken-2" @click="this.dialog = false"
              >OK</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn
        class="mt-16 text-white"
        prepend-icon="mdi-login"
        :disabled="!form"
        :loading="loading"
        block
        color="var(--green-top)"
        size="large"
        type="submit"
        rounded
        variant="elevated"
      >
        Login
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    form: false,
    show: false,
    usuario: null,
    senha: null,
    loading: false,
    dialog: false,
    rules: {
      required: (value) => !!value || 'Campo obrigatório',
      validPassword: (value) => /^\S{6,}$/.test(value) || 'A senha deve ter 6 caracteres ou mais',
      validUsernamme: (value) => /^[a-zA-Z0-9._-]+$/.test(value) || 'Formato inválido'
    }
  }),
  computed: mapState({
    logged: (state) => state.auth.logged,
    logedUser: (state) => state.auth.logedUser,
    activeEgg: (state) => state.auth.activeEgg
  }),
  methods: {
    ...mapActions('auth', ['login', 'addCounterToEgg']),
    easterEgg() {
      if (this.activeEgg) {
        this.$router.push('home')
      } else {
        this.addCounterToEgg()
      }
    },
    async onSubmit() {
      // implementar request

      if (!this.form) return

      this.loading = true

      try {
        const response = await this.login({
          usuario: this.usuario,
          senha: this.senha
        })

        console.log(response)
        console.log(response.status)
        if (response.status === 200) {
          this.$router.push({ name: 'home' })
        }
        if (response.status === 401) {
          this.dialog = true
        }
      } catch (error) {
        // handle error response here
        console.error(error)
        this.dialog = true
      } finally {
        this.loading = false
      }

      //setTimeout(() => (this.loading = false), 2000)
    }
  }
}
</script>
