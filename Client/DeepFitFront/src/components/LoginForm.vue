<template>
    
      <v-card class="mx-auto px-1 pb-8"  min-width="270" width="100%" height="100%" elevation="0">
        
        <v-card-title class="text-center text-wrap pa-10">Bem-vindo!</v-card-title>
        
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
          class="d-flex flex-column justify-end"
        >
          <v-text-field
            v-model="user"
            :readonly="loading"
            :rules="[rules.required]"
            class="mb-2"
            clearable
            label="Usuário"
            density='compact'
          ></v-text-field>
  
          <v-text-field
            class="rounded-xl"
            v-model="password"
            :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :rules="[rules.required]"
            :readonly="loading"
            clearable
            label="Senha"
            density='compact'
            placeholder="Digite sua senha"
            @click:append-inner="show = !show"  
          ></v-text-field>
  
          <v-spacer></v-spacer>
   
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
    export default {
      data: () => ({
        form: false,
        show: false,
        user: null,
        password: null,
        loading: false,
        rules: {
            required: value => !!value || 'Campo obrigatório',
            min: v => v.length >= 6 || 'mínimo de 6 caracteres'
          },
      }),
  
      methods: {
        onSubmit () {
          // implementar request
          
          if (!this.form) return
  
          this.loading = true
  
          setTimeout(() => (this.loading = false), 2000)
        },
        
      },
    }
  </script>
