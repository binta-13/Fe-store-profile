'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { normalizeImageUrl } from '@/lib/utils';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  images?: string[];
  isActive?: boolean;
}

export default function ProductsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract unique categories from products, dengan fallback ke kategori default
  const defaultCategories = ['Semua', 'Makanan', 'Minuman', 'Hampers'];
  const productCategories = ['Semua', ...new Set(products.map(p => p.category).filter(Boolean))] as string[];
  const categories = productCategories.length > 1 ? productCategories : defaultCategories;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/products');
        
        if (response.data.success) {
          // Filter hanya produk yang aktif
          const activeProducts = response.data.data.filter((product: Product) => 
            product.isActive !== false
          );
          setProducts(activeProducts);
        } else {
          setError('Gagal mengambil data produk');
        }
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.message || 'Gagal mengambil data produk');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'Semua' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Format price ke Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get product image (gunakan images[0] jika ada, atau fallback)
  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      return normalizeImageUrl(product.images[0]);
    }
    return '/images/Kurma kanan.jpg'; // fallback image
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-dark-blue text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition">
              SUPERFOOD SRAGEN
            </Link>
            <nav className="flex gap-6">
              <Link 
                href="/" 
                className="hover:text-gray-300 transition"
              >
                BERANDA
              </Link>
              <Link 
                href="/products" 
                className="hover:text-gray-300 transition font-semibold"
              >
                PRODUK
              </Link>
              <Link 
                href="/contact" 
                className="hover:text-gray-300 transition"
              >
                KONTAK
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-dark-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-center">
            {/* Left Image */}
            <div className="absolute left-0 top-0 bottom-0 w-48 hidden lg:block">
              <div className="relative h-full">
                <Image 
                  src="/images/Kurma kiri.jpg" 
                  alt="Kurma" 
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Center Content */}
            <div className="text-center z-10 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Katalog Produk Superfood Sragen
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                Temukan beragam superfood pilihan dengan kualitas terbaik dan manfaat alami untuk mendukung kesehatan setiap hari.
              </p>
              <Button 
                className="bg-brand-red hover:bg-brand-red/90 text-white px-8 py-3 rounded-md flex items-center gap-2 mx-auto"
                onClick={() => {
                  window.open('https://wa.me/6282220018781', '_blank');
                }}
              >
                <MessageCircle className="h-5 w-5" />
                Order by Whatsapp
              </Button>
            </div>

            {/* Right Image */}
            <div className="absolute right-0 top-0 bottom-0 w-48 hidden lg:block">
              <div className="relative h-full">
                <Image 
                  src="/images/Kurma kanan.jpg" 
                  alt="Kurma" 
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Produk Kami</h2>
          
          {/* Category Tabs */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-md font-medium transition ${
                  activeCategory === category
                    ? 'bg-brand-red text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-brand-red hover:bg-brand-red/90 text-white"
              >
                Coba Lagi
              </Button>
            </div>
          )}

          {/* Product Cards */}
          {!loading && !error && (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Tidak ada produk yang tersedia</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col cursor-pointer"
                      onClick={() => router.push(`/products/${product.id}`)}
                    >
                      <div className="relative h-40 md:h-48 bg-gray-100">
                        <Image 
                          src={getProductImage(product)} 
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3 md:p-4 flex flex-col flex-1">
                        <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">{product.name}</h3>
                        <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 line-clamp-3 flex-1">
                          {product.description || 'Produk berkualitas tinggi'}
                        </p>
                        <p className="font-bold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">
                          {formatPrice(product.price)}
                        </p>
                        <Button 
                          className="w-full bg-brand-red hover:bg-brand-red/90 text-white rounded-none text-xs md:text-sm py-2 mt-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/products/${product.id}`);
                          }}
                        >
                          Beli
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
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
