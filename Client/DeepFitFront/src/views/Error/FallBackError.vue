<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="auto">
        <v-icon icon="mdi-alert-circle" size="150"></v-icon>
      </v-col>
      <v-col cols="12">
        <v-card-title class="text-center text-wrap text-h3">Opa, erro!</v-card-title>
      </v-col>
      <v-col cols="12">
        <BaseButton buttonText="Voltar à página anterior" @click="$router.back()" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'

export default {
  components: {
    BaseButton
  }
}
</script>
<style scoped>
h1 {
  font-size: 150px;
  line-height: 150px;
  font-weight: 700;
  color: #252932;
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px,
    rgba(61, 61, 61, 0.3) 3px 3px;
}
</style>
