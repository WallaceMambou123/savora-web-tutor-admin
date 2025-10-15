import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState<null | { id: string; role: string }>(null);

  useEffect(() => {
    // placeholder auth check
    const stored = null;
    if (stored) setUser(stored);
  }, []);

  return {
    user,
    signIn: async () => setUser({ id: 'u1', role: 'tuteur' }),
    signOut: () => setUser(null),
  };
}
