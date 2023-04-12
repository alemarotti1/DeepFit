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
    <p>InsightMenu</p>
    <v-row class="my-5">
      <InsightMenu tipoInsight='sono' viewDestino="insight"/>
    </v-row>
    <v-row class="my-5">
      <InsightMenu tipoInsight='intensidade' viewDestino="insight"/>
    </v-row>
    <v-row class="my-5">
      <InsightMenu tipoInsight='frequencia' viewDestino="insight"/>
    </v-row>

  </template>

<script>
import TopToolbar from '@/components/TopToolbar.vue';
import BaseButton from '@/components/BaseButton.vue';
import InsightMenu from '@/components/InsightMenu.vue';


export default {
  components: {
    TopToolbar,
    BaseButton,
    InsightMenu
  }
}
</script>

<style></style>