<template>
  <v-col cols="12">
    <v-card class="insight-menu" @click="navigateToView">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="text-h6 font-weight-bold">{{ selectedTitulo }}</v-card-title>
        </div>

        <div>
          <v-avatar class="mx-auto" size="60" rounded="0">
            <v-img :src="selectedLogo"></v-img>
          </v-avatar>
        </div>
      </div>
      <v-row class="my-0">
        <v-avatar class="mx-auto" elevation="0" size="100%" rounded="0">
          <v-img :src="selectedImage"></v-img>
        </v-avatar>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
import moon from '@/assets/moon.svg'
import calendar from '@/assets/calendar.svg'
import bpm from '@/assets/bpm.svg'
import tripleStripe from '@/assets/tripleStripe_green.svg'
import singleStripe from '@/assets/singleStripe.svg'
import heartRate from '@/assets/heartRate_green.svg'
// import workoutImage from './../assets/workoutImg.svg'

export default {
  name: 'InsightMenu',
  //  data() {
  //    return {
  //      sonoImg: tripleStripe,
  //      intensidadeImg: heartRate,
  //      frequenciaImg: singleStripe,
  //      workoutImage: workoutImage
  //    }
  //  },
  props: {
    tipoInsight: {
      type: String,
      required: true
    },
    viewDestino: {
      type: String
      //required: true
    }
  },
  computed: {
    selectedImage() {
      const images = {
        sono: tripleStripe,
        intensidade: heartRate,
        frequencia: singleStripe,
        todos: tripleStripe
      }
      return images[this.tipoInsight]
    },
    selectedLogo() {
      const logos = {
        sono: moon,
        intensidade: bpm,
        frequencia: calendar,
        todos: ''
      }
      return logos[this.tipoInsight]
    },
    selectedTitulo() {
      const titulos = {
        sono: 'Sono',
        intensidade: 'Intensidade',
        frequencia: 'Frequência',
        todos: 'Ver Insights'
      }
      return titulos[this.tipoInsight]
    }
  },
  methods: {
    navigateToView(viewName) {
      console.log(viewName)
      this.$router.push({ name: this.viewDestino })
    }
  }
}
</script>

<style scoped>
.insight-menu {
  border-radius: 28px;
  background: var(--green100);
  color: var(--green-top);
  padding-top: 8px;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 4px;
}
</style>
