<template>
  <TopToolbar title="Alunos" />
  <div class="pt-4">
      <v-card
        color="#f5f5f5"
        v-for="item in studentsData" 
        :key="item"
        class="d-flex flex-row mb-2 p-0" 
        @click="() => $router.push({ name: 'aluno', params: { id: item.id } })"
        link
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-avatar
            class="ma-3"
            size="110"
            rounded="0"
          >
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
</template>

<script>
import TopToolbar from '@/components/TopToolbar.vue';

import { mapGetters, mapActions } from 'vuex';


export default {
  components: {
    TopToolbar
  },
  data() {
    return {
      trainerID: 0,
      studentsData: [
        {
          id: 0,
          name: "Gabriel",
          age: 23,
          fotoUrl: "https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
        },
        {
          id: 1,
          name: "Joana",
          age: 47,
          fotoUrl: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
        }
      ]
    }
  },
  methods: {
    ...mapActions('aluno', ['list']) 
  },
  created() {
    this.list({ trainerID: this.trainerID, force: true});
  },
  computed: {
    ...mapGetters('aluno', ['alunos'])
  }
}
</script>

<style></style>