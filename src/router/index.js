import { createRouter as createVueRouter, createWebHistory } from 'vue-router';

export function createRouter(app) {
  return new createVueRouter({
    routes: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
      },
      {
        path: '/',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue'),
      },
      {
        path: '/classes',
        name: 'classes',
        component: () => import('../views/Classes.vue'),
      },
      {
        path: '/students',
        name: 'students',
        component: () => import('../views/Students.vue'),
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('../views/Settings.vue'),
      },
    ],
    history: createWebHistory(),
  });
}
