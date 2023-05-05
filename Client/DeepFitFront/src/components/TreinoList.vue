<template>
  <v-card class="mx-auto" minWidth="300" elevation="0">
    <v-list>
      <v-list-item
        rounded="xl"
        variant="tonal"
        class="my-2"
        v-for="(exercicio, index) in exercicios"
        :key="index"
        @click="openDialog(exercicio)"
      >
        <template v-slot:prepend>
          <v-icon :icon="'mdi-dumbbell'"></v-icon>
        </template>
        <v-list-item-content>
          <v-list-item-title>
            {{ exercicio.name }}
          </v-list-item-title>
          <v-list-item-subtitle class="d-flex">
            <span class="ml-2 mr-auto my-1 font-italic">{{
              'Séries/Reps: ' + exercicio.series + '/' + exercicio.reps
            }}</span>
            <span class="my-1 font-italic">{{ exercicio.carga + 'kg' }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-title>{{ selectedExercise.name }}</v-card-title>
        <v-card-text>
          <v-form>
            <div class="d-flex">
              <v-text-field
                v-model="selectedExercise.series"
                label="Séries"
                class="mr-4"
              ></v-text-field>
              <v-text-field v-model="selectedExercise.reps" label="Repetições"></v-text-field>
            </div>
            <v-text-field v-model="selectedExercise.carga" label="Carga"></v-text-field>
            <v-card-actions class="d-flex justify-center">
              <v-btn rounded="xl" class="salvar-button" @click="saveExercise">Salvar</v-btn>
              <v-btn rounded="xl" variant="tonal" color="grey darken-2" @click="closeDialog"
                >Cancelar</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'TreinoList',
  props: {
    exercicios: {
      type: () => Array,
      required: true,
      default: [
        {
          name: 'Agachamento',
          series: 3,
          reps: 10,
          carga: 100
        },
        {
          name: 'Supino',
          series: 3,
          reps: 8,
          carga: 80
        },
        {
          name: 'Remada',
          series: 3,
          reps: 12,
          carga: 60
        }
      ]
    }
  },
  methods: {
    openDialog(exercicio) {
      this.selectedExercise = JSON.parse(JSON.stringify(exercicio))
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    saveExercise() {
      // precisa chamar o componente pai para alterar a prop exercicios
      const index = this.exercicios.findIndex((e) => e.name === this.selectedExercise.name)
      this.exercicios.splice(index, 1, this.selectedExercise)
      this.closeDialog()
    }
  },
  data() {
    return {
      dialog: false,
      selectedExercise: null
    }
  }
}
</script>

<style scoped>
.salvar-button {
  color: white;
  background: var(--gradient-green);
}
</style>
