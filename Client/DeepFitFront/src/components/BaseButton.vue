<template>
    <v-layout justify-center>
        <v-btn class="base-button" rounded="xl" size="large"  @click="navigateToView">{{ buttonText }}</v-btn>
    </v-layout>
  </template>

<script>
  export default {
  name: 'BaseButton',
  props: {
    buttonText: {
      type: String,
      required: true
    },
    viewDestino: {
      type: String,
      required: true
    }
  },
  methods: {
    navigateToView() {
      this.$router.push({ name: this.viewDestino })
    }
  }
}
</script>

<style scoped>
.base-button {
  background: var(--gradient-green);
  color: white;
  text-align: center;
  font-weight: medium;
  text-transform: unset !important;
  width: 85%;
  margin: 0 auto;
}
</style>