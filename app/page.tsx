'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user, loading, isAdmin, isSubAdmin } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Semua user yang login (admin, sub_admin, atau user biasa) diarahkan ke dashboard admin
        // Jika user biasa mencoba akses, akan di-block oleh ProtectedRoute
        router.push('/admin/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

