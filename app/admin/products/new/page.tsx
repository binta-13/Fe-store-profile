'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import ProductForm from '@/components/ProductForm';
import api from '@/lib/api';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        router.push('/admin/products');
      } else {
        throw new Error(response.data.message || 'Gagal membuat product');
      }
    } catch (error: any) {
      console.error('Error creating product:', error);
      const errorMessage = error.response?.data?.message || 'Gagal membuat product';
      alert(errorMessage);
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
            <h1 className="text-3xl font-bold">Tambah Product Baru</h1>
            <p className="text-muted-foreground">
              Buat product baru untuk toko Anda
            </p>
          </div>

          <ProductForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

