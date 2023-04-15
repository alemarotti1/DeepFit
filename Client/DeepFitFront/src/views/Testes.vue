
<template>
    <h1>Teste de Componentes</h1>
    <p>Charts.js  LineChart</p>
    <v-row class="my-5">
        <LineChart :chartData="chartData" />
    </v-row>
    <p>vue3-charts  ChartFC</p>
    <v-row class="my-5">
        <ChartFC/>
    </v-row>
    <p>TopToolbar</p>
    <v-row class="my-5">
        <TopToolbar title="Testes"/>
    </v-row>
    <p>ProfileCard</p>
    <v-row class="my-5">
        <ProfileCard nome="Nome do Aluno" fotoUrl="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"/>
    </v-row>
    <p>TreinoList</p>
    <v-row class="my-5">
        <TreinoList/>
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
import ProfileCard from '@/components/ProfileCard.vue';
import BaseButton from '@/components/BaseButton.vue';
import InsightMenu from '@/components/InsightMenu.vue';
import TreinoList from '@/components/TreinoList.vue';
import ChartFC from '@/components/ChartFC.vue';
//import Chart from 'https://cdn.jsdelivr.net/npm/chart.js';
//import Chart from 'chart.js/auto'
import LineChart from '@/components/LineChart.vue';


export default {
  components: {
    TopToolbar,
    ProfileCard,
    BaseButton,
    InsightMenu,
    TreinoList,
    ChartFC,
    LineChart

  },
  data() {
    return {
      chartData: [
          { time: '00', value: 75 },
          { time: '01', value: 80 },
          { time: '02', value: 85 },
          { time: '03', value: 97 },
          { time: '04', value: 123 },
          { time: '05', value: 135 },
          { time: '06', value: 142 },
          { time: '07', value: 137 },
          { time: '08', value: 120 },
          { time: '09', value: 115 },
          { time: '10', value: 100 },
          { time: '11', value: 123 },
          { time: '12', value: 135 },
          { time: '13', value: 142 },
          { time: '14', value: 152 },
          { time: '15', value: 121 },
          { time: '16', value: 116 },
          { time: '17', value: 109 },
          { time: '18', value: 103 },
          { time: '19', value: 95 },
          { time: '20', value: 87 }
        ]
      }
    }
  
}
</script>

<style></style>