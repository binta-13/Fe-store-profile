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
import { ExternalLink, Loader2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CheckoutResult {
  whatsappUrl: string;
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
  total: number;
  customer: {
    name: string;
    phone: string;
  };
}

export default function CheckoutPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResult | null>(null);
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '1',
    customerName: '',
    customerPhone: '',
    notes: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      if (response.data.success) {
        setProducts(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setCheckoutResult(null);

    try {
      const response = await api.post('/checkout', {
        ...formData,
        quantity: parseInt(formData.quantity),
      });

      if (response.data.success) {
        setCheckoutResult(response.data.data);
      }
    } catch (error: any) {
      console.error('Error creating checkout:', error);
      alert(error.response?.data?.message || 'Gagal membuat checkout link');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectedProduct = products.find((p) => p.id === formData.productId);
  const total = selectedProduct ? selectedProduct.price * parseInt(formData.quantity || '1') : 0;

  return (
    <ProtectedRoute requireAdmin={false}>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">
              Generate WhatsApp checkout link untuk customer
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Form Checkout</CardTitle>
                <CardDescription>
                  Isi informasi checkout
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productId">Produk *</Label>
                    {loading ? (
                      <div className="h-10 flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      <select
                        id="productId"
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="">Pilih Produk</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name} - Rp {product.price.toLocaleString('id-ID')}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Jumlah *</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                    />
                  </div>

                  {selectedProduct && (
                    <div className="p-3 bg-muted rounded-md">
                      <div className="text-sm">
                        <div className="flex justify-between">
                          <span>Harga Satuan:</span>
                          <span>Rp {selectedProduct.price.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between font-semibold mt-2">
                          <span>Total:</span>
                          <span>Rp {total.toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="customerName">Nama Customer *</Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">No. Telepon Customer *</Label>
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      placeholder="081234567890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Catatan</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      disabled={submitting}
                      placeholder="Catatan tambahan untuk pesanan..."
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={submitting || !formData.productId}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Membuat Link...
                      </>
                    ) : (
                      'Generate WhatsApp Link'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {checkoutResult && (
              <Card>
                <CardHeader>
                  <CardTitle>Checkout Link</CardTitle>
                  <CardDescription>
                    Link WhatsApp checkout telah dibuat
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Produk</Label>
                    <p className="text-sm">{checkoutResult.product.name}</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Jumlah</Label>
                    <p className="text-sm">{checkoutResult.quantity}</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Total</Label>
                    <p className="text-sm font-semibold">
                      Rp {checkoutResult.total.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Customer</Label>
                    <p className="text-sm">
                      {checkoutResult.customer.name} ({checkoutResult.customer.phone})
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button
                      asChild
                      className="w-full"
                      onClick={() => window.open(checkoutResult.whatsappUrl, '_blank')}
                    >
                      <a href={checkoutResult.whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Buka WhatsApp
                      </a>
                    </Button>
                  </div>

                  <div className="pt-2">
                    <Label>Link URL</Label>
                    <div className="mt-2 p-2 bg-muted rounded-md text-xs break-all">
                      {checkoutResult.whatsappUrl}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

