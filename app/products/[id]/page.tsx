'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { normalizeImageUrl } from '@/lib/utils';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle,
  ArrowLeft,
  ShoppingCart
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  images?: string[];
  isActive?: boolean;
  stock?: number;
  sku?: string;
  weight?: string;
  dimensions?: string;
}

export default function ProductDetailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/products/${productId}`);
      
      if (response.data.success) {
        setProduct(response.data.data);
      } else {
        setError('Produk tidak ditemukan');
      }
    } catch (err: any) {
      console.error('Error fetching product:', err);
      setError(err.response?.data?.message || 'Gagal mengambil data produk');
    } finally {
      setLoading(false);
    }
  };

  // Format price ke Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get product images
  const getProductImages = () => {
    if (product?.images && product.images.length > 0) {
      return product.images.map(img => normalizeImageUrl(img));
    }
    return ['/images/Kurma kanan.jpg']; // fallback image
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (!product) return;
    
    try {
      setCheckoutLoading(true);
      
      const customerName = user?.displayName || user?.email?.split('@')[0] || 'Customer';
      const customerPhone = user?.phone || '081234567890';
      
      const response = await api.post('/checkout', {
        productId: product.id,
        quantity: quantity,
        customerName: customerName,
        customerPhone: customerPhone,
      });

      if (response.data.success && response.data.data?.whatsappUrl) {
        window.open(response.data.data.whatsappUrl, '_blank');
      } else {
        alert('Gagal membuat checkout link');
      }
    } catch (err: any) {
      console.error('Error checkout:', err);
      const errorMessage = err.response?.data?.message || 'Gagal melakukan checkout';
      
      if (err.response?.data?.errors) {
        alert(err.response.data.errors.join(', '));
      } else {
        alert(errorMessage);
      }
    } finally {
      setCheckoutLoading(false);
    }
  };

  const images = getProductImages();

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-dark-blue text-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/products" className="text-2xl font-bold hover:text-gray-300 transition">
                SUPERFOOD SRAGEN
              </Link>
              <nav className="flex gap-6">
                <Link href="/" className="hover:text-gray-300 transition">BERANDA</Link>
                <Link href="/products" className="hover:text-gray-300 transition font-semibold">PRODUK</Link>
                <Link href="/contact" className="hover:text-gray-300 transition">KONTAK</Link>
              </nav>
            </div>
          </div>
        </header>
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-dark-blue text-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/products" className="text-2xl font-bold hover:text-gray-300 transition">
                SUPERFOOD SRAGEN
              </Link>
              <nav className="flex gap-6">
                <Link href="/" className="hover:text-gray-300 transition">BERANDA</Link>
                <Link href="/products" className="hover:text-gray-300 transition font-semibold">PRODUK</Link>
                <Link href="/contact" className="hover:text-gray-300 transition">KONTAK</Link>
              </nav>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-red-600 mb-4">{error || 'Produk tidak ditemukan'}</p>
          <Button 
            onClick={() => router.push('/products')}
            className="bg-brand-red hover:bg-brand-red/90 text-white"
          >
            Kembali ke Produk
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-dark-blue text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/products" className="text-2xl font-bold hover:text-gray-300 transition">
              SUPERFOOD SRAGEN
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="hover:text-gray-300 transition">BERANDA</Link>
              <Link href="/products" className="hover:text-gray-300 transition font-semibold">PRODUK</Link>
              <Link href="/contact" className="hover:text-gray-300 transition">KONTAK</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Product Detail Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                        selectedImageIndex === index
                          ? 'border-brand-red'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              {product.category && (
                <div className="text-sm text-gray-500 uppercase tracking-wide">
                  {product.category}
                </div>
              )}

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Price */}
              <div className="text-3xl md:text-4xl font-bold text-brand-red">
                {formatPrice(product.price)}
              </div>

              {/* Description */}
              {product.description && (
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-900">Deskripsi Produk</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Product Details */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                {product.sku && (
                  <div className="flex">
                    <span className="text-gray-600 w-32">SKU:</span>
                    <span className="text-gray-900">{product.sku}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex">
                    <span className="text-gray-600 w-32">Berat:</span>
                    <span className="text-gray-900">{product.weight}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex">
                    <span className="text-gray-600 w-32">Dimensi:</span>
                    <span className="text-gray-900">{product.dimensions}</span>
                  </div>
                )}
                {product.stock !== undefined && (
                  <div className="flex">
                    <span className="text-gray-600 w-32">Stok:</span>
                    <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock > 0 ? `Tersedia (${product.stock})` : 'Habis'}
                    </span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <label className="text-gray-700 font-medium">Jumlah:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setQuantity(Math.max(1, val));
                    }}
                    className="w-16 h-10 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-brand-red"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="text-xl font-bold text-gray-900 pt-2">
                Total: {formatPrice(product.price * quantity)}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white py-6 text-lg"
                  onClick={handleCheckout}
                  disabled={checkoutLoading || (product.stock !== undefined && product.stock === 0)}
                >
                  {checkoutLoading ? (
                    'Memproses...'
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Beli Sekarang
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-brand-red text-brand-red hover:bg-brand-red hover:text-white py-6 text-lg"
                  onClick={() => {
                    window.open('https://wa.me/6282220018781', '_blank');
                  }}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-dark-blue text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Hubungi Kami</h2>
          <p className="text-center mb-12 text-gray-200 max-w-2xl mx-auto">
            Temukan berbagai produk superfood berkualitas dan dapatkan informasi serta pemesanan melalui WhatsApp dan Instagram resmi Superfood Sragen.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-dark-blue border-2 border-white/20 rounded-lg p-6">
              <MapPin className="h-8 w-8 mb-4 text-brand-orange" />
              <h3 className="font-bold mb-2">Lokasi</h3>
              <p className="text-gray-200 text-sm">
                Turi, RT.004/RW.004, Gumantar, Kec. Mojoagung, Kabupaten Sragen, Jawa Tengah 57271
              </p>
            </div>
            
            <div className="bg-dark-blue border-2 border-white/20 rounded-lg p-6">
              <Phone className="h-8 w-8 mb-4 text-brand-orange" />
              <h3 className="font-bold mb-2">Hubungi Kami</h3>
              <p className="text-gray-200 text-sm">0822-2001-8781</p>
            </div>
            
            <div className="bg-dark-blue border-2 border-white/20 rounded-lg p-6">
              <Clock className="h-8 w-8 mb-4 text-brand-orange" />
              <h3 className="font-bold mb-2">Jam Operasional</h3>
              <p className="text-gray-200 text-sm">Senin - Minggu 08.00 - 18.00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-blue text-white py-6 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">© 2024 SUPERFOOD SRAGEN. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
