<template>
    <Chart
      :size="{ width: 300, height: 300 }"
      :data="data"
      :margin="margin"
      >
  
      <template #layers>
        <Grid strokeDasharray="2,2" />
        <Line :dataKeys="['name', 'pl']" color="red"/>
      </template>
  
    </Chart>

  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Chart, Grid, Line } from 'vue3-charts'
  //import { plByMonth } from '@/data'
  
  export default defineComponent({
    name: 'LineChart',
    components: { Chart, Grid, Line },
    setup() {
        const plByMonth = [
            { name: '1', pl: 1000, avg: 500, inc: 300 },
            { name: '2', pl: 2000, avg: 900, inc: 400 },
            { name: '3', pl: 400, avg: 400, inc: 500 },
            { name: '4', pl: 3100, avg: 1300, inc: 700 },
            { name: '5', pl: 200, avg: 100, inc: 200 },
            { name: '6', pl: 600, avg: 400, inc: 300 },
            { name: '7', pl: 500, avg: 90, inc: 100 },
            { name: '8', pl: 1000, avg: 500, inc: 300 },
            { name: '9', pl: 2000, avg: 900, inc: 400 },
            { name: '10', pl: 400, avg: 400, inc: 500 },
            { name: '11', pl: 3100, avg: 1300, inc: 700 },
            { name: '12', pl: 200, avg: 100, inc: 200 },
            { name: '13', pl: 600, avg: 400, inc: 300 },
            { name: '14', pl: 500, avg: 90, inc: 100 },
            { name: '15', pl: 1000, avg: 500, inc: 300 },
            { name: '16', pl: 2000, avg: 900, inc: 400 },
            { name: '17', pl: 400, avg: 400, inc: 500 },
            { name: '18', pl: 3100, avg: 1300, inc: 700 },
            { name: '19', pl: 200, avg: 100, inc: 200 },
            { name: '20', pl: 600, avg: 400, inc: 300 }
            ]
      const data = ref(plByMonth)
      const direction = ref('horizontal')
      const margin = ref({
        left: 0,
        top: 20,
        right: 20,
        bottom: 0
      })
  
      return { data, direction, margin }
    }
  })
  </script>
  
  <style>
  #app {
    color: var(--green300)
  }
  </style>