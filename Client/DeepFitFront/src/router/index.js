import { createRouter, createWebHistory } from 'vue-router'

const FallBackError = () => import('@/views/Error/FallBackError.vue')
const Home = () => import('@/views/Home/Home.vue')
const About = () => import('@/views/AboutView.vue')
const InsightCard = () => import('@/components/InsightCard.vue')
const Testes = () => import('@/views/Testes.vue')
const InsightsPage = () => import('@/views/InsightsPage.vue')
const Sono = () => import('@/views/Sono.vue')
const AlunoPage = () => import('@/views/AlunoPage.vue')
const AlunosLista = () => import('../views/AlunosLista.vue')
const IntensidadeFC = () => import('@/views/IntensidadeFC.vue')
const ExerciciosList = () => import('@/views/Exercicios/ExerciciosList.vue')
const AddExercicio = () => import('@/views/AddExercicio.vue')

const TreinoList = () => import('@/views/TreinosHistorico/TreinosHistorico.vue')
const AddTreino = () => import('@/views/AddTreino.vue')
const LoginPage = () => import('@/views/Login/LoginPage.vue')
const Cadastro = () => import('@/views/Cadastro/CadastroPage.vue')
const NovoAluno = () => import('@/views/NovoAluno.vue')

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
      component: InsightsPage
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
      component: AlunoPage
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/alunos',
      name: 'alunos',
      component: AlunosLista
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
      component: LoginPage
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
      path: '/treinos',
      name: 'treinos',
      component: TreinoList
    },
    {
      path: '/addtreino',
      name: 'addtreino',
      component: AddTreino
    },

    // DEIXAR ESSES DOIS PATHS POR ULTIMO NA LISTA
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
