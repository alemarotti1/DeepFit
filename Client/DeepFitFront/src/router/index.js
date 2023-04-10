import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home/Home.vue')
const About = () => import('../views/AboutView.vue')
const Insight = () => import('../components/Insight.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/insight',
      name: 'insight',
      component: Insight
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

export default router
