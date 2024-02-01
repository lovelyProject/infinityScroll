<template>
  <div class="loader">
    <span class="loader__target" />
    <span class="loader__label">Подгружаем еще...</span>
  </div>
</template>

<style scoped lang="scss">
.loader {
  width: fit-content;

  &__target {
    margin: 0 auto;
    width: 48px;
    height: 48px;
    border: 5px solid #d2cfcf;
    border-bottom-color: #1b1d2d;
    border-radius: 50%;
    display: block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  &__label {
    margin-top: 5px;
    display: inline-block;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>