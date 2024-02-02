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

let currentPage = 1;
const countUserPerPage = 10;

const isLoading = ref(false);
const isError = ref(false);

const usersList = ref([]);

function getUsersFromNextPage() {
  currentPage++;
  getUsers()
}

/**
 * @function parseQueryParams - парсит объект в строку с query параметрами
 * @param { object } objectWithQuery - объект с query параметрами, где название это ключ, а значение - это значение ключа
 * @returns { string } - возвращает строка с query параметрами
 */
function parseQueryParams(objectWithQuery) {
  let query = '';
  const lastParam = Object.keys(objectWithQuery).at(-1);

  for (let [key, value] of Object.entries(objectWithQuery)) {
    query += `${key}=${value}`;

    if (key !== lastParam) {
      query += '&'
    }
  }

  return query;
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

    const result = await fetch('https://randomuser.me/api?' + parseQueryParams(queryParams));
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
