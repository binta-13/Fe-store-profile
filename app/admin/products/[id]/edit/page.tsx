'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import ProductForm from '@/components/ProductForm';
import api from '@/lib/api';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  category?: string;
  images?: string[];
  sku?: string;
  weight?: string;
  dimensions?: string;
  isActive?: boolean;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${productId}`);
      if (response.data.success) {
        setProduct(response.data.data);
      } else {
        throw new Error('Product tidak ditemukan');
      }
    } catch (error: any) {
      console.error('Error fetching product:', error);
      alert('Gagal memuat product');
      router.push('/admin/products');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await api.put(`/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        router.push('/admin/products');
      } else {
        throw new Error(response.data.message || 'Gagal mengupdate product');
      }
    } catch (error: any) {
      console.error('Error updating product:', error);
      const errorMessage = error.response?.data?.message || 'Gagal mengupdate product';
      alert(errorMessage);
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

  if (!product) {
    return null;
  }

  return (
    <ProtectedRoute requireAdmin={false}>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Edit Product</h1>
            <p className="text-muted-foreground">
              Edit informasi product
            </p>
          </div>

          <ProductForm
            initialData={{
              name: product.name,
              description: product.description || '',
              price: product.price.toString(),
              stock: product.stock?.toString() || '',
              category: product.category || '',
              sku: product.sku || '',
              weight: product.weight || '',
              dimensions: product.dimensions || '',
              isActive: product.isActive !== false,
              images: product.images || [],
            }}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

