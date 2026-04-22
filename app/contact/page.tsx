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
import { MapPin, Phone, Clock, ShoppingBag, Instagram } from 'lucide-react';
import HomeHeader from '@/components/HomeHeader';
import HomeContactFooter from '@/components/HomeContactFooter'
export default function ContactPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <HomeHeader />
      {/* Hero Section */}
      <section className="bg-dark-blue text-white py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mulai Konsultasi & Pemesanan
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Tentukan beragam superfood pilihan dengan kualitas terbaik dan
              manfaat alami untuk mendukung kesehatan setiap hari.
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
      <Image
        src="/images/ombak.png"
        alt="Ombak"
        width={1920}
        height={20}
        className="block w-full h-44 "
      />
      {/* Contact Form Section */}
      <section className="py-1 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* Contact Form */}
            <div className="relative mt-10 md:mt-20">
              {/* Background */}
              <div className="absolute -bottom-4 -left-1 w-[18rem] h-[28rem] md:w-96 md:h-96 bg-dark-blue rounded-2xl"></div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="relative bg-white rounded-2xl p-6 md:p-8 z-10 shadow-sm w-full md:w-[580px]"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nama"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-100 border-0 rounded-xl"
                  />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-100 border-0 rounded-xl"
                  />

                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="No Hp"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-gray-100 border-0 rounded-xl"
                  />
                </div>

                <div className="mb-4">
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-gray-100 border-0 rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-dark-blue hover:bg-dark-blue/90 text-white py-3 rounded-xl font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="mt-10 md:mt-32">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative inline-block">
                Kontak Kami
                <span className="absolute bottom-0 left-0 w-16 md:w-20 h-1 bg-brand-red"></span>
              </h2>

              <div className="flex items-center gap-3 mt-6">
                <Phone className="h-5 w-5 md:h-6 md:w-6 text-brand-red" />
                <a
                  href="tel:082226013701"
                  className="text-lg md:text-xl font-semibold text-gray-900 hover:text-brand-red transition"
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 relative inline-block">
                Kunjungi Kami
                <span className="absolute bottom-0 left-0 w-16 md:w-20 h-1 bg-brand-red"></span>
              </h2>

              <div className="space-y-4 mt-6 md:mt-8">
                <div className="flex items-center gap-3">
                  <Instagram className="h-5 w-5 md:h-6 md:w-6 text-brand-red flex-shrink-0" />
                  <a
                    href="https://instagram.com/superfood.sragen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 font-semibold hover:text-brand-red transition text-sm md:text-base"
                  >
                    superfood.sragen
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-brand-red flex-shrink-0" />
                  <p className="text-gray-900 font-semibold text-sm md:text-base">
                    Superfood.sragen
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative mt-10 md:mt-0">
              
              {/* Background Image */}
              <div className="absolute inset-0 z-0 hidden md:block">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/images/bg_Maps.png"
                    alt="Background"
                    fill
                    className="object-cover grayscale"
                  />
                </div>
              </div>

              {/* Map */}
              <div className="relative z-10 ml-0 md:ml-[-280px] mt-0 md:mt-10 rounded-lg overflow-hidden w-full max-w-full md:max-w-lg h-64 md:h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.194605454706!2d110.9994533!3d-7.443709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a1dd9a0376871%3A0x61da8617946eef88!2sSuperfood%20sragen%20(kurma%2Calmond%2Champers%2C%20pudding%20%26%20makanan%20sehat%20lainnya!5e0!3m2!1sid!2sid!4v1776834782281!5m2!1sid!2sid"
                  className="w-full h-80 border-0 rounded-lg mt-3"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <HomeContactFooter />
    </div>
  );
}
