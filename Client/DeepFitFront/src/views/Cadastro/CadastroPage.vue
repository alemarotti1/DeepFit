<template>
  <BaseButton buttonText="Já possuo cadastro" viewDestino="login"></BaseButton>
  <v-row class="mx-auto mt-4 mb-0 py-0" justify="center">
    <h2 style="font-weight: bold">Criar uma conta</h2>
  </v-row>
  <v-card class="mx-auto px-3" height="100%" elevation="0">
    <v-row class="mb-5">
      <CadastroForm />
    </v-row>
  </v-card>
</template>

<script>
import CadastroForm from '@/components/CadastroForm.vue'
import BaseButton from '../../components/BaseButton.vue'

export default {
  components: {
    CadastroForm,
    BaseButton
  }
}
</script>

<style></style>
