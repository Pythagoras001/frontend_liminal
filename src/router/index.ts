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
    {
      path: '/reports',
      name: 'reports',
      component: () =>
        import('@/features/report/screens/exploreReportScreen/ExploreReportScreen.vue'),
    },
    {
      // `props: true` pasa el `:id` de la URL como prop de la pantalla.
      path: '/reports/:id',
      name: 'report-detail',
      props: true,
      component: () =>
        import('@/features/report/screens/reportDetailScreen/ReportDetailScreen.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/features/profile/screens/profileScreen/ProfileScreen.vue'),
    },
    {
      path: '/class',
      name: 'class',
      component: () =>
        import('@/features/levelClass/screens/levelClassScreen/LevelClassScreen.vue'),
    },
  ],
})

export default router
