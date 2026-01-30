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

