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
                <el-button>搜索</el-button>
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
                <FormItem :title="i.title" :sub-title="i.subTitle" :publish="i.publish" :count="i.count"></FormItem>
              </template>
            </div>
          </el-scrollbar>
          <!-- Pagination -->
          <el-pagination background layout="prev, pager, next" :total="1000" />
          <!-- Empty Tip -->
          <el-empty v-if="forms.length === 0" description="你还没有问卷，快去创建吧😄~" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="个人中心" name="userCenter">个人中心</el-tab-pane>
    </el-tabs>
    <!-- SelectTheApplicationScenario -->
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
    </el-drawer>
    <!-- CreateForm -->
    <el-drawer v-model="drawerCreateForm" title="I am the title" :size="media.drawerSelectTheApplicationScenarioSize"
      append-to-body :with-header="false" style="background-color: var(--jinn-background-color);">
      <ELPageHeaderCover @back="drawerCreateForm = false">
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
      <div style="margin-top: 2vh;display: flex;flex-direction: column;gap: 1vh;">
        <div style="display: flex;align-items: center;justify-content: space-between;">
          <el-button type="primary" text bg>
            {{ `选择${selectTheApplicationScenarioItem.title}模板` }}
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
        <template v-for="tab in selectTheApplicationScenarioItem.tabs" :key="tab.title">
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
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import useEventListenerPopstate from '@/hooks/useEventListenerPopstate';
import { useResponsiveValue } from '@/stores/media/media';
import type { CreateFormCommand, Form } from '@/types/Form';
import { computed, onMounted, ref } from 'vue';
import FormItem from './components/FormItem.vue';
import ELPageHeaderCover from '@/components/ELPageHeaderCover/ELPageHeaderCover.vue';
import type { SelectTheApplicationScenarioItemType } from './type';
import { getForm } from '@/services/form';

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
const getFormsHandler = async () => {
  const res = await getForm(0, 0)
  if (res.status === 200) {
    forms.value = res.data
  }
}

const tabPane = ref<string>('myForm');

const selectTheApplicationScenario = () => {
  drawerSelectTheApplicationScenario.value = true
}

const drawerSelectTheApplicationScenario = useEventListenerPopstate('drawerSelectTheApplicationScenario')

const testSelectTheApplicationScenarioItemTabs = [
  {
    title: '全部',
    list: [
      {
        title: '大学生消费情况调查问卷',
        count: 3,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 3,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 3,
      },
    ]
  },
  {
    title: '大学生',
    list: [
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
    ]
  },
]

const selectTheApplicationScenarioItem = ref<SelectTheApplicationScenarioItemType>({
  iconComponent: 'List',
  iconColor: 'var(--el-color-primary)',
  title: '调查',
  subTitle: '问卷调查',
  description: '问卷调查',
  tabs: testSelectTheApplicationScenarioItemTabs,
})
const drawerSelectTheApplicationScenarioItems: SelectTheApplicationScenarioItemType[] = [
  selectTheApplicationScenarioItem.value,
  {
    iconComponent: 'Tickets',
    iconColor: 'var(--el-color-danger)',
    title: '考试',
    subTitle: '可抽题·防作弊·自动阅卷',
    description: '可抽题·防作弊·自动阅卷',
    tabs: testSelectTheApplicationScenarioItemTabs,
  },
  {
    iconComponent: 'TakeawayBox',
    iconColor: 'var(--el-color-warning)',
    title: '投票',
    subTitle: '图文视频·排行榜·投票墙 🗳',
    description: '图文视频·排行榜·投票墙 🗳',
    tabs: testSelectTheApplicationScenarioItemTabs,
  },
]

const SelectTheApplicationScenarioItemHandler = (item: SelectTheApplicationScenarioItemType) => {
  selectTheApplicationScenarioItem.value = item
  if (!drawerCreateForm.value) drawerCreateForm.value = true
}

const drawerCreateForm = useEventListenerPopstate('drawerCreateForm')

const createForm = ref<CreateFormCommand>({} as CreateFormCommand)
const searchTemplateKeyword = ref<string>('')
</script>
