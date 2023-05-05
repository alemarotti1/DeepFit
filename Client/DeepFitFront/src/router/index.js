import { createRouter, createWebHistory } from 'vue-router'

const FallBackError = () => import('../views/Error/FallBackError.vue')
const Home = () => import('../views/Home/Home.vue')
const About = () => import('../views/AboutView.vue')
const InsightCard = () => import('../components/InsightCard.vue')
const Testes = () => import('../views/Testes.vue')
const Insights = () => import('../views/Insights.vue')
const Sono = () => import('../views/Sono.vue')
const Aluno = () => import('../views/Aluno.vue')
const IntensidadeFC = () => import('../views/IntensidadeFC.vue')
const ExerciciosList = () => import('../views/ExerciciosList.vue')

const AddExercicio = () => import('../views/AddExercicio.vue')
const Login = () => import('../views/Login.vue')
const Cadastro = () => import('../views/Cadastro.vue')
const NovoAluno = () => import('../views/NovoAluno.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/testes',
      name: 'testes',
      component: Testes
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
      path: '/exclist',
      name: 'exclist',
      component: ExerciciosList
    },
    {
      path: '/addexec',
      name: 'addexec',
      component: AddExercicio
    },
    {
      alias: ['/'],
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
    {
      path: '/error',
      name: 'error',
      component: FallBackError
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: FallBackError
    }
  ]
})

export default router
