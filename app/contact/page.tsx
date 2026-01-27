'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShoppingBag,
  Instagram
} from 'lucide-react';

export default function ContactPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement form submission logic
    // For now, just show alert
    setTimeout(() => {
      alert('Terima kasih! Pesan Anda telah terkirim.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-dark-blue text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition">
              SUPERFOOD SINAGIN
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
                className="hover:text-gray-300 transition"
              >
                PRODUK
              </Link>
              <Link 
                href="/contact" 
                className="hover:text-gray-300 transition font-semibold"
              >
                KONTAK
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-dark-blue text-white py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mulai Konsultasi & Pemesanan
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Tentukan beragam superfood pilihan dengan kualitas terbaik dan manfaat alami untuk mendukung kesehatan setiap hari.
            </p>
            <Button 
              className="bg-brand-red hover:bg-brand-red/90 text-white px-8 py-3 rounded-md"
              onClick={() => router.push('/products')}
            >
              Lihat Produk
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="relative">
              {/* Dark Blue Background Overlay */}
              <div className="absolute -inset-4 bg-dark-blue rounded-lg -z-10"></div>
              
              {/* White Form */}
              <form onSubmit={handleSubmit} className="bg-white border-2 border-dark-blue rounded-lg p-6 md:p-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 mb-2 block">Nama</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 mb-2 block">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 mb-2 block">No Hp</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="border-gray-300"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <Label htmlFor="message" className="text-gray-700 mb-2 block">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="border-gray-300"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-dark-blue hover:bg-dark-blue/90 text-white py-3 rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim'}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 relative inline-block">
                Kontak Kami
                <span className="absolute bottom-0 left-0 w-20 h-1 bg-brand-red"></span>
              </h2>
              <div className="flex items-center gap-3 mt-6">
                <Phone className="h-6 w-6 text-brand-red" />
                <a 
                  href="tel:082226013701" 
                  className="text-xl font-semibold text-gray-900 hover:text-brand-red transition"
                >
                  0822-2601-3701
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 relative inline-block">
                Kunjungi Kami
                <span className="absolute bottom-0 left-0 w-20 h-1 bg-brand-red"></span>
              </h2>
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <Instagram className="h-6 w-6 text-brand-red flex-shrink-0" />
                  <a 
                    href="https://instagram.com/superfood.sragen" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 font-semibold hover:text-brand-red transition"
                  >
                    superfood.sragen
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-brand-red flex-shrink-0" />
                  <p className="text-gray-900 font-semibold">Superfood.sragen</p>
                </div>
              </div>
            </div>

            {/* Right Content - Map with Background Image */}
            <div className="relative">
              {/* Background Image (Grayscale) */}
              <div className="absolute inset-0 z-0 opacity-30">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image 
                    src="/images/Kurma Slider 1.jpg" 
                    alt="Background" 
                    fill
                    className="object-cover grayscale"
                  />
                </div>
              </div>
              
              {/* Map (Front) */}
              <div className="relative z-10 rounded-lg overflow-hidden shadow-lg h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.715123456789!2d110.356789!3d-7.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDcnMjQuNSJTIDExMMKwMjEnMjQuNCJF!5e0!3m2!1sid!2sid!4v1234567890123!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Hubungi <span className="text-brand-red">Kami</span>
          </h2>
          <p className="text-center mb-12 text-gray-200 max-w-2xl mx-auto">
            Temukan berbagai produk superfood berkualitas dan dapatkan informasi serta penawaran melalui WhatsApp dan Instagram kami Superfood Sragen.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-4 text-brand-orange" />
              <h3 className="font-bold mb-2">Lokasi</h3>
              <p className="text-gray-200 text-sm">
                Turi, RT.04/RW.14, Gemolong, Kec. Sragen, Jawa Tengah, Jawa Tengah 57272
              </p>
            </div>
            
            <div className="text-center">
              <Phone className="h-8 w-8 mx-auto mb-4 text-brand-orange" />
              <h3 className="font-bold mb-2">Hubungi Kami</h3>
              <p className="text-gray-200 text-sm">0823-2801-3701</p>
            </div>
            
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-4 text-brand-orange" />
              <h3 className="font-bold mb-2">Jam Operasional</h3>
              <p className="text-gray-200 text-sm">Senin - Minggu</p>
              <p className="text-gray-200 text-sm">09.00 - 16.00</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

