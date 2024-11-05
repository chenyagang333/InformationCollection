<template>
  <el-page-header title="返回">
    <template #title>
      <el-text size="large">返回</el-text>
    </template>
    <template #content>
      <el-text class="mx-1" type="primary" size="large" :style="{ color: color }">
        <slot></slot>
      </el-text>
    </template>
  </el-page-header>
</template>

<script lang="ts" setup>
defineProps<{
  color?: string
}>()
</script>
