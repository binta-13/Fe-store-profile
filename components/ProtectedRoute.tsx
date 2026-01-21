'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useRouteGuard } from '@/hooks/useRouteGuard';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireSubAdmin?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  requireAdmin = false,
  requireSubAdmin = false 
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, isAuthenticated, isAdmin, isSubAdmin } = useAuth();

  // Gunakan route guard untuk proteksi dasar
  useRouteGuard();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      // Jika requireAdmin tapi bukan admin
      if (requireAdmin && !isAdmin) {
        router.replace('/admin/dashboard');
        return;
      }

      // Jika requireSubAdmin tapi bukan sub_admin atau admin
      if (requireSubAdmin && !isSubAdmin && !isAdmin) {
        router.replace('/admin/dashboard');
        return;
      }
    }
  }, [loading, isAuthenticated, isAdmin, isSubAdmin, requireAdmin, requireSubAdmin, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Block user biasa dari akses admin routes
  if (pathname?.startsWith('/admin') && !isAdmin && !isSubAdmin) {
    return null;
  }

  // Block access to /user route
  if (pathname?.startsWith('/user')) {
    return null;
  }

  if (requireAdmin && !isAdmin) {
    return null;
  }

  if (requireSubAdmin && !isSubAdmin && !isAdmin) {
    return null;
  }

  return <>{children}</>;
}

