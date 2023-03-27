import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home/Home.vue')
const About = () => import('../views/AboutView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

export default router
