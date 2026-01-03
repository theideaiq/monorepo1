import React from 'react';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Globe, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-slate-300 font-sans">
      
      {/* "Back to Top" Bar (Amazon Style) */}
      <a 
        href="#" 
        className="block bg-slate-800 hover:bg-slate-700 text-center py-4 text-sm text-white transition-colors"
      >
        Back to top
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          
          {/* Column 1: Get to Know Us */}
          <div>
            <h3 className="text-white font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-brand-yellow hover:underline transition">About The IDEA</a></li>
              <li><a href="#" className="hover:text-brand-yellow hover:underline transition">Careers</a></li>
              <li><a href="#" className="hover:text-brand-yellow hover:underline transition">Press Releases</a></li>
              <li><a href="#" className="hover:text-brand-yellow hover:underline transition">Investor Relations</a></li>
            </ul>
          </div>

          {/* Column 2: The Ecosystem */}
          <div>
            <h3 className="text-white font-bold mb-4">Our Ecosystem</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="https://megastore.theideaiq.com" className="hover:text-brand-pink hover:underline transition">The Megastore</a></li>
              <li><a href="https://academy.theideaiq.com" className="hover:text-brand-pink hover:underline transition">The Academy</a></li>
              <li><a href="https://plus.theideaiq.com" className="hover:text-brand-pink hover:underline transition">IDEA Plus Rentals</a></li>
              <li><a href="https://connect.theideaiq.com" className="hover:text-brand-pink hover:underline transition">The Network</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-white font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-brand-yellow hover:underline transition">Your Account</a></li>
              <li><a href="#" className="hover:text-brand-yellow hover:underline transition">Your Orders</a></li>
              <li><a href="#" className="hover:text-brand-yellow hover:underline transition">Shipping Rates</a></li>
              <li><a href="#" className="hover:text-brand-yellow hover:underline transition">Help Center</a></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-white font-bold mb-4">Connect with Us</h3>
            <div className="flex gap-4 mb-6">
               {/* Social Icons with Brand Hover Effects */}
               <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-pink hover:text-white transition"><Facebook size={18} /></a>
               <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-pink hover:text-white transition"><Instagram size={18} /></a>
               <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-pink hover:text-white transition"><Twitter size={18} /></a>
               <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-pink hover:text-white transition"><Linkedin size={18} /></a>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-slate-400 mb-2">Download the App</p>
                <div className="flex gap-2">
                    <div className="w-24 h-8 bg-slate-700 rounded flex items-center justify-center text-[10px] text-white">App Store</div>
                    <div className="w-24 h-8 bg-slate-700 rounded flex items-center justify-center text-[10px] text-white">Google Play</div>
                </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Bar: Brand & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          
          <div className="flex items-center gap-2">
             <div className="relative w-6 h-6 opacity-70">
                 {/* This uses your vector logo */}
                 <Image src="/logo.svg" alt="Logo" fill className="object-cover" />
             </div>
             <span>The IDEA IQ</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
             <a href="#" className="hover:text-white transition">Conditions of Use</a>
             <a href="#" className="hover:text-white transition">Privacy Notice</a>
             <a href="#" className="hover:text-white transition">Consumer Health Data Privacy</a>
          </div>

          <div>
             © 2017-{currentYear}, The IDEA IQ or its affiliates.
          </div>

        </div>
      </div>
    </footer>
  );
}
