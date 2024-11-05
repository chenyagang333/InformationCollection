<template>
  <el-drawer v-model="drawerCreateForm" title="I am the title" :size="drawerSelectTheApplicationScenarioSize"
    append-to-body :with-header="false" style="background-color: var(--jinn-background-color);">
    <ELPageHeaderCover @back="drawerCreateForm = false" :color="selectTheApplicationScenarioItem.iconColor">
      {{ `创建${selectTheApplicationScenarioItem.title}` }}
    </ELPageHeaderCover>
    <!-- Top Tip -->
    <div
      style="display: flex;align-items: center;gap: 10px;margin-top: 1vh;padding: 1vh;background-color: var(--el-color-info-light-9);border-radius: 4px;">
      <el-icon :size="16" :color="selectTheApplicationScenarioItem.iconColor">
        <component :is="selectTheApplicationScenarioItem.iconComponent" />
      </el-icon>
      <el-text type="info" size="small">{{ selectTheApplicationScenarioItem.description }}</el-text>
    </div>
    <!-- Title -->
    <el-card shadow="never" style="margin-top: 1vh;">
      <div style="display: flex;flex-direction: column; align-items: center;gap: 10px;">
        <div style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
          <div>
            <el-text size="large">从空白创建</el-text>
            <el-text type="primary" size="large">{{ selectTheApplicationScenarioItem.title }}</el-text>
          </div>
          <el-button type="primary" text bg @click="drawerCreateForm = false">
            切换问卷类型&nbsp;
            <el-icon>
              <ArrowDown />
            </el-icon>
          </el-button>
        </div>
        <el-input v-model="createForm.title" :placeholder="`请输入${selectTheApplicationScenarioItem.title}标题`" />
        <el-input v-model="createForm.subTitle" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
          :placeholder="`请输入${selectTheApplicationScenarioItem.title}副标题（可为空）`" />
        <el-button type="primary" plain style="width: 50%;">{{ `创建${selectTheApplicationScenarioItem.title}`
          }}</el-button>
      </div>
    </el-card>
    <!-- Form Template -->
    <CreateFormTemplate :selectTheApplicationScenarioItem="selectTheApplicationScenarioItem" />
  </el-drawer>
</template>

<script setup lang="ts">
import type { CreateFormCommand } from '@/types/Form';
import type { SelectTheApplicationScenarioItemType } from '../type';
import { ref } from 'vue';
import CreateFormTemplate from './CreateFormTemplate.vue'


defineProps<{
  drawerSelectTheApplicationScenarioSize: string;
  selectTheApplicationScenarioItem: SelectTheApplicationScenarioItemType;
}>()

const drawerCreateForm = defineModel<boolean>({ default: false })


const createForm = ref<CreateFormCommand>({} as CreateFormCommand)

</script>
