'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
export default function HomeHeader() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToBeranda = () => {
    document.getElementById('beranda')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-dark-blue text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href='/'>
          <h1 className="text-lg md:text-2xl font-bold">SUPERFOOD SERAGEN</h1>
          </a>

          <nav className="hidden md:flex gap-6">
            <a
              href="/"
              className="hover:text-gray-300 transition"
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

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>

        {isOpen && (
          <nav className="flex flex-col gap-4 mt-4 md:hidden bg-slate-900 p-5 rounded-md">
            <a
              href="/"
              className="hover:text-gray-300 transition"
            >
              BERANDA
            </a>
            <a
              href="/products"
              className="hover:text-gray-300 transition"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
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
                setIsOpen(false);
                router.push('/contact');
              }}
            >
              KONTAK
            </a>
          </nav>
        )}
      </div>
    </header>
    
  );
}
