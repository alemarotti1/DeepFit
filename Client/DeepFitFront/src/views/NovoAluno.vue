<template>
    <v-row class="mx-auto my-0 py-0" justify="center">
        <v-img :src="novoAluno" class="mx-auto my-0 py-0"></v-img>
        
    </v-row>
    <v-card class="mx-auto px-3" height="100%" elevation="0">
        <v-row class="mb-5">
            <NovoAlunoForm />
        </v-row>

    </v-card>
</template>

<script>
import NovoAlunoForm from '@/components/NovoAlunoForm.vue';
import novoAluno from '@/assets/novoAluno.svg'


export default {
  components: {
    NovoAlunoForm,
    
  },
  data() {
    return {
      novoAluno: novoAluno,
    }
  }
}
</script>

<style></style>