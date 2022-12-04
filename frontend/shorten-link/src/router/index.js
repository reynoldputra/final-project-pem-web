import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import checkAuth from '../middleware/auth';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/dashboard",
      name:"dashboard",
      component: DashboardView,
      async beforeEnter(to, from, next){
         const isVerified = await checkAuth()
         if(!isVerified) return router.push('/login')
         else return next()
      }
    }
  ],
});

export default router
