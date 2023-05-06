<template>
  <v-row no-gutters justify="space-between" class="align-center">
    <v-col cols="auto">
      <v-row no-gutters class="align-center">
        <img style="width: 60px; height: 60px" :src="`${fotoUrl}`" />
        <div>
          <v-card-title class="text-body-1 font-weight-bold text-center text-wrap">{{
            nome
          }}</v-card-title>
          <v-card-text>{{ tempo }}</v-card-text>
        </div>
      </v-row>
    </v-col>
    <v-col cols="auto">
      <b-button>
        <img src="@/assets/Icon-Next.svg" />
      </b-button>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    nome: {
      type: String,
      required: true
    },
    tempo: {
      type: String,
      required: true
    },
    fotoUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.card-todo {
  display: flex;
  background-color: rgba(185, 185, 185, 0.048);
  border-radius: 15px;
  width: 90vw;
  align-items: center;
  justify-content: center;
}
.img-title {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
}
.txts {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding-right: 40vw;
}

.txts .v-card-title {
  padding: 0;
  margin: 0;
}
</style>
