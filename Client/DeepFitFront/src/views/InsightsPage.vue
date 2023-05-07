<template>
  <v-row>
    <v-col>
      <TopToolbar title="Insights" />

      <v-row class="mt-10 mb-5">
        <!-- removido para mvp -->
        <!-- <InsightMenu tipoInsight='sono' viewDestino="sono"/> -->
        <InsightMenu tipoInsight="sono" />
      </v-row>
      <v-row class="my-5">
        <InsightMenu tipoInsight="intensidade" viewDestino="intensidadefc" />
      </v-row>
      <v-row class="my-5">
        <!-- Nao existe Page para esse caso ainda -->
        <!-- <InsightMenu tipoInsight="frequencia" viewDestino="insightfrequencia" /> -->
        <InsightMenu tipoInsight="frequencia" />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import TopToolbar from '@/components/TopToolbar.vue'
import InsightMenu from '@/components/InsightMenu.vue'

export default {
  components: {
    TopToolbar,
    InsightMenu
  }
}
</script>

<style></style>
