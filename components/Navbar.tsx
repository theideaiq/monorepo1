import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md border-b border-slate-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Area - Clickable to go Home */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg">
               {/* Ensure logo.svg exists in public folder */}
               <Image src="/logo.svg" alt="The IDEA Logo" fill className="object-cover" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-brand-pink">
              The IDEA<span className="text-brand-yellow">.</span>
            </span>
          </Link>

          {/* Right Side Buttons */}
          <div className="flex gap-4 items-center">
              <Link href="/legal/terms" className="text-sm font-medium hover:text-brand-pink text-slate-600">Legal</Link>
              <button className="hidden md:block bg-brand-dark text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition">
                Sign In
              </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
