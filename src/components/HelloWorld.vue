<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      免费开源的问卷调查系统<br />
      数据加密存储，安全可靠
    </h3>
  </div>
</template>

<style lang="scss" scoped>
h3 {
  font-size: 1.2rem;
}

.greetings {
  @include pc {
    h1 {
      font-weight: 500;
      font-size: 2.6rem;
      position: relative;
      top: -10px;
    }

    .greetings h1,
    .greetings h3 {
      text-align: left;
    }
  }

  @include mobile {
    display: flex;

    h3 {
      display: none;
    }
  }
}
</style>
