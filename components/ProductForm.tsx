'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { X, Image as ImageIcon } from 'lucide-react';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  sku: string;
  weight: string;
  dimensions: string;
  isActive: boolean;
  images: string[];
}

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: FormData) => Promise<void>;
  loading?: boolean;
}

export default function ProductForm({ initialData, onSubmit, loading }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    stock: initialData?.stock || '',
    category: initialData?.category || '',
    sku: initialData?.sku || '',
    weight: initialData?.weight || '',
    dimensions: initialData?.dimensions || '',
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    images: initialData?.images || [],
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(formData.images || []);

  useEffect(() => {
    if (initialData?.images) {
      setImageUrls(initialData.images);
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newFiles = [...imageFiles, ...files];
      setImageFiles(newFiles);

      // Create previews
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImageFile = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const removeImageUrl = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Add text fields
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    if (formData.stock) formDataToSend.append('stock', formData.stock);
    if (formData.category) formDataToSend.append('category', formData.category);
    if (formData.sku) formDataToSend.append('sku', formData.sku);
    if (formData.weight) formDataToSend.append('weight', formData.weight);
    if (formData.dimensions) formDataToSend.append('dimensions', formData.dimensions);
    formDataToSend.append('isActive', formData.isActive.toString());

    // Add image files
    imageFiles.forEach((file) => {
      formDataToSend.append('images', file);
    });

    // Add image URLs
    if (imageUrls.length > 0) {
      imageUrls.forEach((url) => {
        formDataToSend.append('images', url);
      });
    }

    await onSubmit(formDataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Produk</CardTitle>
          <CardDescription>Masukkan informasi dasar produk</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Produk *</Label>
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
              <Label htmlFor="price">Harga *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stok</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Berat (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.01"
                min="0"
                value={formData.weight}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensi (L x W x H)</Label>
              <Input
                id="dimensions"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleInputChange}
                placeholder="10 x 5 x 3"
                disabled={loading}
              />
            </div>
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
              Produk Aktif
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gambar Produk</CardTitle>
          <CardDescription>Upload gambar produk atau masukkan URL gambar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="imageFiles">Upload Gambar</Label>
            <Input
              id="imageFiles"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageFileChange}
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground">
              Anda dapat memilih multiple gambar (maksimal 10)
            </p>
          </div>

          {/* Image Previews from Files */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="relative w-full h-32 rounded-md overflow-hidden border">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImageFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Existing Image URLs */}
          {imageUrls.length > 0 && (
            <div className="space-y-2">
              <Label>Gambar dari URL</Label>
              <div className="grid grid-cols-4 gap-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="relative w-full h-32 rounded-md overflow-hidden border">
                      <Image
                        src={url}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImageUrl(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add URL Input */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Atau Tambahkan URL Gambar</Label>
            <div className="flex gap-2">
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    if (input.value && !imageUrls.includes(input.value)) {
                      setImageUrls([...imageUrls, input.value]);
                      input.value = '';
                    }
                  }
                }}
                disabled={loading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  const input = document.getElementById('imageUrl') as HTMLInputElement;
                  if (input.value && !imageUrls.includes(input.value)) {
                    setImageUrls([...imageUrls, input.value]);
                    input.value = '';
                  }
                }}
                disabled={loading}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Tambah
              </Button>
            </div>
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

