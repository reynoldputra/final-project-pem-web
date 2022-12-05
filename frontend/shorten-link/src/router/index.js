import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import DetailView from '../views/DetailView.vue'
import RedirectView from '../views/RedirectView.vue'
import checkAuth from '../middleware/auth';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: '/login'
    },
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
      },
    },
    {
      path: "/dashboard/url/:alias",
      name:"url",
      component: DetailView,
    },
    {
      path: "/in/:alias",
      name: "redirect",
      component: RedirectView
    }
  ],
});

export default router
