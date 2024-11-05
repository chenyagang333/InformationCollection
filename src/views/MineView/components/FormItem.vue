<template>
  <el-card shadow="hover" style="--el-card-padding: 12px;cursor: pointer;">
    <el-row>
      <el-col :span="20">
        <el-col style="margin-bottom: 5px;">
          <el-text class="mx-1" size="large">{{ item.title }}</el-text>
          <el-text class="mx-1" size="small">（{{ item.subTitle }}）</el-text>
          <el-tag :color="item.type?.color" effect="dark" :hit="false" round size="small"
            style="--el-tag-border-color:rgba(0,0,0,0)">{{ item.type?.label
            }}</el-tag>
        </el-col>
        <el-space alignment="flex-end">
          <el-tag :type="item.publish ? 'success' : 'info'">{{ item.publish ? '已发布' : '未发布' }}</el-tag>
          <el-tag type="primary" effect="plain" size="small">{{ item.createTime }}</el-tag>
        </el-space>
      </el-col>
      <el-col :span="4">
        <el-statistic title="答卷数量" :value="item.count" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import type { Form } from '@/types/Form';

defineProps<{
  item: Form
}>()
</script>
