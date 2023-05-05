<template>
  <v-row>
    <v-col>
      <v-toolbar height="15" color="grey-lighten-5" class="py-1 text-grey-darken-3">
        <v-btn icon height="99%" width="15" elevation="1" @click="$router.back()">
          <v-icon size="100%">mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title class="text-subtitle-2 text-center">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon height="99%" width="15" elevation="1" v-bind="props">
              <v-icon size="100%">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-title @click="item.click">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TopToolbar',
  props: {
    title: {
      type: String,
      required: true
    }
  },

  //TODO: personalizar itens do menu como props?
  data() {
    return {
      items: [
        {
          title: 'Home',
          click: () => {
            this.$router.push('home')
          }
        },
        {
          title: 'Novo Aluno',
          click: () => {
            this.$router.push('novoaluno')
          }
        },
        {
          title: 'Deslogar',
          click: () => {
            this.$router.push('login')
          }
        }
      ]
    }
  }
}
</script>

<style></style>
