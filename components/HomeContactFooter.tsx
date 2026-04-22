'use client';

import { useEffect, useState } from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import api from '@/lib/api';

export default function HomeContactFooter() {
  const [storeAddress, setStoreAddress] = useState(
    'Tun RT.004 RW.10, Gunungpati, Kec. Gunungpati, Kota Semarang, Jawa Tengah 50219',
  );
  const [storePhone, setStorePhone] = useState('24 jam online');

  useEffect(() => {
    const fetchStoreProfile = async () => {
      try {
        const response = await api.get('/store-profile');
        const address = response.data?.data?.address;
        const phone = response.data?.data?.phone;

        if (response.data?.success && address) {
          setStoreAddress(address);
        }
        if (response.data?.success && phone) {
          setStorePhone(phone);
        }
      } catch (error) {}
    };

    fetchStoreProfile();
  }, []);

  return (
    <>
      <section id="kontak" className="py-16 bg-dark-blue text-white mt-5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Hubungi Kami</h2>
          <p className="text-center mb-12 text-gray-200 max-w-2xl mx-auto">
            Dapatkan informasi produk, detail, dan pemesanan melalui WhatsApp
            dan Instagram kami. Kami siap membantu Anda menemukan superfood
            terbaik untuk kebutuhan Anda.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            <div className="bg-dark-blue border-2 border-white/20 rounded-lg p-6 h-full flex flex-col">
              <MapPin className="h-8 w-8 mb-4 text-brand-orange" />
              <h3 className="font-bold mb-2">Lokasi</h3>
              <p className="text-gray-200 text-sm leading-relaxed">{storeAddress}</p>
            </div>

            <div className="bg-dark-blue border-2 border-white/20 rounded-lg p-6 h-full flex flex-col">
              <Phone className="h-8 w-8 mb-4 text-brand-orange" />
              <h3 className="font-bold mb-2">Hubungi Kami</h3>
              <p className="text-gray-200 text-sm leading-relaxed">{storePhone}</p>
            </div>

            <div className="bg-dark-blue border-2 border-white/20 rounded-lg p-6 h-full flex flex-col">
              <Clock className="h-8 w-8 mb-4 text-brand-orange" />
              <h3 className="font-bold mb-2">Jam Operasional</h3>
              <p className="text-gray-200 text-sm leading-relaxed">Senin - Minggu 08.00 - 18.00</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark-blue text-white py-6 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">© 2026 SUPERFOOD SERAGEN. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
