<template>
  <el-space fill wrap :fill-ratio="0" direction="horizontal" style="width: 100%;margin-top: 3vh;">
    <el-card v-for="i in items" :key="i.title" shadow="hover" style="cursor: pointer;">
      <div style="display: flex;flex-direction: column;align-items: center;gap: 5px;">
        <el-icon :size="46" :color="i.iconColor">
          <component :is="i.iconComponent" />
        </el-icon>
        <el-text size="large">{{ i.title }}</el-text>
        <el-text type="info">{{ i.subTitle }}</el-text>
      </div>
    </el-card>
  </el-space>
</template>

<script setup lang="ts">


const items = [
  {
    iconComponent: 'List',
    iconColor: 'var(--el-color-primary)',
    title: '调查',
    subTitle: '问卷调查',
  },
  {
    iconComponent: 'Tickets',
    iconColor: 'var(--el-color-danger)',
    title: '考试',
    subTitle: '可抽题·防作弊·自动阅卷',
  },
  {
    iconComponent: 'TakeawayBox',
    iconColor: 'var(--el-color-warning)',
    title: '投票',
    subTitle: '图文视频·排行榜·投票墙 🗳',
  },
]
</script>
