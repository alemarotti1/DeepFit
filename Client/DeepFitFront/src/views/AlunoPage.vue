<template>
  <v-col>
    <v-row class="my-0">
      <TopToolbar title="Aluno" />
    </v-row>
    <v-row class="my-5">
      <ProfileCard
        :nome="aluno.nome"
        :fotoUrl="fotoUrl || 'https://picsum.photos/500/300?image=39'"
      />
    </v-row>
    <v-row class="mt-10 mb-5">
      <InsightMenu tipoInsight="todos" viewDestino="insights" />
    </v-row>

    <h3>Próximo treino:</h3>
    <v-row class="my-1">
      <TreinoList />
    </v-row>
    <v-row class="my-5">
      <BaseButton buttonText="Editar Treinos" viewDestino="treinos" />
    </v-row>
  </v-col>
</template>

<script>
import TopToolbar from '@/components/TopToolbar.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import TreinoList from '@/components/TreinoList.vue'
import InsightMenu from '@/components/InsightMenu.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    fotoUrl: {
      type: String
    }
  },
  components: {
    TopToolbar,
    ProfileCard,
    BaseButton,
    TreinoList,
    InsightMenu
  },
  methods: {
    ...mapActions('aluno', ['list'])
  },
  computed: {
    ...mapGetters('aluno', ['selectedAluno']),
    aluno() {
      return (
        this.selectedAluno || {
          nascimento: '16/09/1998',
          nome: 'Pedro Santos',
          fotoUrl: 'https://picsum.photos/500/300?image=35'
        }
      )
    }
  }
}
</script>

<style></style>
