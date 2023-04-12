import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useSigninStore } from '../stores/signinStore'
import { getUserId } from '../utils/localStorage'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/settings',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/SettingsView.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  const signinPinia = useSigninStore();
  if(!signinPinia.isAuthenticated && to.meta.requiresAuth) {
    signinPinia.modalToggle = true;
    next('/');
  }
  if(!signinPinia.user.id && signinPinia.isAuthenticated) {
    signinPinia.getUser({ userId: getUserId() });
  }
  next();
})
export default router
