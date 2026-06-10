import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '../../routes';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(authGuard);
router.beforeEach(guestGuard);

export { router };
