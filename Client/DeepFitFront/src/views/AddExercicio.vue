<template>

    <div class="toptoolbar">
        <TopToolbar title="Novo exercício"/>
    </div>
    <br>
    
    <div class="addimg">
        <img src="../assets/Plus.svg">
    </div>
    <br>
<div class="completo">
    <div class="infosExec">
        <p>Nome do exercício</p>
        
        <input type="text" placeholder="Nome" v-model="nome">

        <br>
        <br>
        <p>Descrição</p>
        
        <input type="text" placeholder="Descrição" v-model="descricao">
    </div>

    
    <button class="addButton"  @click="navigateToView">Salvar</button>
    
</div>
</template>

<script>
import TopToolbar from '@/components/TopToolbar.vue';

export default {
  components: {
    TopToolbar
  }
}

</script>

<style>
    .toptoolbar .v-toolbar-title__placeholder{
        overflow: inherit;
        right: 9px;
    }

    .completo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .addimg {
        background-color: rgb(163, 163, 163);
        height: 30vh;
        border-radius: 25px;
        display: flex;
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
    }

    .infosExec {
        display: flex;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .infosExec input {
        width: 100%;
        padding: 15px;
        border: 1px solid #bfbfbf4b;
        background-color: #bfbfbf4b;
        box-shadow: 5px 5px 5px #aaaaaa1a;
        border-radius: 10px;
    }

    .infosExec p {
        font-weight: bold;
    }
  
    .addButton {
    background: linear-gradient(274.42deg, #03989E 0%, #62DBC8 124.45%);
    border-radius: 80px;
    width: 78vw;
    height: 10vh;
    margin: 0 auto;
    bottom: 13px;
    position: fixed;
    color: white;
    
    font-weight: medium;
    font-size: larger;
    opacity: 0.7;
  }

  .addButton:hover {
    width: 290px;
    height: 75px;
    transform: scale(0.98);
  }

  .addButton:active {
            
            /* Scaling button to 0.98 to its original size */
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
            /* Lowering the shadow */
            opacity: 100%;
  }

</style>