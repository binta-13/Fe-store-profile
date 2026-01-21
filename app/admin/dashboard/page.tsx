'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function AdminDashboardPage() {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch products count
      const productsRes = await api.get('/products');
      const productsCount = productsRes.data.data?.length || 0;

      // Fetch users count (only if admin)
      let usersCount = 0;
      if (isAdmin) {
        try {
          const usersRes = await api.get('/users');
          usersCount = usersRes.data.data?.length || 0;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }

      setStats({
        products: productsCount,
        users: usersCount,
        orders: 0, // Add orders endpoint later
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute requireAdmin={false}>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Selamat datang, {user?.displayName || user?.email}
            </p>
            {user?.role && (
              <p className="text-sm text-muted-foreground mt-1">
                Role: <span className="font-medium">{user.role}</span>
              </p>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.products}</div>
                  <p className="text-xs text-muted-foreground">
                    Produk yang tersedia
                  </p>
                </CardContent>
              </Card>

              {isAdmin && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.users}</div>
                    <p className="text-xs text-muted-foreground">
                      Pengguna terdaftar
                    </p>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.orders}</div>
                  <p className="text-xs text-muted-foreground">
                    Pesanan masuk
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Akses cepat ke fitur utama
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <a
                href="/admin/store-profile"
                className="p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">Store Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Kelola informasi toko
                </p>
              </a>
              <a
                href="/admin/products"
                className="p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">Kelola Products</h3>
                <p className="text-sm text-muted-foreground">
                  Tambah, edit, atau hapus produk
                </p>
              </a>
              <a
                href="/admin/promos"
                className="p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">Kelola Promos</h3>
                <p className="text-sm text-muted-foreground">
                  Kelola promo dan diskon
                </p>
              </a>
              <a
                href="/admin/checkout"
                className="p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">Checkout</h3>
                <p className="text-sm text-muted-foreground">
                  Generate WhatsApp link
                </p>
              </a>
              {isAdmin && (
                <a
                  href="/admin/users"
                  className="p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <h3 className="font-semibold">Kelola Users</h3>
                  <p className="text-sm text-muted-foreground">
                    Lihat dan kelola pengguna
                  </p>
                </a>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

