<template>
  <div>
    <v-row>
      <v-col cols="11">
        <span>Bem vindo</span>
        <h1>{{ userName }}</h1> 
        
      </v-col>
      <v-col cols="1">
        <v-icon icon="mdi-account-outline">

        </v-icon>
      </v-col>

    </v-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      userName: 'João Gabriel' 
    }
  }
}
</script>
<style>
</style>