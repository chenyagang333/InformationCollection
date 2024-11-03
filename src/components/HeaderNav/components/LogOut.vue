<template>
  <el-popconfirm width="220" icon="InfoFilled" icon-color="#626AEF" title="确认退出登录？" @confirm="userStore.LogOut()">
    <template #reference>
      <a>
        <slot></slot>
      </a>
    </template>
    <template #actions="{ confirm, cancel }">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="danger" size="small" @click="confirm">
        确认
      </el-button>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
</script>
