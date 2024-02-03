<template>
  <main class="main" ref="wrapperUsersElement">
    <ul class="main__list">
      <li
        v-for="{ name, email, picture, id } in usersList"
        :key="id.value"
        class="main__item"
      >
        <user-card :name="name" :email="email" :picture="picture" />
      </li>
    </ul>
    <p v-if="isError">Ошибка сервера...</p>
    <transition name="fade">
      <common-loader v-if="isLoading" class="main__loader" />
    </transition>
  </main>
</template>

<script setup>
/**
 * @typedef User {
 *     @property { string } cell - номер телефона
 *     @property { string } email - почта
 *     @property { string } gender - пол (м/ж)
 *
 *     @property { object } picture - объект с разными размерами картинок
 *     @property { string } picture.large - большая картинка
 *     @property { string } picture.medium - средняя картинка
 *     @property { string } picture.thumbnail - маленькая картинка
 *
 *     @property { object } id - уникальные данные пользователя
 *     @property { string } id.name - уникальные данные пользователя
 *     @property { string } id.value - уникальные данные пользователя
 *
 *     @property { object } dob
 *     @property { number } dob.age
 *     @property { object } dob.date
 *
 *     @property { string } nat - национальность
 *
 *     @property { object } name - объект с ФИО
 *     @property { string } name.first - имя
 *     @property { string } name.last - фамилия
 *     @property { string } name.title - семейный статус (мисс, миссис, мистер и пр)
 * }
 */
import { onMounted, ref, defineEmits, onUnmounted } from 'vue';

// components
import UserCard from '@/entities/UserCard.vue';
import CommonLoader from '@/shared/CommonLoader.vue';

// helpers
import { throttle } from '@/app/helpers';

const emit = defineEmits(['onIncreasePage']);

defineProps({
  /**
   * @type { User[] }
   */
  usersList: {
    type: Array,
    default: () => []
  },

  isLoading: {
    type: Boolean,
    default: false
  },

  isError: {
    type: Boolean,
    default: false
  }
});

const wrapperUsersElement = ref(null);

/**
 * Проверка есть ли необходимость для подгрузки дополнительных данных
 */
function checkIsNeedToLoadUsers() {
  const { scrollTop, clientHeight, scrollHeight } = wrapperUsersElement.value;
  // 145px размер отступа снизу
  const isNeedToLoadUsers = scrollTop + clientHeight >= scrollHeight - 145;

  if (isNeedToLoadUsers) {
    emit('onIncreasePage');
  }
}

onMounted(() => {
  wrapperUsersElement.value.addEventListener(
    'scroll',
    throttle(checkIsNeedToLoadUsers, 250)
  );
});

onUnmounted(() => {
  wrapperUsersElement.value.removeEventListener(
    'scroll',
    throttle(checkIsNeedToLoadUsers, 250)
  );
});
</script>

<style lang="scss" scoped>
.main {
  max-height: calc(100vh - $header-height);
  overflow-y: auto;
  padding-bottom: 145px;

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding-top: 25px;
    width: 900px;
    margin: 0 auto;
    padding-bottom: 50px;
  }

  &__loader {
    margin: 15px auto 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
