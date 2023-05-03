<template>
    <v-row class="mx-auto my-0 py-0" justify="center">
        <h2 style="font-weight: bold">Criar uma conta</h2>
    </v-row>
    <v-card class="mx-auto px-3" height="100%" elevation="0">
        <v-row class="mb-5">
            <CadastroForm />
        </v-row>

    </v-card>
</template>

<script>
import CadastroForm from '@/components/CadastroForm.vue';


export default {
  components: {
    CadastroForm,
    
  }
}
</script>

<style></style>