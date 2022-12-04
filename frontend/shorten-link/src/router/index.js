import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import DetailView from '../views/DetailView.vue'
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
      // beforeEnter(to, from){
      //   if(!checkAuth()) router.push('login')
      //   else next()
      // }
    },
    {
      path: "/dashboard/url",
      name:"url",
      component: DetailView,
      // beforeEnter(to, from){
      //   if(!checkAuth()) router.push('login')
      //   else next()
      // }
    }
  ],
});

export default router
