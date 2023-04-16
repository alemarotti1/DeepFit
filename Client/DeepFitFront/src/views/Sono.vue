<template>

    <TopToolbar title="Sono"/>
  
    <v-row class="mt-10 mb-5">
      <InsightCard :insight="dadosInsight"/>
    </v-row>
    <v-row class="my-5">
      <BaseButton buttonText="Histórico" viewDestino=""/>
    </v-row>


  </template>

<script>
import TopToolbar from '@/components/TopToolbar.vue';
import InsightCard from '@/components/InsightCard.vue';
import BaseButton from '@/components/BaseButton.vue';


export default {
  components: {
    TopToolbar,
    InsightCard,
    BaseButton
  },
  data() {
    return {
      dadosInsight: {
        titulo: "Última Noite",
        resumo: "Sono de boa qualidade",
        valor: "8h25m",
        texto:
          "Seu aluno está com uma boa qualidade do sono, essencial para evoluir bem no treino.",
        sugestao: "Tudo bem por aqui!",
        positivo: true
      },
    };
  }
}
</script>

<style></style>