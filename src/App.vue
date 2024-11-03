<template>
  <header>
    <img alt="Jinn Collection logo" class="logo" src="@/assets/logo.svg" />
    <div class="wrapper">
      <HelloWorld msg="Jinn Collection" />
      <template v-if="mediaStore.isPc">
        <HeaderNav />
      </template>
      <template v-if="mediaStore.isMobile">
        <el-dropdown placement="bottom-end" ref="dropdownTemplate" trigger="click">
          <!-- <el-button> bottomEnd </el-button> -->
          <el-icon size="30" style="user-select: none;">
            <Operation />
          </el-icon>
          <template #dropdown>
            <HeaderNav @clickEvent="dropdownTemplate!.handleClose()" style="width: 40vw;" />
          </template>
        </el-dropdown>
      </template>
    </div>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import HeaderNav from '@/components/HeaderNav/HeaderNav.vue';
import { useTemplateRef } from 'vue';
import { type DropdownInstance } from 'element-plus';
import { useMediaStore } from './stores/media/media';

const dropdownTemplate = useTemplateRef<DropdownInstance>('dropdownTemplate')

const mediaStore = useMediaStore()

</script>
<style lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@include pc {

  header {
    display: flex;
    place-items: center;
    margin-bottom: 1.5rem;
  }

  .logo {
    margin: 0 2rem 0 0;
    width: 125px;
    height: 125px;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

@include mobile {

  header {
    display: flex;
    place-items: center;
    height: 55px;
    border-bottom: 1px solid var(--el-border-color);
  }

  .logo {
    margin: 0 0.5rem 0 1.5rem;
    width: 25px;
    height: 25px;
  }

  header .wrapper {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: space-between;
    padding-right: 2vw;
  }

  :deep(.el-dialog__header) {
    display: none;
  }

  :deep(.el-dialog) {
    border-radius: 0;
    box-shadow: none;
  }

}
</style>
