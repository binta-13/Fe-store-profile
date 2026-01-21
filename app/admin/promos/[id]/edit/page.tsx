'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import PromoForm from '@/components/PromoForm';
import api from '@/lib/api';

interface Promo {
  id: string;
  name: string;
  description?: string;
  discount: number;
  discountType?: 'percentage' | 'fixed';
  minPurchase?: number;
  maxDiscount?: number;
  code?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  image?: string;
}

export default function EditPromoPage() {
  const router = useRouter();
  const params = useParams();
  const promoId = params.id as string;
  const [loading, setLoading] = useState(false);
  const [promo, setPromo] = useState<Promo | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchPromo();
  }, [promoId]);

  const fetchPromo = async () => {
    try {
      const response = await api.get(`/promos/${promoId}`);
      if (response.data.success) {
        setPromo(response.data.data);
      } else {
        throw new Error('Promo tidak ditemukan');
      }
    } catch (error: any) {
      console.error('Error fetching promo:', error);
      alert('Gagal memuat promo');
      router.push('/admin/promos');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.put(`/promos/${promoId}`, data);

      if (response.data.success) {
        router.push('/admin/promos');
      } else {
        throw new Error(response.data.message || 'Gagal mengupdate promo');
      }
    } catch (error: any) {
      console.error('Error updating promo:', error);
      alert(error.response?.data?.message || 'Gagal mengupdate promo');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <ProtectedRoute requireAdmin={false}>
        <AdminLayout>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (!promo) {
    return null;
  }

  // Format dates for datetime-local input
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <ProtectedRoute requireAdmin={false}>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Edit Promo</h1>
            <p className="text-muted-foreground">
              Edit informasi promo
            </p>
          </div>

          <PromoForm
            initialData={{
              name: promo.name,
              description: promo.description || '',
              discount: promo.discount.toString(),
              discountType: promo.discountType || 'percentage',
              minPurchase: promo.minPurchase?.toString() || '',
              maxDiscount: promo.maxDiscount?.toString() || '',
              code: promo.code || '',
              startDate: formatDateForInput(promo.startDate),
              endDate: formatDateForInput(promo.endDate),
              isActive: promo.isActive !== false,
              image: promo.image || '',
            }}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

