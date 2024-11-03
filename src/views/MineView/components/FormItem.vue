<template>
  <el-card shadow="hover">
    <el-row>
      <el-col :span="20">
        <el-col>
          <el-text class="mx-1" size="large">{{ title }}</el-text>
          <el-text class="mx-1" size="small">（{{ subTitle }}）</el-text>
          <el-tag type="primary" size="small">Tag 1</el-tag>
        </el-col>
        <el-col>
          <el-tag :type="publish ? 'success' : 'info'">{{ publish ? '已发布' : '未发布' }}</el-tag>
        </el-col>
      </el-col>
      <el-col :span="4">
        <el-statistic title="答卷数量" :value="count" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
defineProps<{
  title?: string | null;
  subTitle?: string | null;
  publish: boolean;
  count: number;
}>()
</script>
