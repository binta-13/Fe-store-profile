'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook untuk proteksi route berdasarkan role
 * Mencegah user mengubah route melalui URL
 */
export function useRouteGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, isAuthenticated, isAdmin, isSubAdmin } = useAuth();

  useEffect(() => {
    if (loading) return;

    // Block access to /user route - redirect semua ke dashboard
    if (pathname?.startsWith('/user')) {
      router.replace('/admin/dashboard');
      return;
    }

    // Jika tidak authenticated, redirect ke login (kecuali public routes)
    if (!isAuthenticated) {
      const publicRoutes = ['/login', '/register'];
      if (!publicRoutes.some(route => pathname?.startsWith(route))) {
        router.replace('/login');
      }
      return;
    }

    // Admin routes - hanya admin dan sub_admin yang bisa akses
    if (pathname?.startsWith('/admin')) {
      if (!isAdmin && !isSubAdmin) {
        // User biasa tidak bisa akses admin routes
        router.replace('/login');
        return;
      }
    }
  }, [loading, isAuthenticated, isAdmin, isSubAdmin, pathname, router]);
}

