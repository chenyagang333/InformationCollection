import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  // 监听窗口大小变化，折叠侧边栏
  const historyMarks = ref<string[]>([]);

  return { historyMarks }
})

