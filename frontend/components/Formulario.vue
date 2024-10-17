<template>
    <div class="flex justify-center lg:justify-normal">
        <div class="flex flex-col items-center pt-8 w-8/12 lg:w-6/12 lg:pt-[9rem]">
        <h2 class="text-2xl font-bold mb-5 sm:text-3xl lg:text-4xl">Crie uma Task</h2>
        <form @submit.prevent="criarTask" class="space-y-4">
            <input v-model="titulo" type="text" placeholder="Título da Task..." class="w-full p-3 bg-gray-200 rounded-md focus:outline-none md:text-lg lg:text-xl" required>
           <textarea v-model="conteudo" placeholder="Conteúdo da Task..." rows="4" class="w-full p-3 bg-gray-200 rounded-md focus:outline-none md:text-lg lg:text-xl" required></textarea>
           <div class="text-center">
               <button type="submit" class="bg-[#2B2B2B] text-white px-6 py-2 mt-4 rounded-md hover:bg-[#595959] md:text-lg lg:text-xl">Criar</button>
           </div>
        </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const titulo = ref('')
const conteudo = ref('')

const validacao = ref({
    titulo: '',
    conteudo: ''
})

const criarTask = () => {
    
}

</script>