<template>
  <TopToolbar title="Exercícios" />
  <br />
  <div id="container">
    <h1 class="text-center font-weight-normal">Todos os Exercícios</h1>

    <br />
    <div class="pesquisa">
      <div>
        <label>
          <img src="../assets/Search.svg" />
          <input type="text" placeholder="Procurar Treino" v-model="pesquisa" />
        </label>
      </div>
      <strong>{{ pesquisa }}</strong>
    </div>
    <v-row no-gutters class="justify-space-between mb-8">
      <v-col cols="auto">
        <v-row no-gutters> </v-row>
      </v-col>
    </v-row>

    <v-row class="my-5">
      <CardExec nome="Card" viewDestino="exclist" />
    </v-row>
    <v-row class="my-5">
      <CardExec nome="Card" viewDestino="exclist" />
    </v-row>
    <v-row class="my-5">
      <CardExec nome="Card" viewDestino="exclist" />
    </v-row>
    <v-row class="my-5">
      <CardExec nome="Card" viewDestino="exclist" />
    </v-row>
  </div>

  <AddButton nome="button" viewDestino="addexec" />
</template>

<script>
import TopToolbar from '@/components/TopToolbar.vue'
import CardExec from '@/components/CardExec.vue'
import AddButton from '@/components/AddButton.vue'

export default {
  components: {
    TopToolbar,
    CardExec,
    AddButton
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

.pesquisa div label {
  display: flex;
  border: 1px solid #bfbfbf;
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
