export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./features/home/pages/HomePage.vue'),
    meta: {
      auth: true,
      title: 'Home',
    },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('./common/pages/Privacy.vue'),
    meta: {
      title: 'Privacy Policy',
      layout: 'LayoutPage',
    },
  },
  {
    path: '/terms-of-service',
    name: 'terms-of-service',
    component: () => import('./common/pages/TermsOfService.vue'),
    meta: {
      title: 'Terms Of Service',
      layout: 'LayoutPage',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./features/auth/pages/LoginPage.vue'),
    meta: {
      guest: true,
      layout: 'LayoutAuth',
      title: 'Login',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./features/auth/pages/RegisterPage.vue'),
    meta: {
      guest: true,
      layout: 'LayoutAuth',
      title: 'Register',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('./common/pages/404.vue'),
    meta: {
      title: '404 Not Found',
      layout: 'LayoutPage',
    },
  },
];
