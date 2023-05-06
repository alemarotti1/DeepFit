<template>
  <v-col>
    <v-row class="my-0">
      <TopToolbar title="Aluno" />
    </v-row>
    <v-row class="my-5">
      <ProfileCard
        nome="Pedro Santos"
        fotoUrl="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
      />
    </v-row>
    <v-row class="mt-10 mb-5">
      <InsightMenu tipoInsight="todos" viewDestino="insights" />
    </v-row>

    <h3>Próximo treino:</h3>
    <v-row class="my-1">
      <TreinoList />
    </v-row>
    <v-row class="my-5">
      <BaseButton buttonText="Editar Treinos" viewDestino="treinos" />
    </v-row>
  </v-col>
</template>

<script>
import TopToolbar from '@/components/TopToolbar.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import TreinoList from '@/components/TreinoList.vue'
import InsightMenu from '@/components/InsightMenu.vue'

export default {
  components: {
    TopToolbar,
    ProfileCard,
    BaseButton,
    TreinoList,
    InsightMenu
  }
}
</script>

<style></style>
