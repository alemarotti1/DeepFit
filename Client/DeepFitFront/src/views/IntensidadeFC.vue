<template>
  <v-row>
    <v-col>
      <TopToolbar title="Intensidade" />

      <v-row class="mt-10 mb-5 mx-auto" justify="center">
        <LineChart :withMedia="false" :chartData="chartDataFc" />
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
import { chartDataFc } from '@/assets/dadosStub.js'

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
        titulo: 'Frequência Cardíaca',
        resumo: 'acima do recomendável',
        valor: '185bpm',
        texto:
          'Durante os treinos a frequência cardíaca máxima do aluno tem superado a FCmax ideal. Para homens FCmax = 220 – idade, e mulher é FCmax = 226 – idade.',
        sugestao:
          'Considere reduzir a intensidade do treinamento e prescrever exercícios cardiorrespiratórios.',
        positivo: false
      },
      chartDataFc
    }
  }
}
</script>

<style></style>
