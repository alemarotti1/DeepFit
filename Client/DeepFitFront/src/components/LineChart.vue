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
      }
    },
    mounted () {
      this.renderChart();
    },
    methods: {
      renderChart () {
        const ctx = this.$refs.lineChart.getContext('2d');
  
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(76, 175, 80, 0.3)');
        gradient.addColorStop(1, 'rgba(76, 175, 80, 0)');
  
        const data = {
          labels: this.chartData.map(data => data.time),
          datasets: [
            {
              label: 'Value',
              data: this.chartData.map(data => data.value),
              backgroundColor: gradient,
              borderColor: 'rgba(76, 175, 80, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(76, 175, 80, 1)',
              pointBorderColor: '#fff',
              pointBorderWidth: 1,
              pointRadius: 3,
              pointHitRadius: 10,
            }
          ]
        };
  
        new Chart(ctx, {
          type: 'line',
          data: data,
          options: {
            scales: {
              xAxes: [{
                gridLines: {
                  color: 'rgba(0, 0, 0, 0.1)'
                }
              }],
              yAxes: [{
                gridLines: {
                  color: 'rgba(0, 0, 0, 0.1)'
                }
              }]
            }
          }
        });
      },
      getData() {
        return [
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
        ];
      }
    }
  };
  </script>
  
 