'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import PromoForm from '@/components/PromoForm';
import api from '@/lib/api';

export default function NewPromoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post('/promos', data);

      if (response.data.success) {
        router.push('/admin/promos');
      } else {
        throw new Error(response.data.message || 'Gagal membuat promo');
      }
    } catch (error: any) {
      console.error('Error creating promo:', error);
      alert(error.response?.data?.message || 'Gagal membuat promo');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute requireAdmin={false}>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Tambah Promo Baru</h1>
            <p className="text-muted-foreground">
              Buat promo baru untuk toko Anda
            </p>
          </div>

          <PromoForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

