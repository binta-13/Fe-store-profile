'use client';

import { useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/forgot-password', { email });
      if (response.data.success) {
        setSent(true);
        toast.success('Tautan reset password telah dikirim ke email Anda.');
      } else {
        throw new Error(response.data.message || 'Gagal mengirim email');
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || 'Terjadi kesalahan';
      setError(message);
      toast.error(message, { duration: 8000 });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Cek Email Anda
            </CardTitle>
            <CardDescription className="text-center">
              Tautan reset password telah dikirim ke <strong>{email}</strong>.
              Silakan cek kotak masuk (atau spam) email Anda.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col space-y-4">
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Kembali ke Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Lupa Password
          </CardTitle>
          <CardDescription className="text-center">
            Masukkan email Anda untuk menerima tautan reset password
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Mengirim...' : 'Kirim Tautan Reset'}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              <Link href="/login" className="text-primary hover:underline">
                Kembali ke Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
