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

      <v-list-item class="my-2" @click="newExercise" rounded="xl"
        variant="tonal">
        <template v-slot:prepend>
          <v-icon :icon="'mdi-plus'"></v-icon>
        </template>

        <template v-slot:default>
          <v-list-item-content>
            <v-list-item-title>Adicionar exercício</v-list-item-title>
          </v-list-item-content>
        </template>
        
      </v-list-item>

    </v-list>
    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        
        
        <v-card-text>
          <v-form>
            <v-text-field
                v-model="selectedExercise.name"
                label="Nome do Exercício"
              ></v-text-field>
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
              <v-btn rounded="xl" color="red darken-1" class="delete-button" @click="deleteExercise">Excluir</v-btn>
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
          series: 4,
          reps: 12,
          carga: 35
        },
        {
          name: 'Afundo',
          series: 4,
          reps: 12,
          carga: 25
        },
        {
          name: 'Supino máquina',
          series: 4,
          reps: 12,
          carga: 25
        },
        {
          name: 'Remada',
          series: 3,
          reps: 12,
          carga: 30
        },
        {
          name: 'Puxada alta',
          series: 3,
          reps: 12,
          carga: 36
        },
        {
          name: 'Bíceps rosca direta',
          series: 4,
          reps: 12,
          carga: 12
        },
        {
          name: 'Tríceps polia',
          series: 4,
          reps: 12,
          carga: 15
        }
      ]
    }
  },
  methods: {
    openDialog(exercicio) {
      this.selectedExercise = JSON.parse(JSON.stringify(exercicio))
      this.index = this.exercicios.findIndex((e) => e.name === this.selectedExercise.name)
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    saveExercise() {
      // precisa chamar o componente pai para alterar a prop exercicios
      if (this.isNew) {
        const newExercise = {
          name: this.selectedExercise.name,
          series: this.selectedExercise.series,
          reps: this.selectedExercise.reps,
          carga: this.selectedExercise.carga
        }
        this.exercicios.push(newExercise)
        this.isNew = false
      } else {
        this.exercicios.splice(this.index, 1, this.selectedExercise)
      }
      this.closeDialog()
    },
    newExercise() {
      this.selectedExercise = {
        name: '',
        series: 0,
        reps: 0,
        carga: 0
      }
      this.isNew = true
      this.dialog = true
    },
    deleteExercise() {
    this.exercicios.splice(this.index, 1)
    this.closeDialog()
    }
  },
  
  data() {
    return {
      index: null,
      isNew: false,
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
