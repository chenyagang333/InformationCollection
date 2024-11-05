<template>
  <div style="margin-top: 2vh;display: flex;flex-direction: column;gap: 1vh;">
    <div style="display: flex;align-items: center;justify-content: space-between;">
      <el-button type="primary" text bg>
        {{ `选择${selectTheApplicationScenarioItem?.title}模板` }}
      </el-button>
      <el-input v-model="searchTemplateKeyword" style="width: 240px" placeholder="搜索其他用户公开的问卷">
        <template #append>
          <el-button icon="Search" />
        </template>
      </el-input>
    </div>
  </div>
  <el-tabs v-model="activeSelectTheApplicationScenarioItemName" class="demo-tabs"
    @tab-click="selectTheApplicationScenarioItemHandleClick">
    <template v-for="tab in testSelectTheApplicationScenarioItemTabs" :key="tab.title">
      <el-tab-pane :label="tab.title" :name="tab.title">
        <div style="display: grid;grid-template-columns: repeat(2 ,1fr );gap: 10px;">
          <template v-for="tabItem in tab.list" :key="tabItem.title">
            <el-card shadow="hover">
              <div>{{ tabItem.title }}</div>
              <span style="margin-top: 0.5vh;">
                <el-text type="info" size="small">{{ `共${tabItem.count}题` }}</el-text>
                <el-text type="info" size="small">预览</el-text>
              </span>
            </el-card>
          </template>
        </div>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { SelectTheApplicationScenarioItemType } from '../type';
import { getFormTemplate } from '@/services/form';
import type { FormTemplateTabs } from '@/types/Form';

const props = defineProps<{ selectTheApplicationScenarioItem?: SelectTheApplicationScenarioItemType }>()

const searchTemplateKeyword = ref<string>('')

const testSelectTheApplicationScenarioItemTabs = ref<FormTemplateTabs>([])

const activeSelectTheApplicationScenarioItemName = ref<string>('')

const selectTheApplicationScenarioItemHandleClick = (name: string) => {
  activeSelectTheApplicationScenarioItemName.value = name
}

const _getFormTemplate = async () => {
  const keyword = searchTemplateKeyword.value
  const res = await getFormTemplate(props.selectTheApplicationScenarioItem?.id ?? 0, keyword)
  console.log(res)
  if (res.status === 200) {
    if (keyword) {
      testSelectTheApplicationScenarioItemTabs.value = res.data
      activeSelectTheApplicationScenarioItemName.value = res.data[0]?.title
    } else {
      testSelectTheApplicationScenarioItemTabs.value = res.data
      activeSelectTheApplicationScenarioItemName.value = res.data[0]?.title

    }
  }
}

onMounted(async () => {
  _getFormTemplate()
})

</script>
