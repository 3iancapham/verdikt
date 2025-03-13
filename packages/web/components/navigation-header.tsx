'use client';

import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function NavigationHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            Verdikt
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  {user.email}
                </span>
                <LogoutButton />
              </>
            ) : (
              <Link
                href="/auth"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 