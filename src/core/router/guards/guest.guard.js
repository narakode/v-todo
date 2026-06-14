import { useAuth } from '../../auth/auth.compose';

export const guestGuard = async (to) => {
  const { checkLoggedIn } = useAuth();

  if (to.matched.some((route) => route.meta.guest)) {
    const loggedIn = await checkLoggedIn();

    if (loggedIn) {
      return {
        name: 'home',
      };
    }
  }
};
