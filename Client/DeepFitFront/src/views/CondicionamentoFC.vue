<template>
  <TopToolbar title="Intensidade" />
  <v-row v-if="!loading">
    <v-col>
      <v-row class="mt-10 mb-5 mx-auto" justify="center">
        <LineChart :withMedia="true" :chartData="dadosChart" />
      </v-row>

      <v-row class="mt-10 mb-5">
        <InsightCard :insight="dadosInsight" />
      </v-row>
      <v-row class="my-5">
        <BaseButton buttonText="Editar Treino" viewDestino="treinos" />
      </v-row>
    </v-col>
  </v-row>
  <div v-else>carregando...</div>
</template>

<script>
import TopToolbar from '@/components/TopToolbar.vue'
import InsightCard from '@/components/InsightCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import LineChart from '@/components/LineChart.vue'
import { chartDataBasal } from '@/assets/dadosBasal.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    TopToolbar,
    InsightCard,
    BaseButton,
    LineChart
  },
  computed: {
    ...mapGetters('insights', ['dadosCondicionamento'])
  },
  async created() {
    this.loading = true
    this.dadosChart = await this.chartDataBasalComp()
    this.loading = false
  },
  methods: {
    async chartDataBasalComp() {
      console.log(this.dadosCondicionamento)
      const trat = await this.tratamentoDadosCond(this.dadosCondicionamento)
      return trat?.length ? trat : chartDataBasal
    },
    convertNascimento(valorEmString) {
      let d = valorEmString.split('/')
      let dat = new Date(d[2] + '/' + d[1] + '/' + d[0])
      return dat
    },
    tratamentoDadosCond(dadosDoBack) {
      if (dadosDoBack?.length) {
        const tratado = []

        dadosDoBack.forEach((item) => {
          const timeValue = new Date(item.data_coleta).toLocaleString('pt-BR')
          const d = timeValue.split('/')
          const dayMonth = d[0] + '/' + d[1]
          // console.log({ timeValue, dayMonth })

          tratado.push({ time: dayMonth, value: item.bpm })
        })
        // console.log({ tratado })
        return tratado
      } else {
        return []
      }
    }
  },
  data() {
    return {
      dadosChart: [],
      loading: true,
      dadosInsight: {
        titulo: 'Frequência Basal',
        resumo: 'em decrescimento',
        valor: this.dadosCondicionamento?.length ? '77.5bpm' : '72.2bpm',
        texto: 'Após acordar a frequência cardíaca do aluno tem sido abaixo da média passada.',
        sugestao:
          'Isso significa que o condicionamento físico desse aluno está melhorando a longo prazo.',
        positivo: true
      }
    }
  }
}
</script>

<style></style>
