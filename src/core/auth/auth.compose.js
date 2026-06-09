import { useRouter } from 'vue-router';
import { supabase } from '../supabase';

export function useAuth() {
  const router = useRouter();

  async function checkLoggedIn() {
    const { data, error } = await supabase.auth.getSession();

    return !error && !!data.session;
  }

  return { checkLoggedIn };
}
