import { createRouter as createVueRouter, createWebHistory } from 'vue-router';
import store from '../store/index.js';

function authGuardLecturerPages(to, from, next) {
  const isAuthenticated = store.getters.isAuthenticated;
  const role = store.getters.getRole;

  if (role === 'Student' && isAuthenticated) {
    next('/student/' + store.getters.getUser.id);
  }

  if (role !== 'Student' && role !== 'Lecturer' && isAuthenticated) {
    next('/403');
  }

  if (role === 'Lecturer' && isAuthenticated) {
    next();
  } else {
    next('/login');
  }
}

function authGuardStudentPage(to, from, next) {
  const isAuthenticated = store.getters.isAuthenticated;
  const role = store.getters.getRole;

  if (role !== 'Student' && role !== 'Lecturer' && isAuthenticated) {
    next('/403');
  }

  if ((role === 'Student' || role === 'Lecturer') && isAuthenticated) {
    next();
  } else {
    next('/login');
  }
}

function authGuard403Page(to, from, next) {
  const isAuthenticated = store.getters.isAuthenticated;
  const role = store.getters.getRole;

  if (role === 'Student' && isAuthenticated) {
    next('/student/' + store.getters.getUser.id);
  }

  if (role === 'Lecturer' && isAuthenticated) {
    next('/');
  }

  if (isAuthenticated) {
    next();
  } else {
    next('/login');
  }
}

function authGuardLoginPage(to, from, next) {
  const isAuthenticated = store.getters.isAuthenticated;
  const role = store.getters.getRole;

  if (role === 'Student' && isAuthenticated) {
    next('/student/' + store.getters.getUser.id);
  }

  if (role === 'Lecturer' && isAuthenticated) {
    next('/');
  }

  if (isAuthenticated) {
    next('/403');
  } else {
    next();
  }
}

export function createRouter(app) {
  return new createVueRouter({
    routes: [
      {
        path: '/login',
        name: 'login',
        beforeEnter: authGuardLoginPage,
        component: () => import('../views/Login.vue'),
      },
      {
        path: '/',
        name: 'dashboard',
        beforeEnter: authGuardLecturerPages,
        component: () => import('../views/Dashboard.vue'),
      },
      // {
      //   path: '/classes',
      //   name: 'classes',
      //   beforeEnter: authGuardLecturerPages,
      //   component: () => import('../views/Classes.vue'),
      // },
      // {
      //   path: '/students',
      //   name: 'students',
      //   beforeEnter: authGuardLecturerPages,
      //   component: () => import('../views/Students.vue'),
      // },
      {
        path: '/settings',
        name: 'settings',
        beforeEnter: authGuardLecturerPages,
        component: () => import('../views/Settings.vue'),
      },
      {
        path: '/student/:id',
        name: 'student',
        beforeEnter: authGuardStudentPage,
        component: () => import('../views/Student.vue'),
      },
      {
        path: '/403',
        name: '403',
        beforeEnter: authGuard403Page,
        component: () => import('../views/403.vue'),
      },
      {
        path: '/:notFound',
        name: 'notFound',
        component: () => import('../views/404.vue'),
      },
    ],
    history: createWebHistory(),
  });
}
