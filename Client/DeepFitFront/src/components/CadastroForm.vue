<template>
    
    <v-card class="mx-auto px-1 pb-8"  min-width="200" width="100%" height="100%" elevation="0">
      
      <v-card-title class="text-center text-wrap pa-10">Informe seus dados:</v-card-title>
      
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
        class="d-flex flex-column justify-end"
      >
        <v-text-field
          v-model="nome"
          :readonly="loading"
          :rules="[rules.required]"
          class="my-0 py-0"
          clearable
          label="Nome Sobrenome"
          density='compact'
        ></v-text-field>

        <v-row>
            <v-col :cols="7">
        <v-text-field
          v-model="cpf"
          :readonly="loading"
          :rules="[rules.required, rules.validCpf]"
          class="my-0 py-0"
          clearable
          label="CPF"
          density='compact'
          validate-on="blur"
        ></v-text-field>
        </v-col>
        <v-col :cols="5">
        <v-text-field
          v-model="cref"
          :readonly="loading"
          :rules="[rules.required]"
          class="my-0 py-0"
         
          label="CREF"
          density='compact'
        ></v-text-field>
        </v-col>
        </v-row>

        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[rules.required, rules.validEmail]"
          type="email"
          class="my-0 py-0"
          clearable
          label="Email"
          density='compact'
          validate-on="blur"
        ></v-text-field>

        <v-text-field
          v-model="usuario"
          :readonly="loading"
          :rules="[rules.required, rules.validUsername]"
          class="my-0 py-0"
          clearable
          label="Nome de Usuário"
          density='compact'
          validate-on="blur"
        ></v-text-field>
       
        <v-text-field
          v-model="senha"
          :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :rules="[rules.required, rules.validPassword]"
          :readonly="loading"
          class="my-0 py-0"
          clearable
          label="Senha"
          density='compact'
          placeholder="Digite sua senha"
          validate-on="input"
          @click:append-inner="show = !show"  
        ></v-text-field>

        <v-spacer></v-spacer>
 
        <v-btn
          class="mt-16 text-white"
          prepend-icon="mdi-plus-circle-multiple"
          :disabled="!form"
          :loading="loading"
          block
          color="var(--green-top)"
          size="large"
          type="submit"
          rounded
          variant="elevated"
        >
          Cadastrar
        </v-btn>
      </v-form>

      <v-dialog v-model="dialog" max-width="300">
            <v-card>
                <v-card-text> {{ this.dialogText() }} </v-card-text>
                <v-card-actions class="d-flex justify-center">
                    <v-btn rounded="xl" variant="tonal" color="grey darken-2" @click="direcionar">OK</v-btn>
                </v-card-actions>
                 
            </v-card>
        </v-dialog>

    </v-card>

</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      viewDestino: "login",
      form: false,
      show: false,
      nome: null,
      cpf: null,
      cref: null,
      email: null,
      usuario: null,
      senha: null,
      loading: false,
      rules: {
          required: value => !!value || 'Campo obrigatório',
          validCpf: (value) => /^\d{11}$/.test(value) || "CPF inválido",
          validEmail: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email inválido",
          validPassword: (value) => /^\S{6,}$/.test(value) || "A senha deve ter 6 caracteres ou mais",
          validUsername: (value) => /^[a-zA-Z0-9._-]+$/.test(value) || "Formato inválido"
        },
        dialog: false,
        cadastroRealizado: false
    }),

    methods: {
      async onSubmit () {
        // implementar request
        
        if (!this.form) return

        this.loading = true

      try {
        const response = await axios.put('/api/auth/login', {
          usuario: this.usuario,
          senha: this.senha,
          email: this.email,
          nome: this.nome,
          cref: this.cref,
          cpf: this.cpf
        })
        // handle success response here
        console.log(response.data)
        this.cadastroRealizado = true
        this.dialog = true

      } catch (error) {
        // handle error response here
        console.error(error.response.data)
        //this.cadastroRealizado = false
        this.cadastroRealizado = true      // true PARA TESTES
        this.dialog = true

      } finally {
        this.loading = false
      }

        //setTimeout(() => (this.loading = false), 2000)
      },

      dialogText() {
        if (this.cadastroRealizado) {
            return "Cadastro realizado com sucesso! Siga para a página de login."
        } else {
            return "Não foi possível realizar o cadastro com os dados informados. Tente novamente."
        }
      },

      direcionar() {
        if (this.cadastroRealizado) {
            this.$router.push({ name: this.viewDestino })
        } else {
            this.dialog = false;
        }
      }
      
    },
  }
</script>

<style scoped>


</style>

