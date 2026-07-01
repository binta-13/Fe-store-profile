import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalize image URL - convert relative paths to full URLs
 * @param url - Image URL (can be relative or absolute)
 * @returns Full URL
 */
export function normalizeImageUrl(url: string): string {
  if (!url) return url;
  
  // Convert Google Drive share link to direct image URL
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  }
  
  // If already a full URL (starts with http:// or https://), return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If relative path starting with /uploads/, convert to full URL
  if (url.startsWith('/uploads/')) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://be-store-profile.vercel.app/api';
    // Remove /api from the end if present, then add the relative path
    const baseUrl = apiBaseUrl.replace(/\/api$/, '');
    return `${baseUrl}${url}`;
  }
  
  // For other relative paths (like /images/...), return as is (handled by Next.js)
  return url;
}
