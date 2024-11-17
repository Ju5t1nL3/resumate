// app/auth/AuthTabs.js
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AuthTabs() {
  const pathname = usePathname();
  const isSignUp = pathname === '/auth/signup';

  return (
    <div className="flex justify-center space-x-8 mb-8 border-b">
      <Link
        href="/auth/login"
        className={`pb-2 px-4 ${
          !isSignUp
            ? 'border-b-2 border-black font-semibold'
            : 'text-gray-500'
        }`}
      >
        Log In
      </Link>
      <Link
        href="/auth/signup"
        className={`pb-2 px-4 ${
          isSignUp
            ? 'border-b-2 border-black font-semibold'
            : 'text-gray-500'
        }`}
      >
        Sign Up
      </Link>
    </div>
  );
}