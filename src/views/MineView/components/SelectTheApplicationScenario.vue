<template>
  <el-drawer v-model="drawerSelectTheApplicationScenario" title="I am the title"
    :size="media.drawerSelectTheApplicationScenarioSize" :with-header="false" append-to-body
    style="background-color: var(--jinn-background-color);">
    <ELPageHeaderCover @back="drawerSelectTheApplicationScenario = false">
      选择应用场景
    </ELPageHeaderCover>
    <el-space fill wrap :fill-ratio="0" direction="horizontal" style="width: 100%;margin-top: 3vh;">
      <el-card v-for="i in drawerSelectTheApplicationScenarioItems" :key="i.title" shadow="hover"
        style="cursor: pointer;" @click="SelectTheApplicationScenarioItemHandler(i)">
        <div style="display: flex;flex-direction: column;align-items: center;gap: 5px;">
          <el-icon :size="46" :color="i.iconColor">
            <component :is="i.iconComponent" />
          </el-icon>
          <el-text size="large">{{ i.title }}</el-text>
          <el-text type="info">{{ i.subTitle }}</el-text>
        </div>
      </el-card>
    </el-space>
    <!-- CreateForm -->
    <CreateForm v-model="drawerCreateForm"
      :drawer-select-the-application-scenario-size="media.drawerSelectTheApplicationScenarioSize"
      :select-the-application-scenario-item="selectTheApplicationScenarioItem" />
  </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { SelectTheApplicationScenarioItemType } from '../type';
import { useResponsiveValue } from '@/stores/media/media';
import useEventListenerPopstate from '@/hooks/useEventListenerPopstate';
import CreateForm from './CreateForm.vue';
import { getApplicationScenario } from '@/services/form';
import type { ApplicationScenario } from '@/types/Form';


const drawerSelectTheApplicationScenario = defineModel<boolean>({ default: false })

const drawerCreateForm = useEventListenerPopstate('drawerCreateForm')

const SelectTheApplicationScenarioItemHandler = (item: SelectTheApplicationScenarioItemType) => {
  selectTheApplicationScenarioItem.value = item
  if (!drawerCreateForm.value) drawerCreateForm.value = true
}

const media = useResponsiveValue<{
  drawerSelectTheApplicationScenarioSize: string;
}>(configure => {
  configure.mobile = {
    drawerSelectTheApplicationScenarioSize: '100%',
  }
  configure.pc = {
    drawerSelectTheApplicationScenarioSize: '50%',
  }
})

const selectTheApplicationScenarioItem = ref<SelectTheApplicationScenarioItemType>({} as SelectTheApplicationScenarioItemType)
const drawerSelectTheApplicationScenarioItems = ref<ApplicationScenario[]>([])

const getApplicationScenarioHandler = async () => {
  const res = await getApplicationScenario()
  if (res.status === 200) {
    drawerSelectTheApplicationScenarioItems.value = res.data
    selectTheApplicationScenarioItem.value = res.data[0]
  }
}

onMounted(() => {
  getApplicationScenarioHandler()
})
</script>
