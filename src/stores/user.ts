import { ref } from 'vue'
import { defineStore } from 'pinia'
import { postLogin } from '@/services/login'
import { ElMessage } from 'element-plus'
import { removeToken, setToken } from '@/utils/token'
import type { LoginParams } from '@/types/user'
import router from '@/router'

export const useUserStore = defineStore('user', () => {

  // const data = ref<>()

  const isAuthenticated = ref<boolean>(false);

  const Login = async (data: LoginParams) => {
    // const res = await postLogin(data)
    const res = { data: { token: 'token' } }
    // if (res.data.success) {
    if (true) {
      isAuthenticated.value = true
      setToken(res.data.token);
      ElMessage({
        message: '登录成功',
        type: 'success',
        plain: true,
      })
      router.push({ path: '/mine' })
    } else {
    }
  }

  const GetUserData = () => {
    if (true) {
      isAuthenticated.value = true
    } else {

    }
  }

  const LogOut = () => {
    isAuthenticated.value = false;
    removeToken()
    ElMessage({
      message: '已退出登录',
      type: 'info',
      plain: true,
    })
    router.push({ path: '/' })
  }

  return { Login, LogOut, GetUserData, isAuthenticated }
})


