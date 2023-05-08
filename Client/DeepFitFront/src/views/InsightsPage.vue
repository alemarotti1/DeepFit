<template>
  <v-row>
    <v-col>
      <TopToolbar title="Insights" />

      <v-row class="mt-10 mb-5">
        <!-- removido para mvp -->
        <!-- <InsightMenu tipoInsight='sono' viewDestino="sono"/> -->
        <InsightMenu tipoInsight="sono" @click="snackbar = true" />
      </v-row>
      <v-row class="my-5">
        <InsightMenu tipoInsight="intensidade" @click="openIntensidade" />
      </v-row>
      <v-row class="my-5">
        <InsightMenu tipoInsight="condicionamento" @click="openCondicionamento" />
      </v-row>
      <v-row class="my-5">
        <!-- Nao existe Page para esse caso ainda -->
        <!-- <InsightMenu tipoInsight="frequencia" viewDestino="insightfrequencia" /> -->
        <InsightMenu tipoInsight="frequencia" @click="snackbar = true" />
      </v-row>
    </v-col>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <template v-slot:actions>
        <v-btn color="green" variant="text" @click="snackbar = false"> Fechar </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import TopToolbar from '@/components/TopToolbar.vue'
import InsightMenu from '@/components/InsightMenu.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    TopToolbar,
    InsightMenu
  },
  data: () => ({
    snackbar: false,
    text: `Sem dados suficientes para insight.`
  }),
  computed: {
    ...mapGetters('aluno', ['selectedAluno']),
    ...mapGetters('auth', ['logedUser'])
  },
  methods: {
    ...mapActions('insights', ['getCondicionamento']),
    openIntensidade() {
      if (this.logedUser.usuario === 'alemarotti') {
        this.$router.push('intensidadefc')
      } else {
        this.snackbar = true
      }
    },
    openCondicionamento() {
      if (this.logedUser.usuario === 'alemarotti') {
        this.getCondicionamento(this.selectedAluno?.token_acesso)
        this.$router.push('condicionamento')
      } else {
        this.snackbar = true
      }
    }
  }
}
</script>

<style></style>
