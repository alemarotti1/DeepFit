<template>
    <div>
        <v-card class="card-todo" elevation="0">
            <div class="img-title">
                <img src='../assets/Vector.png' />
                <div class="txts">
                    <v-card-title class="text-body-1 font-weight-bold text-center text-wrap">{{ nome }}</v-card-title>
                    <v-card-text>05:00</v-card-text>
                </div>
                <b-button>
                <img src='../assets/Icon-Next.svg' />
                </b-button>
            </div>

        </v-card>
    </div>
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

<style>
    .card-todo{
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