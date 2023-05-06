<template>
  <TopToolbar title="Alunos" />
  <div v-if="studentsData.length" class="pt-4">
    <v-card
      elevation="0"
      style="
        border-radius: 10px;
        background: linear-gradient(rgba(3, 152, 158, 0.2), rgba(255, 255, 255, 0)),
          center center / cover no-repeat;
      "
      v-for="item in studentsData"
      :key="item"
      class="d-flex flex-row mb-2 p-0"
      @click="clickAluno(item)"
      link
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <v-avatar class="ma-3" size="110" rounded="0">
          <v-img :src="item.fotoUrl" cover />
        </v-avatar>
        <div>
          <v-card-title class="text-h5">
            {{ item.name }}
          </v-card-title>

          <v-card-subtitle>{{ item.age }} anos</v-card-subtitle>
          <v-card-text>Clique para ver treinos e insights</v-card-text>
        </div>
      </div>
    </v-card>
  </div>
  <div v-else>
    <v-card-title class="text-h5"> Não possui alunos ainda. </v-card-title>
  </div>
  <AddButton nome="button" viewDestino="novoaluno" />
</template>

<script>
import TopToolbar from '@/components/TopToolbar.vue'
import AddButton from '@/components/AddButton.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AddButton,
    TopToolbar
  },
  data() {
    return {
      trainerID: 0
    }
  },
  methods: {
    ...mapActions('aluno', ['list', 'clickOpenAluno']),
    async clickAluno(aluno) {
      console.log(aluno)
      await this.clickOpenAluno(aluno)
      this.$router.push({ name: 'aluno' })
    }
  },
  created() {
    this.list({ trainerID: this.trainerID, force: true })
  },
  computed: {
    ...mapGetters('aluno', ['alunos']),
    studentsData() {
      if (this.alunos.length) return this.alunos
      return []
    }
  }
}
</script>

<style></style>
