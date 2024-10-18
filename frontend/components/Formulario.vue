<template>
    <div class="flex justify-between max-w-[1800px] ml-auto mr-auto">
        <div class="flex flex-col items-center pt-8 w-8/12 lg:w-6/12 lg:pt-[8rem]">
            <h2 class="text-2xl font-bold mb-5 sm:text-3xl lg:text-4xl">Crie uma Task</h2>
            <form @submit.prevent="criarTask" class="space-y-4">
                <input v-model="titulo" type="text" placeholder="Título da Task..." class="w-full p-3 bg-gray-200 rounded-md focus:outline-none md:text-lg lg:text-xl" required>
                <textarea v-model="conteudo" placeholder="Conteúdo da Task..." rows="4" class="w-full min-h-[300px] resize-none overflow-y-auto p-3 bg-gray-200 rounded-md focus:outline-none md:text-lg lg:text-xl" required></textarea>
                <div class="text-center">
                    <button type="submit" class="bg-[#2B2B2B] text-white px-6 py-2 mt-4 rounded-md hover:bg-[#595959] md:text-lg lg:text-xl">Criar</button>
                </div>
            </form>
        </div>
        
        <div class="flex flex-col pt-8 w-8/12 lg:w-6/12 lg:pt-[6rem]">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold mb-5 sm:text-3xl lg:text-4xl">Minhas tarefas</h2>
                <div class="flex gap-2">
                    <button class="py-1 px-3 bg-[#2B2B2B] rounded-lg text-white border-l-4 border-gray-500">Todas</button>
                    <button class="py-1 px-3 bg-[#2B2B2B] rounded-lg text-white border-l-4 border-red-500">A fazer</button>
                    <button class="py-1 px-3 bg-[#2B2B2B] rounded-lg text-white border-l-4 border-yellow-500">Fazendo</button>
                    <button class="py-1 px-3 bg-[#2B2B2B] rounded-lg text-white border-l-4 border-green-500">Concluído</button>
                </div>
            </div>
            <ul class="flex flex-col gap-3 overflow-y-auto h-[600px] custom-scrollbar md:">
                <li class="bg-gray-200 p-4 rounded-lg border-l-[6px] border-red-500">
                    <div class="flex justify-between items-center border-b-2 border-gray-400 pb-2">
                        <h1 class="text-3xl font-bold">TITULO</h1>
                        <span class="text-xl font-bold">data de criação</span>
                    </div>
                    <div class="text-2xl pt-4">status</div>
                </li>
                <li class="bg-gray-200 p-4 rounded-lg border-l-[6px] border-green-500">
                    <div class="flex justify-between items-center border-b-2 border-gray-400 pb-2">
                        <h1 class="text-3xl font-bold">TITULO</h1>
                        <span class="text-xl font-bold">data de criação</span>
                    </div>
                    <div class="text-2xl pt-4">status</div>
                </li>
                <li class="bg-gray-200 p-4 rounded-lg border-l-[6px] border-yellow-500">
                    <div class="flex justify-between items-center border-b-2 border-gray-400 pb-2">
                        <h1 class="text-3xl font-bold">TITULO</h1>
                        <span class="text-xl font-bold">data de criação</span>
                    </div>
                    <div class="text-2xl pt-4">status</div>
                </li>
                <li class="bg-gray-200 p-4 rounded-lg border-l-[6px] border-red-500">
                    <div class="flex justify-between items-center border-b-2 border-gray-400 pb-2">
                        <h1 class="text-3xl font-bold">TITULO</h1>
                        <span class="text-xl font-bold">data de criação</span>
                    </div>
                    <div class="text-2xl pt-4">status</div>
                </li>
                <li class="bg-gray-200 p-4 rounded-lg border-l-[6px] border-red-500">
                    <div class="flex justify-between items-center border-b-2 border-gray-400 pb-2">
                        <h1 class="text-3xl font-bold">TITULO</h1>
                        <span class="text-xl font-bold">data de criação</span>
                    </div>
                    <div class="text-2xl pt-4">status</div>
                </li>
                <li class="bg-gray-200 p-4 rounded-lg border-l-[6px] border-green-500">
                    <div class="flex justify-between items-center border-b-2 border-gray-400 pb-2">
                        <h1 class="text-3xl font-bold">TITULO</h1>
                        <span class="text-xl font-bold">data de criação</span>
                    </div>
                    <div class="text-2xl pt-4">status</div>
                </li>
                <li class="bg-gray-200 p-4 rounded-lg border-l-[6px] border-yellow-500">
                    <div class="flex justify-between items-center border-b-2 border-gray-400 pb-2">
                        <h1 class="text-3xl font-bold">TITULO</h1>
                        <span class="text-xl font-bold">data de criação</span>
                    </div>
                    <div class="text-2xl pt-4">status</div>
                </li>
                <li class="bg-gray-200 p-4 rounded-lg border-l-[6px] border-red-500">
                    <div class="flex justify-between items-center border-b-2 border-gray-400 pb-2">
                        <h1 class="text-3xl font-bold">TITULO</h1>
                        <span class="text-xl font-bold">data de criação</span>
                    </div>
                    <div class="text-2xl pt-4">status</div>
                </li>
            </ul>
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

<style scoped>
.custom-scrollbar {
  scrollbar-width: none; 
  scrollbar-color: #888 #f1f1f1;
}
</style>