import { useAuth } from '../../auth/auth.compose';

export const authGuard = async (to) => {
  const { checkLoggedIn } = useAuth();

  if (to.matched.some((route) => route.meta.auth)) {
    const loggedIn = await checkLoggedIn();

    if (!loggedIn) {
      return {
        name: 'login',
      };
    }
  }
};
