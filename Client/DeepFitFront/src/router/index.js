import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home/Home.vue')
const About = () => import('../views/AboutView.vue')
const InsightCard = () => import('../components/InsightCard.vue')
const Testes = () => import('../views/Testes.vue')
const Insights = () => import('../views/Insights.vue')
const Sono = () => import('../views/Sono.vue')
const Aluno = () => import('../views/Aluno.vue')
const IntensidadeFC = () => import('../views/IntensidadeFC.vue')
const Login = () => import('../views/Login.vue')
const Cadastro = () => import('../views/Cadastro.vue')
const NovoAluno = () => import('../views/NovoAluno.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'testes',
      component: Testes
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/insightcard',
      name: 'insightcard',
      component: InsightCard
    },
    {
      path: '/insights',
      name: 'insights',
      component: Insights
    },
    {
      path: '/sono',
      name: 'sono',
      component: Sono
    },
    {
      path: '/intensidadefc',
      name: 'intensidadefc',
      component: IntensidadeFC
    },
    {
      path: '/aluno',
      name: 'aluno',
      component: Aluno
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: Cadastro
    },
    {
      path: '/novoaluno',
      name: 'novoaluno',
      component: NovoAluno
    },
  ]
})

export default router
