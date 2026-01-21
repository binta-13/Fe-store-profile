'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import api from '@/lib/api';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';

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

export default function PromosPage() {
  const router = useRouter();
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [promoToDelete, setPromoToDelete] = useState<Promo | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      const response = await api.get('/promos');
      if (response.data.success) {
        setPromos(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching promos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (promo: Promo) => {
    setPromoToDelete(promo);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!promoToDelete) return;

    setDeleting(true);
    try {
      await api.delete(`/promos/${promoToDelete.id}`);
      setPromos(promos.filter((p) => p.id !== promoToDelete.id));
      setDeleteDialogOpen(false);
      setPromoToDelete(null);
    } catch (error: any) {
      console.error('Error deleting promo:', error);
      alert(error.response?.data?.message || 'Gagal menghapus promo');
    } finally {
      setDeleting(false);
    }
  };

  const formatDiscount = (promo: Promo) => {
    if (promo.discountType === 'percentage') {
      return `${promo.discount}%`;
    }
    return `Rp ${promo.discount.toLocaleString('id-ID')}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <ProtectedRoute requireAdmin={false}>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Promos</h1>
              <p className="text-muted-foreground">
                Kelola promo dan diskon
              </p>
            </div>
            <Button asChild>
              <Link href="/admin/promos/new">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Promo
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : promos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Belum ada promo</p>
              <Button asChild className="mt-4">
                <Link href="/admin/promos/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Promo Pertama
                </Link>
              </Button>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Periode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promos.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell>
                        {promo.image ? (
                          <div className="relative w-16 h-16 rounded-md overflow-hidden">
                            <Image
                              src={promo.image}
                              alt={promo.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-md bg-muted"></div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{promo.name}</TableCell>
                      <TableCell>
                        <code className="px-2 py-1 bg-muted rounded text-sm">
                          {promo.code || '-'}
                        </code>
                      </TableCell>
                      <TableCell>{formatDiscount(promo)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{formatDate(promo.startDate)}</div>
                          <div className="text-muted-foreground">
                            s/d {formatDate(promo.endDate)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            promo.isActive !== false
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {promo.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/promos/${promo.id}/edit`)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteClick(promo)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus Promo?</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah Anda yakin ingin menghapus promo &quot;{promoToDelete?.name}&quot;?
                  Tindakan ini tidak dapat dibatalkan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleting}>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {deleting ? 'Menghapus...' : 'Hapus'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

