<template>
  <div>
    <canvas ref="lineChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'LineChart',
  props: {
    chartData: {
      type: Array,
      required: true
    },
    withMedia: {
      type: Boolean,
      required: true
    }
  },
  async mounted() {
    if (this.chartData?.length) {
      await this.renderChart(this.withMedia)
    }
  },
  methods: {
    criaMedia(data) {
      console.log(data)
      let primeira_metade = data.slice(0, parseInt(data.length / 2))
      let segunda_metade = data.slice(parseInt(data.length / 2), data.length)
      console.log({ primeira_metade })
      let elems = primeira_metade.length
      let soma1 = primeira_metade.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
      console.log({ soma1 })

      let soma2 = segunda_metade.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
      let media1 = soma1 / elems
      let media2 = soma2 / elems
      console.log({ media2 })

      const arrayValues = []
      for (let i = 0; i < data.length; i += 1) {
        arrayValues.push(i < elems ? media1 : media2)
      }

      console.log(arrayValues)
      return arrayValues
    },
    renderChart(withMedia) {
      const ctx = this.$refs.lineChart.getContext('2d')

      //const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      //gradient.addColorStop(0, 'rgba(76, 175, 80, 0.3)');
      //gradient.addColorStop(1, 'rgba(76, 175, 80, 0)');

      const data = {
        labels: this.chartData?.map((data) => data.time),
        datasets: withMedia
          ? [
              {
                label: 'batimentos',
                data: this.chartData?.map((data) => data.value),
                backgroundColor: '#01DBC7ff',
                borderColor: '#01DBC7ff',
                borderWidth: 1,
                pointBackgroundColor: '#01DBC7ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 1,
                pointRadius: 2,
                pointHitRadius: 10
              },
              {
                label: 'médias locais',
                data: this.criaMedia(this.chartData?.map((data) => data.value)),
                backgroundColor: '#0000ff',
                borderColor: '#0000ff',
                borderWidth: 1,
                pointBackgroundColor: '#0000ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 1,
                pointRadius: 2,
                pointHitRadius: 10
              }
            ]
          : [
              {
                label: 'batimentos',
                data: this.chartData?.map((data) => data.value),
                backgroundColor: '#01DBC7ff',
                borderColor: '#01DBC7ff',
                borderWidth: 1,
                pointBackgroundColor: '#01DBC7ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 1,
                pointRadius: 2,
                pointHitRadius: 10
              }
            ]
      }

      new Chart(ctx, {
        type: 'line',
        data: data
      })
    },
    getData() {
      return [
        { time: '00', value: 75 },
        { time: '01', value: 123 },
        { time: '02', value: 85 },
        { time: '03', value: 135 },
        { time: '04', value: 72 },
        { time: '05', value: 145 },
        { time: '06', value: 62 },
        { time: '07', value: 185 },
        { time: '08', value: 91 },
        { time: '09', value: 183 },
        { time: '10', value: 75 },
        { time: '11', value: 123 },
        { time: '12', value: 85 },
        { time: '13', value: 135 },
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
