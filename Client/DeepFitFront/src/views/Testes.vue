<template>
    <h1>Teste de Componentes</h1>
    <p>TopToolbar</p>
    <v-row class="my-5">
        <TopToolbar title="Testes"/>
    </v-row>
    <p>BaseButton</p>
    <v-row class="my-5">
      <BaseButton buttonText="Insights" viewDestino="insight" />
    </v-row>
    <v-row class="my-5">
      <BaseButton buttonText="Home" viewDestino="home" />
    </v-row>
  </template>

<script>
import TopToolbar from '@/components/TopToolbar.vue';
import BaseButton from '@/components/BaseButton.vue';


export default {
  components: {
    TopToolbar,
    BaseButton
  }
}
</script>

<style></style>