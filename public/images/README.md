# Folder Images

Folder ini digunakan untuk menyimpan gambar-gambar static yang digunakan di aplikasi.

## Struktur yang Disarankan

```
images/
├── products/          # Gambar produk
├── hero/              # Gambar untuk hero section
├── about/             # Gambar untuk section tentang kami
├── logo/              # Logo dan branding
└── icons/             # Icon custom (jika ada)
```

## Penggunaan di Next.js

Untuk menggunakan gambar dari folder ini, gunakan path relatif dari root:

```tsx
// Contoh penggunaan
<img src="/images/products/kurma.jpg" alt="Kurma" />
```

atau dengan Next.js Image component:

```tsx
import Image from 'next/image';

<Image 
  src="/images/products/kurma.jpg" 
  alt="Kurma" 
  width={400} 
  height={400} 
/>
```

