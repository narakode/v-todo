export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./features/home/pages/HomePage.vue'),
    meta: {
      auth: true,
    },
  },
];
