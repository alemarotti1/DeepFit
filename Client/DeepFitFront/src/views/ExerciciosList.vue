<template>
    <TopToolbar title="Exercícios"/>
    <br>
  <div id="container">
    <h1 class="text-center font-weight-normal">Todos os Exercícios</h1>

    <br>
    <div class="pesquisa">
      
      <input type="text" placeholder="Procurar Treino" v-model="pesquisa">
      <strong>{{ pesquisa }}</strong>
    </div>
    <v-row no-gutters class="justify-space-between mb-8">
        <v-col cols="auto">
        <v-row no-gutters>
          
        
        </v-row>
    </v-col>
    </v-row>

    <v-row class="my-5">
      <CardExec nome='Card' viewDestino="exclist"/>
    </v-row>
  </div>

  <button class="addButton">
    +
  </button>

</template>

<script>
import TopToolbar from '@/components/TopToolbar.vue';
import CardExec from '@/components/CardExec.vue';

export default {
  components: {
    TopToolbar,
    CardExec
  }
}
</script>

<style>
  #container {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }
  .pesquisa {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
  .pesquisa input {
    width: 80vw;
    border: 1px solid #BFBFBF;
    background-color: white;
    box-shadow: 5px 5px 5px #aaaaaa4f;
    border-radius: 10px;
    padding: 8px;
  }
  .addButton {
    background: linear-gradient(274.42deg, #03989E 0%, #62DBC8 124.45%);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    right: 20px;
    position: fixed;
    bottom: 20px;
    color: white;
    font-weight: bolder;
    font-size: larger;
  }
</style>