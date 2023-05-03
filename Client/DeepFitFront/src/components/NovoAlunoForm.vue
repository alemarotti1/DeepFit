<template>
    
    <v-card class="mx-auto px-1 pb-8"  min-width="200" width="100%" height="100%" elevation="0">
      
      <v-card-title class="text-center text-wrap pt-10 pb-5">Seu novo aluno</v-card-title>
      
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
          label="Nome"
          density='compact'
        ></v-text-field>

        <v-row class="my-0 py-0">
            <v-col class="my-0 py-0" :cols="6">
        <v-autocomplete
            ref="genero"
            v-model="genero"
            :items="generos"
            class="my-0 py-0"
            label="Gênero"
            placeholder="Selecione..."
            density='compact'
            required
        ></v-autocomplete>
      </v-col>
        <v-col class="my-0 py-0" :cols="6">
        <v-text-field
          v-model="nascimento"
          :readonly="loading"
          :rules="[rules.validDate]"
          class="my-0 py-0"
          label="Nascimento"
          density='compact'
          validate-on="blur"
  
        ></v-text-field>
          </v-col> 
          </v-row>
        <v-row class="my-0 py-0">
            <v-col class="my-0 py-0" :cols="6">
        <v-text-field
          v-model="peso"
          suffix="kg"
          placeholder="65.5"
          :readonly="loading"
          :rules="[rules.validDecimal]"
          class="my-0 py-0"
          label="Peso"
          density='compact'
          validate-on="blur"
        ></v-text-field>
        </v-col>
        <v-col class="my-0 py-0" :cols="6">
        <v-text-field
          v-model="altura"
          placeholder="1.70"
          suffix="m"
          :readonly="loading"
          :rules="[rules.validDecimal]"
          class="my-0 py-0"
          label="Altura"
          density='compact'
          validate-on="blur"
        ></v-text-field>
        </v-col>
        </v-row>

        <v-autocomplete
            ref="objetivo"
            v-model="objetivo"
            :items="objetivos"
            label="Objetivo"
            placeholder="Selecione..."
            density='compact'
            required
        ></v-autocomplete>

        

        <v-spacer></v-spacer>
 
        <v-btn
          class="mt-16 text-white"
          prepend-icon="mdi-account-multiple-plus-outline"
          :disabled="!form"
          :loading="loading"
          block
          color="var(--green-top)"
          size="large"
          type="submit"
          rounded
          variant="elevated"
        >
          Salvar
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
        generos: ['Feminino', 'Masculino', 'Outros'],
        objetivos: ['condicionamento físico', 'definição muscular', 'hipertrofia', 'perda de peso', 'saúde e bem-estar'],
      viewDestino: "aluno",
      form: false,
      show: false,
      nome: null,
      genero: null,
      objetivo: null,
      nascimento: null,
      peso: null,
      altura: null,
      loading: false,
      rules: {
          required: value => !!value || 'Campo obrigatório',
          validDate: value => /^\d{2}\/\d{2}\/\d{4}$|^$/.test(value) || "Data inválida (dd/mm/aaaa)",
          validDecimal: (value) => /^(\d*\.)?\d+$|^(\d*,)?\d+$|^$/.test(value) || "Número inválido (##.##)",
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
          nome: this.nome,
          genero: this.genero,
          nascimento: this.nascimento,
          objetivo: this.nome,
          peso: this.peso,
          altura: this.altura
        })
        // handle success response here
        // SEGUIR PARA PÁGINA DO ALUNO
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
            return "Cadastro realizado com sucesso!"
        } else {
            return "Não foi possível cadastrar o aluno. Tente novamente."
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

