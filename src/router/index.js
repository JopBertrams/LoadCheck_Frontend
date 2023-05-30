import { createRouter as createVueRouter, createWebHistory } from 'vue-router';
import store from '../store/index.js';

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
        beforeEnter: (to, from, next) => {
          const isAuthenticated = store.getters.isAuthenticated;
          const role = store.getters.getRole;

          if (role === 'Student' && isAuthenticated) {
            next('/student/' + store.getters.getAccount.id);
          }

          if (role !== 'Student' && role !== 'Lecturer' && isAuthenticated) {
            next('/403');
          }

          if (isAuthenticated) {
            next();
          } else {
            next('/login');
          }
        },
        component: () => import('../views/Dashboard.vue'),
      },
      {
        path: '/classes',
        name: 'classes',
        beforeEnter: (to, from, next) => {
          const isAuthenticated = store.getters.isAuthenticated;
          const role = store.getters.getRole;

          if (role === 'Student' && isAuthenticated) {
            next('/student/' + store.getters.getAccount.id);
          }

          if (role !== 'Student' && role !== 'Lecturer' && isAuthenticated) {
            next('/403');
          }

          if (isAuthenticated) {
            next();
          } else {
            next('/login');
          }
        },
        component: () => import('../views/Classes.vue'),
      },
      {
        path: '/students',
        name: 'students',
        beforeEnter: (to, from, next) => {
          const isAuthenticated = store.getters.isAuthenticated;
          const role = store.getters.getRole;

          if (role === 'Student' && isAuthenticated) {
            next('/student/' + store.getters.getAccount.id);
          }

          if (role !== 'Student' && role !== 'Lecturer' && isAuthenticated) {
            next('/403');
          }

          if (isAuthenticated) {
            next();
          } else {
            next('/login');
          }
        },
        component: () => import('../views/Students.vue'),
      },
      {
        path: '/settings',
        name: 'settings',
        beforeEnter: (to, from, next) => {
          const isAuthenticated = store.getters.isAuthenticated;
          const role = store.getters.getRole;

          if (role === 'Student' && isAuthenticated) {
            next('/student/' + store.getters.getAccount.id);
          }

          if (role !== 'Student' && role !== 'Lecturer' && isAuthenticated) {
            next('/403');
          }

          if (isAuthenticated) {
            next();
          } else {
            next('/login');
          }
        },
        component: () => import('../views/Settings.vue'),
      },
      {
        path: '/student/:id',
        name: 'student',
        beforeEnter: (to, from, next) => {
          const isAuthenticated = store.getters.isAuthenticated;
          const role = store.getters.getRole;

          if (role !== 'Student' && role !== 'Lecturer' && isAuthenticated) {
            next('/403');
          }

          if (isAuthenticated) {
            next();
          } else {
            next('/login');
          }
        },
        component: () => import('../views/Student.vue'),
      },
      {
        path: '/403',
        name: '403',
        beforeEnter: (to, from, next) => {
          const isAuthenticated = store.getters.isAuthenticated;
          const role = store.getters.getRole;

          if (role === 'Student' && isAuthenticated) {
            next('/student/' + store.getters.getAccount.id);
          }

          if (role === 'Lecturer' && isAuthenticated) {
            next('/');
          }

          if (isAuthenticated) {
            next();
          } else {
            next('/login');
          }
        },
        component: () => import('../views/403.vue'),
      },
    ],
    history: createWebHistory(),
  });
}
