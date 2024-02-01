<template>
  <div class="app">
    <main-header />
    <main-content
      :users-list="usersList"
      :is-loading="isLoading"
      :is-error="isError"
      @on-increase-page="getUsersFromNextPage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import MainHeader from "@/entities/MainHeader.vue";
import MainContent from "@/entities/MainContent.vue"

import axios from '@/app/plugins/axios/axios';

let currentPage = 1;
const countUserPerPage = 10;
const isLoading = ref(false);
const isError = ref(false);

const usersList = ref([]);

function getUsersFromNextPage() {
  currentPage++;
  getUsers()
}

async function getUsers() {
  try {
    if (isLoading.value) {
      return null;
    }
    isLoading.value = true;

    /**
     * @type { response } data
     */
    const { data } = await axios.get('api/', {
      params: {
        page: currentPage,
        results: countUserPerPage
      }
    });

    usersList.value = usersList.value.length === 0 ? data.results : [...usersList.value, ...data.results];
  } catch (e) {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getUsers()
})
</script>
