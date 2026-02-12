'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { normalizeImageUrl } from '@/lib/utils';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle,
  ShoppingBag,
  Users,
  Package,
  MapPin as LocationIcon,
  ThumbsUp
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

export default function Home() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const heroImages = [
    '/images/Kurma Slider 1.jpg',
    '/images/Hampers Slider 2.jpg',
    '/images/Kurma kanan.jpg',
  ];

  // Extract unique categories from products, dengan fallback ke kategori default
  const defaultCategories = ['Semua', 'Makanan', 'Minuman', 'Menu Sarapan', 'Hampers'];
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-dark-blue text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">SUPERFOOD SINAGIN</h1>
            <nav className="flex gap-6">
              <a 
                href="#beranda" 
                className="hover:text-gray-300 transition"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('beranda')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                BERANDA
              </a>
              <a 
                href="/products" 
                className="hover:text-gray-300 transition"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/products');
                }}
              >
                PRODUK
              </a>
              <a 
                href="/contact" 
                className="hover:text-gray-300 transition"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/contact');
                }}
              >
                KONTAK
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="beranda" className="bg-dark-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Pilihan SUPERFOOD Terbaik untuk Gaya Hidup Sehatmu
              </h2>
              <p className="text-lg mb-6 text-gray-200">
                Menyediakan berbagai produk superfood pilihan untuk mendukung kesehatan dan nutrisi keluarga Anda
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-brand-red hover:bg-brand-red/90 text-white px-6 py-3 rounded-none"
                  onClick={() => {
                    router.push('/products');
                  }}
                >
                  Lihat Produk
                </Button>
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-gray-300 transition"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Order by Whatsapp
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image 
                  src={heroImages[heroSlideIndex]} 
                  alt="Superfood products" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setHeroSlideIndex(index)}
                    className={`w-2 h-2 rounded-full transition ${
                      heroSlideIndex === index ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="produk" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Produk Kami</h2>
          
          {/* Category Tabs */}
          <div className="flex justify-center flex-wrap gap-4 mb-8">
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

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-end relative">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Tentang Kami</h2>
              <div className="border-4 border-yellow-400 p-6 rounded-lg mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Kami berkomitmen untuk menyediakan produk superfood berkualitas tinggi yang mendukung 
                  gaya hidup sehat Anda dan keluarga. Dengan pengalaman bertahun-tahun, kami memastikan 
                  setiap produk yang kami tawarkan adalah pilihan terbaik untuk kesehatan dan nutrisi Anda.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-dark-blue flex items-center justify-center mb-2">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">10k</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-dark-blue flex items-center justify-center mb-2">
                    <Package className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">25+</p>
                  <p className="text-sm text-gray-600">Produk</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-dark-blue flex items-center justify-center mb-2">
                    <LocationIcon className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                  <p className="text-sm text-gray-600">Lokasi</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image 
                src="/images/Gambar Tentang Kami.jpg" 
                alt="Tentang Kami" 
                fill
                className="object-cover"
              />
            </div>

            {/* Icon Good di tengah bawah antara text dan image */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 flex flex-col items-center z-10">
              <div className="bg-brand-red text-white px-8 py-3 rounded-2xl flex flex-col items-center gap-3 shadow-xl">
                <ThumbsUp className="h-7 w-7 stroke-2 stroke-white fill-none" />
                <span className="font-semibold text-base">Sejak 2011</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-16 bg-dark-blue text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Hubungi Kami</h2>
          <p className="text-center mb-12 text-gray-200 max-w-2xl mx-auto">
            Dapatkan informasi produk, detail, dan pemesanan melalui WhatsApp dan Instagram kami. 
            Kami siap membantu Anda menemukan superfood terbaik untuk kebutuhan Anda.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-dark-blue border-2 border-white/20 rounded-lg p-6">
              <MapPin className="h-8 w-8 mb-4 text-brand-orange" />
              <h3 className="font-bold mb-2">Lokasi</h3>
              <p className="text-gray-200 text-sm">
                Tun RT.004 RW.10, Gunungpati, Kec. Gunungpati, Kota Semarang, Jawa Tengah 50219
              </p>
            </div>
            
            <div className="bg-dark-blue border-2 border-white/20 rounded-lg p-6">
              <Phone className="h-8 w-8 mb-4 text-brand-orange" />
              <h3 className="font-bold mb-2">Hubungi Kami</h3>
              <p className="text-gray-200 text-sm">24 jam online</p>
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
          <p className="text-gray-300">© 2024 SUPERFOOD SINAGIN. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
