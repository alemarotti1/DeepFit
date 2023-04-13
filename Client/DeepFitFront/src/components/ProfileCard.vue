<template>
    <v-card class="mx-auto" width="200" elevation="0">
        <v-card-title class="text-body-1 font-weight-bold text-center text-wrap">{{ nome }}</v-card-title>
        <v-row class="mx-auto">
            <v-avatar class="mx-auto" size="150" rounded="0">
                <v-img cover :src="fotoUrl"></v-img>
            </v-avatar>
        </v-row>

    </v-card>
</template>

<script>
export default {
    props: {
        nome: {
            type: String,
            required: true
        },
        fotoUrl: {
            type: String
        }
    }
}
</script>
