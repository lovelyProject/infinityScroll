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
import MainHeader from '@/entities/MainHeader.vue';
import MainContent from '@/entities/MainContent.vue';

// helpers
import { parseQueryParams } from '@/app/helpers';

let currentPage = 1;
const countUserPerPage = 10;

const isLoading = ref(false);
const isError = ref(false);

const usersList = ref([]);

/**
 * @typedef Response {
 *  @property { boolean } ok - статус код < 400?
 *  @property { number } status - статус код
 *  @property { string } statusText - расшифровка статуса
 *  @property { boolean } redirected - есть ли редирект?
 *  @property { string } url - полный url запроса
 *  @property { object } headers - заголовки
 *
 * }
 */

/**
 * Функция отправляет запрос на пользователей и сохраняет результат в списке пользователей
 */
async function getUsers() {
  try {
    if (isLoading.value) {
      return null;
    }

    isLoading.value = true;

    const queryParams = {
      page: currentPage,
      results: countUserPerPage
    };

    const { PROTOCOL, DOMAIN } = process.env;
    const url = PROTOCOL + DOMAIN;

    /**
     * Ответ приходящий с сервера
     * Можно конвертировать в json формат
     * @type { Response }
     */
    const result = await fetch(`${url}api?${parseQueryParams(queryParams)}`);

    /** данные с сервера
     * @type { object }
     * @property { object } info
     * @property { number } info.page - номер страницы
     * @property { number } info.results - кол-во запрашиваемых пользователей
     * @property { string } info.seed - кол-во запрашиваемых пользователей
     * @property { string } info.version - кол-во запрашиваемых пользователей
     *
     * @property { User[] } results - массив пользователей
     */
    const data = await result.json();

    usersList.value =
      usersList.value.length === 0
        ? data.results
        : [...usersList.value, ...data.results];
  } catch (error) {
    isError.value = true;
    throw new Error('Ошибка при получении пользователей');
  } finally {
    isLoading.value = false;
  }
}

function getUsersFromNextPage() {
  currentPage++;
  getUsers();
}

onMounted(() => {
  getUsers();
});
</script>
