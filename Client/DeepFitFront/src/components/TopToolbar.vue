<template>
  <v-toolbar height="15" color="grey-lighten-5" class="py-1 text-grey-darken-3">
    <v-btn icon height="99%" width="15" elevation="1" @click="$router.go(-1)">
      <v-icon size="100%">mdi-chevron-left</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-title class="text-subtitle-2 text-center font-weight-medium">{{title}}</v-toolbar-title>
    <v-spacer></v-spacer>
    
    <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon height="99%" width="15" elevation="1" v-bind="props">
              	<v-icon size="100%">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
  </v-toolbar>
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
  data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    })
}
</script>

<style></style>