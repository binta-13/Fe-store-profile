'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import api from '@/lib/api';
import { Save, Loader2 } from 'lucide-react';

interface StoreProfile {
  id?: string;
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  owner?: string;
  logo?: string;
}

export default function StoreProfilePage() {
  const [storeProfile, setStoreProfile] = useState<StoreProfile>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStoreProfile();
  }, []);

  const fetchStoreProfile = async () => {
    try {
      const response = await api.get('/store-profile');
      if (response.data.success) {
        setStoreProfile(response.data.data || {});
      }
    } catch (error: any) {
      console.error('Error fetching store profile:', error);
      if (error.response?.status === 404) {
        // Store profile belum ada, buat yang baru
        setStoreProfile({});
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      let response;
      if (storeProfile.id) {
        // Update existing
        response = await api.put('/store-profile', storeProfile);
      } else {
        // Create new
        response = await api.post('/store-profile', storeProfile);
      }

      if (response.data.success) {
        setStoreProfile(response.data.data);
        alert('Store profile berhasil disimpan!');
      }
    } catch (error: any) {
      console.error('Error saving store profile:', error);
      setError(error.response?.data?.message || 'Gagal menyimpan store profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
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

  return (
    <ProtectedRoute requireAdmin={false}>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Store Profile</h1>
            <p className="text-muted-foreground">
              Kelola informasi toko Anda
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Informasi Toko</CardTitle>
                <CardDescription>
                  Lengkapi informasi toko Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">Nama Toko *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={storeProfile.name || ''}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={storeProfile.description || ''}
                    onChange={handleChange}
                    rows={4}
                    disabled={saving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={storeProfile.address || ''}
                    onChange={handleChange}
                    rows={3}
                    disabled={saving}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">No. Telepon *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={storeProfile.phone || ''}
                      onChange={handleChange}
                      required
                      disabled={saving}
                      placeholder="081234567890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={storeProfile.email || ''}
                      onChange={handleChange}
                      disabled={saving}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner">Nama Pemilik</Label>
                  <Input
                    id="owner"
                    name="owner"
                    value={storeProfile.owner || ''}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    name="logo"
                    type="url"
                    value={storeProfile.logo || ''}
                    onChange={handleChange}
                    disabled={saving}
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Simpan
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

