import Vue from 'vue';
import VueRouter from 'vue-router';
// import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/MetasView.vue')
  },
  {
    path: '/metas',
    name: 'metas',
    component: () => import(/* webpackChunkName: "metas" */ '../views/MetasView.vue')
  },
  // {
  //   path: '/evolucao',
  //   name: 'evolucao',
  //   component: () => import(/* webpackChunkName: "metas" */ '../views/EvolucaoView.vue')
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
