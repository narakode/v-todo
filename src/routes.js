export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./features/home/pages/HomePage.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./features/auth/pages/LoginPage.vue'),
    meta: {
      guest: true,
      layout: 'LayoutAuth',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./features/auth/pages/RegisterPage.vue'),
    meta: {
      guest: true,
      layout: 'LayoutAuth',
    },
  },
];
