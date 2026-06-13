import { useRouter } from 'vue-router';
import { supabase } from '../supabase';
import { createError, createSucces } from '../../utils/response';
import { ref } from 'vue';

const user = ref(null);

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
          ? 'Kombinasi email dan password tidak ditemukan'
          : 'Login gagal, coba lagi',
      );
    }

    user.value = data;

    return createSucces(data);
  }

  async function register(credentials) {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          name: credentials.name,
        },
      },
    });

    if (error) {
      return createError(
        error.code === 'user_already_exists'
          ? 'Email sudah digunakan, masuk atau gunakan email lain.'
          : 'Registrasi gagal, coba lagi',
      );
    }

    user.value = data;

    return createSucces(data);
  }

  async function setUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data) {
      return false;
    }

    user.value = data;

    return true;
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  return { checkLoggedIn, login, register, setUser, logout, user };
}
