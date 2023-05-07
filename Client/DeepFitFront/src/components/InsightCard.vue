<template>
  <v-card max-width="400" class="mx-auto" elevation="0">
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card class="insight-header" :style="{ background: headerBackground }">
            <v-row class="d-flex flex-no-wrap justify-space-between">
              <v-col cols="auto">
                <span class="text-h6">{{ insight.titulo }}</span
                ><br />
                <span class="text-subtitle-1 font-italic">{{ insight.resumo }}</span>
              </v-col>

              <v-col cols="auto">
                <span class="text-subtitle-2">{{ insight.valor }}</span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12">
          <br />
          <v-card class="insight-body" :style="{ color: textColor }">
            <v-card-title class="text-h7">insight</v-card-title>
            <v-card-text class="font-italic text-grey-darken-2">{{ insight.texto }}</v-card-text>
            <v-card-text class="font-italic font-weight-bold">{{ insight.sugestao }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'InsightCard',
  props: {
    insight: {
      type: Object,
      required: true,
      default: () => ({
        titulo: 'Título',
        resumo: 'Resumo',
        valor: 'valor',
        texto: 'texto',
        sugestao: 'sugestão',
        positivo: false
      })
    }
  },
  computed: {
    headerBackground() {
      if (this.insight.positivo) {
        return 'var(--gradient-green)'
      } else {
        return 'var(--gradient-red)'
      }
    },
    textColor() {
      if (this.insight.positivo) {
        return 'var(--green-top)'
      } else {
        return 'red'
      }
    }
  }
  /*,
    
    data() {
        return {
            tituloIns: 'Última Noite',
            resumoIns: 'Sono de boa qualidade',
            valorIns: '8h25m',
            textoIns: 'Seu aluno está com uma boa qualidade do sono, essencial para evoluir bem no treino.',
            sugestaoIns: 'Tudo bem por aqui!'
        }
    }*/
}
</script>

<style scoped>
.insight-header {
  border-radius: 28px;
  color: white;
  padding-top: 8px;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 16px;
}

.insight-body {
  border-radius: 28px;
  background: var(--green100);

  padding: 12px;
}
</style>
