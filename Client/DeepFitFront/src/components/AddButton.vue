<template>
    <v-layout justify-center>
        <button class="addButton"  @click="navigateToView">+</button>
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

<style>

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
    opacity: 0.7;
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
            opacity: 100%;
  }

</style>