<template>
  <div>
    <v-row no-gutters class="justify-space-between mb-8">
      <v-col cols="auto">
        <v-row no-gutters>
          <span class="text-caption">Bem vindo(a)</span>
        </v-row>
        <v-row no-gutters>
          <span @click="userNameClick" class="font-weight-bold text-h4">{{ userName }}</span>
        </v-row>
      </v-col>
      <v-col cols="auto">
        <v-icon @click="userIconClick" icon="mdi-account-outline" size="large"> </v-icon>
      </v-col>
    </v-row>
    <v-row no-gutters class="my-8">
      <v-col cols="12">
        <v-card
          class="mb-3"
          elevation="0"
          style="
            background: linear-gradient(rgba(3, 152, 158, 0.2), rgba(255, 255, 255, 0)),
              center center / cover no-repeat;
          "
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title @click="usersCardClick" class="font-weight-medium text-subtitle-2">
                Alunos
                <v-icon icon="mdi-chevron-right"> </v-icon>
              </v-card-title>

              <v-card-subtitle class="text-caption">4 alunos hoje</v-card-subtitle>

              <v-card-actions>
                <v-btn @click="usersCardClick" style="background: #fff" rounded>
                  <span class="text-cyan-darken-2 text-overline text-none"> Ver mais </span>
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="115" rounded="1">
              <v-img :src="usersImage"></v-img>
            </v-avatar>
          </div>
        </v-card>
        <v-card
          class="mb-3"
          elevation="0"
          style="
            background: linear-gradient(rgba(3, 152, 158, 0.2), rgba(255, 255, 255, 0)),
              center center / cover no-repeat;
          "
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title @click="exercisesCardClick" class="font-weight-medium text-subtitle-2">
                Exercícios
                <v-icon icon="mdi-chevron-right"> </v-icon>
              </v-card-title>

              <v-card-subtitle class="text-caption">30 exercícios cadastrados</v-card-subtitle>

              <v-card-actions>
                <v-btn @click="exercisesCardClick" style="background: #fff" rounded>
                  <span class="text-cyan-darken-2 text-overline text-none"> Ver mais </span>
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="90" rounded="1">
              <v-img :src="workoutImage"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import usersImage from './../../assets/usersGroupImg.svg'
import workoutImage from './../../assets/workoutImg.svg'
export default {
  name: 'HomeDefault',
  data() {
    return {
      userName: 'João Gabriel',
      usersImage: usersImage,
      workoutImage: workoutImage
    }
  },
  methods: {
    userIconClick() {
      console.log('clicou no icone do usuario')
    },
    userNameClick() {
      console.log('clicou no nome do usuario')
    },
    usersCardClick() {
      console.log('clicou no card de usuarios')
    },
    exercisesCardClick() {
      console.log('clicou no card de exercicios')
    }
  },
  computed: {
    getDate() {
      const today = new Date()
      const date =
        today.getFullYear() +
        '-' +
        ((today.getMonth() + 1).length === 2
          ? today.getMonth() + 1
          : '0' + (today.getMonth() + 1)) +
        '-' +
        today.getDate()
      console.log(date)
      return date
    }
  }
}
</script>

<style></style>
