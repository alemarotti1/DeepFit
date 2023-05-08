<template>
  <v-row>
    <v-col>
      <TopToolbar title="Intensidade" />

      <v-row class="mt-10 mb-5 mx-auto" justify="center">
        <LineChart :chartData="chartDataBasal" />
      </v-row>

      <v-row class="mt-10 mb-5">
        <InsightCard :insight="dadosInsight" />
      </v-row>
      <v-row class="my-5">
        <BaseButton buttonText="Editar Treino" viewDestino="treinos" />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import TopToolbar from '@/components/TopToolbar.vue'
import InsightCard from '@/components/InsightCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import LineChart from '@/components/LineChart.vue'
import { chartDataBasal } from '@/assets/dadosBasal.js'

export default {
  components: {
    TopToolbar,
    InsightCard,
    BaseButton,
    LineChart
  },
  data() {
    return {
      dadosInsight: {
        titulo: 'Frequência Basal',
        resumo: 'em decrescimento',
        valor: '71bpm',
        texto: 'Após acordar a frequência cardíaca do aluno tem sido abaixo da média passada.',
        sugestao:
          'Isso significa que o condicionamento físico desse aluno está melhorando a longo prazo.',
        positivo: true
      },
      chartDataBasal
    }
  }
}
</script>

<style></style>
