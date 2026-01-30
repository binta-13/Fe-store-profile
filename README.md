# Store Profile Frontend

Frontend aplikasi Store Profile menggunakan Next.js 14 dan shadcn/ui.

## Fitur

- ✅ Halaman Login
- ✅ Halaman Register
- ✅ Dashboard Admin
- ✅ Halaman User
- ✅ Authentication dengan Context API
- ✅ Protected Routes
- ✅ Responsive Design dengan Tailwind CSS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy file environment:
```bash
cp .env.local.example .env.local
```

3. Update `.env.local` dengan URL API backend Anda (optional, default sudah menggunakan production API):
```
NEXT_PUBLIC_API_URL=https://be-store-profile.vercel.app/api
```

4. Jalankan development server:
```bash
npm run dev
```

5. Buka [http://localhost:3001](http://localhost:3001) di browser

## Struktur Project

```
FE/
├── app/                    # Next.js App Router
│   ├── login/             # Halaman login
│   ├── register/          # Halaman register
│   ├── admin/             # Halaman admin
│   │   └── dashboard/     # Dashboard admin
│   ├── user/              # Halaman user
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (redirect)
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── AdminLayout.tsx    # Layout untuk admin
│   └── ProtectedRoute.tsx # Component untuk protected routes
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── lib/
│   ├── api.ts             # API client (axios)
│   └── utils.ts           # Utility functions
└── package.json
```

## Authentication

Aplikasi menggunakan Context API untuk mengelola state authentication. Token disimpan di cookies dan otomatis ditambahkan ke setiap request API.

## Components

### shadcn/ui Components

Aplikasi menggunakan shadcn/ui untuk komponen UI:
- Button
- Input
- Label
- Card
- Avatar
- Dropdown Menu
- Separator

## Pages

### Login (`/login`)
Halaman untuk login user.

### Register (`/register`)
Halaman untuk registrasi user baru.

### Admin Dashboard (`/admin/dashboard`)
Dashboard untuk admin dan sub_admin dengan statistik dan quick actions.

### User Page (`/user`)
Halaman utama untuk user biasa dengan informasi akun dan akses ke fitur.

## Protected Routes

Gunakan component `ProtectedRoute` untuk melindungi halaman:
- `requireAdmin`: Hanya admin yang bisa akses
- `requireSubAdmin`: Admin dan sub_admin bisa akses

## API Integration

Semua API calls menggunakan axios client di `lib/api.ts`. Token otomatis ditambahkan ke header setiap request.

## Development

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

## Deployment ke Netlify

Aplikasi sudah dikonfigurasi untuk deploy ke Netlify dengan file `netlify.toml`.

### Cara Deploy:

#### Opsi 1: Deploy via Netlify Dashboard (Recommended)

1. **Push code ke GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Setup Netlify deployment"
   git push origin main
   ```

2. **Login ke Netlify**
   - Buka [https://app.netlify.com](https://app.netlify.com)
   - Login dengan GitHub/GitLab/Bitbucket account

3. **Import Project**
   - Klik "Add new site" → "Import an existing project"
   - Pilih repository yang berisi frontend code
   - Netlify akan otomatis mendeteksi konfigurasi dari `netlify.toml`

4. **Set Environment Variables (Optional)**
   - Jika ingin override API URL, tambahkan di Netlify Dashboard:
     - Site settings → Environment variables
     - Key: `NEXT_PUBLIC_API_URL`
     - Value: `https://be-store-profile.vercel.app/api`
   - Jika tidak di-set, akan menggunakan default dari `lib/api.ts`

5. **Deploy**
   - Klik "Deploy site"
   - Netlify akan otomatis build dan deploy aplikasi

#### Opsi 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login ke Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   # Di folder FE
   cd FE
   netlify deploy --prod
   ```

### Konfigurasi

File `netlify.toml` sudah dikonfigurasi dengan:
- Build command: `npm run build`
- Publish directory: `.next` (akan di-handle oleh plugin)
- Next.js plugin: `@netlify/plugin-nextjs` (otomatis diinstall saat build)
- Node version: 18

### Environment Variables

Untuk production, pastikan set environment variable di Netlify Dashboard:
- `NEXT_PUBLIC_API_URL` (optional, default: `https://be-store-profile.vercel.app/api`)

### Catatan

- Netlify akan otomatis menginstall `@netlify/plugin-nextjs` saat build
- Plugin ini menangani Next.js routing, middleware, dan optimizations
- Build time biasanya 2-5 menit tergantung ukuran project
