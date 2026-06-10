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

  async function register(credentials) {
    const { data, error } = await supabase.auth.signUp(credentials);

    if (error) {
      return createError(
        error.code === 'user_already_exists'
          ? 'Email sudah digunakan, masuk atau gunakan email lain.'
          : 'Registrasi gagal, coba lagi',
      );
    }

    return createSucces(data);
  }
  return { checkLoggedIn, login, register };
}
