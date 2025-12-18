'use client';
import Link from 'next/link';
import ConnectWallet from './ConnectWallet';

export default function Nav() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
              Matt's Markets
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/create" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Create Market
            </Link>
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );
}
