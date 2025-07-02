import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useUser = () => {
  const [user, setUser] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get current session on mount
    const getInitialUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
    };

    getInitialUser();

    // 2. Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [user]);

  return { user, loading };
};