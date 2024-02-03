<template>
  <div class="card">
    <div class="card__header">
      <img
        :src="picture.large"
        loading="lazy"
        alt="fan's photo"
        class="card__image"
      />
    </div>
    <div class="card__details">
      <h3 class="card__title">
        {{ name.first }}
      </h3>
      <a :href="`mailto:${email}`">{{ email }}</a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  /**
   * @type { object }
   * @property { string } title - статус семейный (мисс миссис и пр)
   * @property { string } first - имя
   * @property { string } last - фамилия
   */
  name: {
    type: Object,
    default: () => {}
  },

  email: {
    type: String,
    default: '#'
  },

  /**
   * @type { object }
   * @property { string } large - url большой картинки
   * @property { string } medium - url средней картинки
   * @property { string } thumbnail - url маленькой картинки
   */
  picture: {
    type: Object,
    default: () => {}
  }
});
</script>

<style lang="scss" scoped>
.card {
  padding: 15px 5px 15px 5px;
  text-align: center;
  border: 1px solid transparent;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 3px;

  &__header {
    width: 200px;
    margin: 0 auto;
    height: 200px;
  }

  &__title {
    margin-top: 15px;
  }

  &__image {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
}
</style>
