'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-6">
            <Link href="/admin/dashboard" className="text-xl font-bold">
              Store Profile
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link
                href="/admin/dashboard"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/store-profile"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Store Profile
              </Link>
              <Link
                href="/admin/products"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Products
              </Link>
              <Link
                href="/admin/promos"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Promos
              </Link>
              <Link
                href="/admin/checkout"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Checkout
              </Link>
              {isAdmin && (
                <Link
                  href="/admin/users"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Users
                </Link>
              )}
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user?.image} alt={user?.displayName || user?.email} />
                    <AvatarFallback>
                      {getInitials(user?.displayName, user?.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.displayName || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.role || 'user'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-6">
        {children}
      </main>
    </div>
  );
}

