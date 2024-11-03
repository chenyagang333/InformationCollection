<template>
  <nav>
    <template v-for="(i, index) in navArray" :key="index">
      <template v-if="i.show">
        <component :is="i.tag ?? RouterLink" :to="i.to" @click="$emit('clickEvent')">
          {{ i.text }}
        </component>
      </template>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { RouterLink } from 'vue-router'
import LogOut from './components/LogOut.vue';
import { computed } from 'vue';

const userStore = useUserStore();

defineEmits<{
  (e: 'clickEvent'): void
}>()

const navArray = computed(() => [
  {
    to: '/',
    text: '首页',
    show: true
  },
  {
    to: '/about',
    text: '关于我们',
    show: true
  },
  {
    to: '/mine',
    text: '我的',
    show: userStore.isAuthenticated
  },
  {
    tag: LogOut,
    to: '',
    text: '退出登录',
    show: userStore.isAuthenticated
  },
  {
    to: '/login',
    text: '登录',
    show: !userStore.isAuthenticated
  },
])

</script>

<style lang="scss" scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav {
  :deep(a) {
    display: inline-block;
    cursor: pointer;


  }
}




@include pc {
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;

    :deep(a) {
      border-right: 1px solid var(--color-border);
      padding: 0 1rem;

      &:last-of-type {
        border: 0;
      }
    }
  }


}

@include mobile {
  nav {
    font-size: 1rem;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;

    :deep(a) {
      padding: 1rem 0;
      border-bottom: 1px solid var(--color-border);
      width: 70%;
    }
  }

}
</style>
