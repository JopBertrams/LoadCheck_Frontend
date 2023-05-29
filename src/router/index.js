import { createRouter as createVueRouter, createWebHistory } from 'vue-router';
import store from '../store/index.js';

function authenticationGuard(to, from, next) {
  const isAuthenticated = store.getters.isAuthenticated;

  if (isAuthenticated) {
    next();
  } else {
    next('/login');
  }
}

export function createRouter(app) {
  return new createVueRouter({
    routes: [
      {
        path: '/login',
        name: 'login',
        beforeEnter: (to, from, next) => {
          const isAuthenticated = store.getters.isAuthenticated;
          if (isAuthenticated) {
            next('/');
          } else {
            next();
          }
        },
        component: () => import('../views/Login.vue'),
      },
      {
        path: '/',
        name: 'dashboard',
        beforeEnter: authenticationGuard,
        component: () => import('../views/Dashboard.vue'),
      },
      {
        path: '/classes',
        name: 'classes',
        beforeEnter: authenticationGuard,
        component: () => import('../views/Classes.vue'),
      },
      {
        path: '/students',
        name: 'students',
        beforeEnter: authenticationGuard,
        component: () => import('../views/Students.vue'),
      },
      {
        path: '/settings',
        name: 'settings',
        beforeEnter: authenticationGuard,
        component: () => import('../views/Settings.vue'),
      },
    ],
    history: createWebHistory(),
  });
}
