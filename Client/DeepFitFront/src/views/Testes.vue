
<template>
    <h1>Teste de Componentes</h1>
    <p>LoginForm</p>
    <v-row class="my-5">
        <LoginForm/>
    </v-row>
    <p>Charts.js  LineChart</p>
    <v-row class="my-5">
        <LineChart  :chartData="chartDataFc"/>
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
import { chartDataFc } from '@/assets/dadosStub.js';
import LoginForm from '@/components/LoginForm.vue';


export default {
  components: {
    TopToolbar,
    ProfileCard,
    BaseButton,
    InsightMenu,
    TreinoList,
    ChartFC,
    LineChart,
    LoginForm

  },
  data() {
    return {
      chartDataFc
      }
    }
  
}
</script>

<style></style>