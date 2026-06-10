import { useRouter } from 'vue-router';
import { supabase } from '../supabase';
import { createError, createSucces } from '../../utils/response';

export function useAuth() {
  const router = useRouter();

  async function checkLoggedIn() {
    const { data, error } = await supabase.auth.getSession();

    return !error && !!data.session;
  }

  async function login(credentials) {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      return createError(
        error.code === 'invalid_credentials'
          ? 'Kombinasi email tidak ditemukan'
          : 'Login gagal, coba lagi',
      );
    }

    return createSucces(data);
  }

  return { checkLoggedIn, login };
}
