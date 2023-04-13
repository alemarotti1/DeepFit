<template>

    <TopToolbar title="Sono"/>
  
    <v-row class="mt-10 mb-5">
      <Insight/>
    </v-row>
    <v-row class="my-5">
      <BaseButton buttonText="Histórico" viewDestino=""/>
    </v-row>


  </template>

<script>
import TopToolbar from '@/components/TopToolbar.vue';
import Insight from '@/components/Insight.vue';
import BaseButton from '@/components/BaseButton.vue';


export default {
  components: {
    TopToolbar,
    Insight,
    BaseButton
  }
}
</script>

<style></style>