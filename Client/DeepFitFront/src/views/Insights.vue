<template>

    <TopToolbar title="Insights"/>
  
    <v-row class="mt-10 mb-5">
      <InsightMenu tipoInsight='sono' viewDestino="sono"/>
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
import InsightMenu from '@/components/InsightMenu.vue';


export default {
  components: {
    TopToolbar,
    InsightMenu,
  }
}
</script>

<style></style>