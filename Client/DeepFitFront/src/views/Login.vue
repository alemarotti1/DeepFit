<template>
    <v-card class="mx-auto px-3" height="100%" elevation="0">
        <v-row class="mb-5">
            <LoginForm />
        </v-row>

        <v-row class="mx-auto my-5" justify="center">
            <h3>Ainda não tem cadastro?</h3>
        </v-row>
        <v-spacer></v-spacer>

        <v-row class="mx-auto my-5">
            <BaseButton buttonText="Criar nova conta" viewDestino="cadastro" />
        </v-row>
    </v-card>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import BaseButton from '@/components/BaseButton.vue';


export default {
  components: {
    LoginForm,
    BaseButton,
  }
}
</script>

<style></style>