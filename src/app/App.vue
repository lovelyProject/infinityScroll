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

// components
import MainHeader from "@/entities/MainHeader.vue";
import MainContent from "@/entities/MainContent.vue"

// helpers
import { parseQueryParams } from "@/app/helpers";

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

    const queryParams = {
      page: currentPage,
      results: countUserPerPage
    }

    const { PROTOCOL, DOMAIN } = process.env
    const url = PROTOCOL + DOMAIN;

    const result = await fetch(url + 'api?' + parseQueryParams(queryParams));
    const data = await result.json();

    usersList.value = usersList.value.length === 0 ? data.results : [...usersList.value, ...data.results];
  } catch (e) {
    console.log(e);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getUsers()
})
</script>
