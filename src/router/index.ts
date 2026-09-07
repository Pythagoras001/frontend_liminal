import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/features/home/screens/homeScreen/homeScreen.vue'),
    },
    {
      path: '/login-register',
      name: 'login-register',
      component: () =>
        import('@/features/login/screens/loginResgisterScreen/LoginRegisterScreen.vue'),
    },
  ],
})

export default router
