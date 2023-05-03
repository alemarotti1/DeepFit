<template>
    <TopToolbar title="Exercícios"/>
    <br>
  <div id="container">
    <h1 class="text-center font-weight-normal">Todos os Exercícios</h1>

    <br>
    <div class="pesquisa">
      
      <div>
        
        <label>
          <img src="../assets/Search.svg">
          <input type="text" placeholder="Procurar Treino" v-model="pesquisa">
        </label>
      </div>
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
    <v-row class="my-5">
      <CardExec nome='Card' viewDestino="exclist"/>
    </v-row>
    <v-row class="my-5">
      <CardExec nome='Card' viewDestino="exclist"/>
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

  .addButton:hover {
    width: 65px;
    height: 65px;
    transform: scale(0.98);
  }

  .addButton:active {
            
            /* Scaling button to 0.98 to its original size */
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
            /* Lowering the shadow */
  }

  .pesquisa div label {
    display: flex;
    border: 1px solid #BFBFBF;
    background-color: white;
    box-shadow: 5px 5px 5px #aaaaaa4f;
    border-radius: 10px;
    padding-left: 5px;
  }
/*
  label::after {
	font-family: FontAwesome;
	float: left;
	margin-left: -1.5em;
	content: "\f002";
	color: #929090;

	left: 10px;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto;
}
input::placeholder {
    padding: 30px;
}
*/
</style>