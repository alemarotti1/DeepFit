<template>
  <h1>Teste de Componentes</h1>
  <p>NovoAlunoForm</p>
  <v-row class="my-5">
    <NovoAlunoForm />
  </v-row>

  <p>CadastroForm</p>
  <v-row class="my-5">
    <CadastroForm />
  </v-row>

  <p>LoginForm</p>
  <v-row class="my-5">
    <LoginForm />
  </v-row>
  <p>Charts.js LineChart</p>
  <v-row class="my-5">
    <LineChart :chartData="chartDataFc" />
  </v-row>
  <p>vue3-charts ChartFC</p>
  <v-row class="my-5">
    <ChartFC />
  </v-row>
  <p>TopToolbar</p>
  <v-row class="my-5">
    <TopToolbar title="Testes" />
  </v-row>
  <p>ProfileCard</p>
  <v-row class="my-5">
    <ProfileCard
      nome="Nome do Aluno"
      fotoUrl="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
    />
  </v-row>
  <p>TreinoList</p>
  <v-row class="my-5">
    <TreinoList />
  </v-row>
  <p>BaseButton</p>
  <v-row class="my-5">
    <BaseButton buttonText="Insights" viewDestino="insights" />
  </v-row>
  <v-row class="my-5">
    <BaseButton buttonText="Home" viewDestino="home" />
  </v-row>
  <p>InsightMenu</p>
  <v-row class="my-5">
    <InsightMenu tipoInsight="sono" viewDestino="insights" />
  </v-row>
  <v-row class="my-5">
    <InsightMenu tipoInsight="intensidade" viewDestino="insights" />
  </v-row>
  <v-row class="my-5">
    <InsightMenu tipoInsight="frequencia" viewDestino="insights" />
  </v-row>
  <v-row class="my-5">
    <CardExec nome="Card" viewDestino="exclist" />
  </v-row>
</template>

<script>
import TopToolbar from '@/components/TopToolbar.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import InsightMenu from '@/components/InsightMenu.vue'
import TreinoList from '@/components/TreinoList.vue'
import ChartFC from '@/components/ChartFC.vue'
//import Chart from 'https://cdn.jsdelivr.net/npm/chart.js';
//import Chart from 'chart.js/auto'
import LineChart from '@/components/LineChart.vue'
import CardExec from '@/components/CardExec.vue'
import { chartDataFc } from '@/assets/dadosStub.js'
import LoginForm from '@/components/LoginForm.vue'
import CadastroForm from '@/components/CadastroForm.vue'
import NovoAlunoForm from '@/components/NovoAlunoForm.vue'

export default {
  components: {
    TopToolbar,
    ProfileCard,
    BaseButton,
    InsightMenu,
    TreinoList,
    ChartFC,
    LineChart,
    CardExec,
    LoginForm,
    CadastroForm,
    NovoAlunoForm
  },
  data() {
    return {
      chartDataFc
    }
  }
}
</script>

<style></style>
