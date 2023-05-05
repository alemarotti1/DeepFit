<template>
  <div class="toptoolbar">
    <TopToolbar title="Novo exercício" />
  </div>
  <br />

  <div class="addimg">
    <img src="../assets/Plus.svg" />
  </div>
  <br />
  <v-row class="completo">
    <div class="infosExec">
      <p class="mt-10">Nome do exercício</p>

      <input type="text" placeholder="Nome" v-model="nome" />

      <p class="mt-10">Descrição</p>

      <input type="text" placeholder="Descrição" v-model="descricao" />
    </div>
  </v-row>
  <v-row class="mt-15">
    <BaseButton @click="salvarExercicio" buttonText="Salvar" viewDestino="aluno" />
  </v-row>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import TopToolbar from '@/components/TopToolbar.vue'

export default {
  components: {
    BaseButton,
    TopToolbar
  },
  data() {
    return {
      nome: '',
      descricao: ''
    }
  },

  methods: {
    salvarExercicio() {
      // salvar
    }
  }
}
</script>

<style>
.toptoolbar .v-toolbar-title__placeholder {
  overflow: inherit;
  right: 9px;
}

.completo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.addimg {
  background-color: rgb(163, 163, 163);
  height: 30vh;
  border-radius: 25px;
  display: flex;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.infosExec {
  display: flex;
  display: flex;
  flex-direction: column;
  width: 85%;
}

.infosExec input {
  width: 100%;
  padding: 15px;
  border: 1px solid #bfbfbf4b;
  background-color: #bfbfbf4b;
  box-shadow: 5px 5px 5px #aaaaaa1a;
  border-radius: 10px;
}

.infosExec p {
  font-weight: bold;
}
</style>
