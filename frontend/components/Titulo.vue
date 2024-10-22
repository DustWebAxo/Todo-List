<template>
  <nav
    :class="[
      'mx-auto py-8 border-b-2',
      isDarkMode ? 'bg-[#313131] border-gray-400' : 'bg-white border-gray-300',
    ]"
  >
    <div
      class="flex items-center gap-4 px-6 justify-between max-w-[1880px] mx-auto"
    >
      <div
        :class="[
          'text-xl sm:text-xl md:text-2xl xl:text-3xl font-bold',
          isDarkMode ? 'text-white' : 'text-black',
        ]"
      >
        DustWeb.
      </div>
      <button @click="toggleDarkMode" class="flex items-center justify-center">
        <i
          :class="[
            isDarkMode
              ? 'fas fa-sun bg-[#4b4b4b] text-white text-sm transition hover:bg-[#777777] py-3 px-[13px] rounded-full'
              : 'fas fa-moon bg-[#2B2B2B] text-white text-sm transition hover:bg-zinc-700  py-3 px-[14px] rounded-full',
          ]"
        ></i>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useThemeStore } from "../stores/themeStore";
import { storeToRefs } from "pinia";
import "@fortawesome/fontawesome-free/css/all.css";

const themeStore = useThemeStore();
const { isDarkMode } = storeToRefs(themeStore);
const toggleDarkMode = themeStore.toggleDarkMode;
</script>
