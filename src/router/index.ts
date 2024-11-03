import { useUserStore } from '@/stores/user';
import { getToken } from '@/utils/token';
import { ElMessage } from 'element-plus';
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView/LoginView.vue'),
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('@/views/MineView/MineView.vue'),
    },
  ],
})

const authorizationPaths = ['/mine']
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (getToken()) {
    if (!userStore.isAuthenticated) {
      userStore.GetUserData()
    }
  }

  if (!userStore.isAuthenticated && authorizationPaths.includes(to.path)) {
    ElMessage({
      type: 'error',
      message: '请先登录！',
      plain: true
    })
    next({ path: '/login' });
  }

  if (userStore.isAuthenticated && to.path === '/login') {
    ElMessage({
      type: 'error',
      message: '请先退出登录！',
      plain: true
    })
    next({ path: from.path });
  }
  next(); // 参数符合标准
});

export default router
