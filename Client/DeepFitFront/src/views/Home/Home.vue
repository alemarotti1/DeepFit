<template>
  <div>
    <v-row no-gutters class="justify-space-between mb-8">
      <v-col cols="auto">
        <v-row no-gutters>
          <span class="text-caption">Bem vindo(a)</span>
        </v-row>
        <v-row no-gutters>
          <span class="font-weight-bold text-h4">{{ userName }}</span>
        </v-row>
      </v-col>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-col cols="auto">
            <v-icon v-bind="props" icon="mdi-account-outline" size="large"> </v-icon>
          </v-col>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in visibleUserFunctions" :key="i">
            <v-list-item-title v-if="item.visible()" @click="item.click">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
    <v-img :src="calendarSVG"></v-img>
    <v-row no-gutters class="my-2">
      <v-col cols="12">
        <v-card
          class="mb-3"
          elevation="0"
          style="
            border-radius: 20px;
            background: linear-gradient(rgba(3, 152, 158, 0.2), rgba(255, 255, 255, 0)),
              center center / cover no-repeat;
          "
          @click="usersCardClick"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="font-weight-medium text-subtitle-2">
                Alunos
                <v-icon icon="mdi-chevron-right"> </v-icon>
              </v-card-title>

              <v-card-subtitle class="text-caption"
                >{{ alunos.length }} alunos hoje</v-card-subtitle
              >

              <v-card-actions>
                <v-btn @click="usersCardClick" style="background: #fff" rounded>
                  <span class="text-cyan-darken-2 text-overline text-none"> Ver mais </span>
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar style="background-color: #fff" class="ma-3" size="115" rounded="1">
              <v-img :src="usersImage"></v-img>
            </v-avatar>
          </div>
        </v-card>
        <v-card
          class="mb-3"
          elevation="0"
          style="
            border-radius: 20px;
            background: linear-gradient(rgba(3, 152, 158, 0.2), rgba(255, 255, 255, 0)),
              center center / cover no-repeat;
          "
          @click="exercisesCardClick"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="font-weight-medium text-subtitle-2">
                Exercícios
                <v-icon icon="mdi-chevron-right"> </v-icon>
              </v-card-title>

              <v-card-subtitle class="text-caption"
                >{{ exercicios.length }} exercícios cadastrados</v-card-subtitle
              >

              <v-card-actions>
                <v-btn @click="exercisesCardClick" style="background: #fff" rounded>
                  <span class="text-cyan-darken-2 text-overline text-none"> Ver mais </span>
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar style="background-color: #fff" class="ma-3" size="115" rounded="1">
              <v-img :src="workoutImage"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import usersImage from '@/assets/AlunosIMGGroup10297.svg'
import workoutImage from '@/assets/ExercisesIMGHome.svg'
import calendarSVG from '../../assets/CalendarSVG.svg'
export default {
  name: 'HomeDefault',
  data() {
    return {
      usersImage: usersImage,
      workoutImage: workoutImage,
      calendarSVG: calendarSVG,
      userFunctions: [
        {
          visible: () => {
            return this.logged
          },
          title: 'Deslogar',
          click: () => {
            this.logout(this.logedUser)
            this.$router.push('login')
          }
        }
      ]
    }
  },
  computed: {
    visibleUserFunctions() {
      const filtered = this.userFunctions.filter((item) => item.visible())
      if (filtered.length) {
        return filtered
      }
      return [
        {
          visible: () => {
            return true
          },
          title: 'Novo Aluno',
          click: () => {
            this.$router.push('novoaluno')
          }
        }
      ]
    },
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

      return date
    },
    ...mapState({
      logged: (state) => state.auth.logged,
      logedUser: (state) => state.auth.logedUser,
      alunos: (state) => state.aluno.alunos,
      exercicios: (state) => state.exercicios.list
    }),
    userName() {
      if (this.logged) {
        return this.logedUser.usuario
      }
      return 'Treinador'
    }
  },
  created() {
    this.list({ force: true })
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('aluno', ['list']),

    userNameClick() {
      this.$router.push({ name: 'alunos' })
    },
    usersCardClick() {
      this.$router.push({ name: 'alunos' })
    },
    exercisesCardClick() {
      this.$router.push({ name: 'exclist' })
    }
  }
}
</script>

<style scoped></style>
