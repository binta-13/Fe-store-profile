'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { X, Image as ImageIcon } from 'lucide-react';

interface PromoFormData {
  name: string;
  description: string;
  discount: string;
  discountType: 'percentage' | 'fixed';
  minPurchase: string;
  maxDiscount: string;
  code: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  image: string;
}

interface PromoFormProps {
  initialData?: Partial<PromoFormData>;
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
}

export default function PromoForm({ initialData, onSubmit, loading }: PromoFormProps) {
  const [formData, setFormData] = useState<PromoFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    discount: initialData?.discount || '',
    discountType: initialData?.discountType || 'percentage',
    minPurchase: initialData?.minPurchase || '',
    maxDiscount: initialData?.maxDiscount || '',
    code: initialData?.code || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    image: initialData?.image || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      discount: parseFloat(formData.discount),
      minPurchase: formData.minPurchase ? parseFloat(formData.minPurchase) : undefined,
      maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : undefined,
    };

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Promo</CardTitle>
          <CardDescription>Masukkan informasi promo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Promo *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Kode Promo</Label>
              <Input
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="DISKON50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountType">Tipe Diskon *</Label>
              <select
                id="discountType"
                name="discountType"
                value={formData.discountType}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="percentage">Persentase (%)</option>
                <option value="fixed">Fixed (Rp)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount">Diskon *</Label>
              <Input
                id="discount"
                name="discount"
                type="number"
                step="0.01"
                min="0"
                value={formData.discount}
                onChange={handleInputChange}
                required
                disabled={loading}
                placeholder={formData.discountType === 'percentage' ? '10' : '50000'}
              />
            </div>

            {formData.discountType === 'percentage' && (
              <div className="space-y-2">
                <Label htmlFor="maxDiscount">Maksimal Diskon (Rp)</Label>
                <Input
                  id="maxDiscount"
                  name="maxDiscount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.maxDiscount}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="minPurchase">Minimal Pembelian (Rp)</Label>
            <Input
              id="minPurchase"
              name="minPurchase"
              type="number"
              step="0.01"
              min="0"
              value={formData.minPurchase}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Tanggal Mulai</Label>
              <Input
                id="startDate"
                name="startDate"
                type="datetime-local"
                value={formData.startDate}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Tanggal Berakhir</Label>
              <Input
                id="endDate"
                name="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Gambar URL</Label>
            <Input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="https://example.com/promo.jpg"
            />
            {formData.image && (
              <div className="relative w-32 h-32 rounded-md overflow-hidden border mt-2">
                <Image
                  src={formData.image}
                  alt="Promo preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleCheckboxChange}
              disabled={loading}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Promo Aktif
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={loading}
        >
          Batal
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </div>
    </form>
  );
}

