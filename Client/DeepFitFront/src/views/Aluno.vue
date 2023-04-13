<template>
    <TopToolbar title="Aluno"/>
    <v-row class="my-5">
        <ProfileCard nome="Pedro Santos" fotoUrl="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"/>
    </v-row>
    <v-row class="my-5">
      <BaseButton buttonText="Ver Insights" viewDestino="insights" />
    </v-row>
    <h3>Próximo treino:</h3>
    <v-row class="my-1">
        <TreinoList/>
    </v-row>

  </template>

<script>
import TopToolbar from '@/components/TopToolbar.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import BaseButton from '@/components/BaseButton.vue';
import TreinoList from '@/components/TreinoList.vue';


export default {
  components: {
    TopToolbar,
    ProfileCard,
    BaseButton,
    TreinoList
  }
}
</script>

<style></style>