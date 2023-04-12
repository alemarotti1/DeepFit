<template>
    <v-card max-width="400" class="mx-auto" elevation="0">
        <v-container>
            <v-row dense>
                <v-col cols="12">
                    <v-card class="insight-header">
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-card-title class="text-h5">{{tituloIns}}</v-card-title>
                                <v-card-subtitle class="text-h6 font-italic">{{resumoIns}}</v-card-subtitle>
                            </div>

                            <div>
                                <v-card-title class="text-h7">{{valorIns}}</v-card-title>
                            </div>
                        </div>

                    </v-card>
                </v-col>

                <v-col cols="12">
                    <br>
                    <v-card class="insight-body">
                        <v-card-title class="text-h7">insight</v-card-title>
                        <v-card-text class="font-italic text-grey-darken-2">{{textoIns}}</v-card-text>
                        <v-card-text class="font-italic font-weight-bold">{{sugestaoIns}}</v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: 'Insight',
    data() {
        return {
            tituloIns: 'Última Noite',
            resumoIns: 'Sono de boa qualidade',
            valorIns: '8h25m',
            textoIns: 'Seu aluno está com uma boa qualidade do sono, essencial para evoluir bem no treino.',
            sugestaoIns: 'Tudo bem por aqui!'
        }
    }
}
 
</script>

<style scoped>
.insight-header {
    border-radius: 28px;
    background: var(--gradient-green);
    color: white;
    padding-top: 8px;
    padding-left: 12px;
    padding-right: 12px;
    padding-bottom: 16px;
}

.insight-body {
    border-radius: 28px;
    background: var(--green100);
    color: var(--green-top);
    padding: 12px;
}
</style>