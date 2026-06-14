import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '../../routes';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authGuard);
router.beforeEach(guestGuard);
router.afterEach((to) => {
  const siteTitle = import.meta.env.VITE_SITE_TITLE;

  document.title = `${to.meta.title} | ${siteTitle}`;
});

export { router };
