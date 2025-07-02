import { supabase } from '@/lib/supabaseClient';

export const getCurrentUser = async () => {
  const { data: sessionData } = await supabase.auth.getSession();

  if (!sessionData.session) {
    console.warn('No active session');
    return null;
  }

  const { data: userData, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }

  return userData.user;
};