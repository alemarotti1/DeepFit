<template>
    <v-card max-width="400" class="mx-auto" elevation="0">
        <v-container>
            <v-row dense>
                <v-col cols="12">
                    <v-card class="insight-header" :style="{ background: headerBackground }">
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-card-title class="text-h5">{{insight.titulo}}</v-card-title>
                                <v-card-subtitle class="text-h6 font-italic">{{insight.resumo}}</v-card-subtitle>
                            </div>

                            <div>
                                <v-card-title class="text-subtitle-1">{{insight.valor}}</v-card-title>
                            </div>
                        </div>

                    </v-card>
                </v-col>

                <v-col cols="12">
                    <br>
                    <v-card class="insight-body" :style="{ color: textColor }">
                        <v-card-title class="text-h7">insight</v-card-title>
                        <v-card-text class="font-italic text-grey-darken-2">{{insight.texto}}</v-card-text>
                        <v-card-text class="font-italic font-weight-bold">{{insight.sugestao}}</v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>