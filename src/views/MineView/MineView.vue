<template>
  <div>
    <el-tabs type="border-card" stretch v-model="tabPane" :style="tabsStyles"
      style="background-color: var(--jinn-background-color)">
      <el-tab-pane label="我的问卷" name="myForm">
        <div style="display: flex; flex-direction: column;gap: 10px;">
          <div style="display: flex;gap: 10px">
            <!-- Search Form Input -->
            <el-input v-model="searchInput" placeholder="问卷标题关键词" prefix-icon="Search" style="flex: 1;">
              <template #append>
                <el-button @click="searchFormHandler">搜索</el-button>
              </template>
            </el-input>
            <!-- Create Form Button -->
            <el-button v-if="tabPane !== 'createForm'" size="" type="success" plain
              @click="selectTheApplicationScenario">
              <span class="text">创建问卷</span>
              <img alt="Add" src="@/assets/logo.svg" width="16" height="16" />
            </el-button>
          </div>
          <!-- Form List -->
          <el-scrollbar :style="scrollbarStyles">
            <div style="flex-direction: column;display: flex;gap: 10px;">
              <template v-for="(i) in forms" :key="i.id">
                <FormItem :item="i"></FormItem>
              </template>
            </div>
          </el-scrollbar>
          <!-- Pagination -->
          <el-pagination background layout="prev, pager, next" @current-change="paginationCurrentChangeHandler"
            :total="1000" />
          <!-- Empty Tip -->
          <el-empty v-if="forms.length === 0" description="你还没有问卷，快去创建吧😄~" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="个人中心" name="userCenter">个人中心</el-tab-pane>
    </el-tabs>
    <!-- SelectTheApplicationScenario -->
    <SelectTheApplicationScenario v-model="drawerSelectTheApplicationScenario" />
  </div>
</template>

<script setup lang="ts">
import useEventListenerPopstate from '@/hooks/useEventListenerPopstate';
import { useResponsiveValue } from '@/stores/media/media';
import type { Form } from '@/types/Form';
import { computed, onMounted, ref } from 'vue';
import FormItem from './components/FormItem.vue';
import { getForm } from '@/services/form';
import SelectTheApplicationScenario from './components/SelectTheApplicationScenario.vue';

onMounted(() => {
  getFormsHandler()
})

const media = useResponsiveValue<{
  tabsHeight: string;
  drawerSelectTheApplicationScenarioSize: string;
}>(configure => {
  configure.mobile = {
    tabsHeight: 'calc(100vh - 55px)',
    drawerSelectTheApplicationScenarioSize: '100%',
  }
  configure.pc = {
    tabsHeight: '80vh',
    drawerSelectTheApplicationScenarioSize: '50%',
  }
})


const tabsStyles = computed(() => {
  return {
    height: media.value.tabsHeight,
  }
})
const scrollbarStyles = computed(() => {
  return {
    height: `calc(${media.value.tabsHeight} - 152px)`
  }
})
const searchInput = ref<string>('');

const forms = ref<Form[]>([])
const getFormsHandler = async (current: number = 1, size: number = 10) => {
  const res = await getForm(current, size, searchInput.value)
  if (res.status === 200) {
    forms.value = res.data
  }
}

const searchFormHandler = () => {
  getFormsHandler()
}
const paginationCurrentChangeHandler = (current: number) => {
  getFormsHandler(current)
}

const tabPane = ref<string>('myForm');

const selectTheApplicationScenario = () => {
  drawerSelectTheApplicationScenario.value = true
}

const drawerSelectTheApplicationScenario = useEventListenerPopstate('drawerSelectTheApplicationScenario')







</script>
