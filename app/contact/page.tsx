'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Import your new UI System
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending to server...
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    toast.success("Message sent! We'll contact you shortly.");
    
    // Reset form (Optional)
    // (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">Get in Touch</h1>
          <p className="text-slate-500">We are here to help. Chat with us or send a message.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Contact Info Cards */}
          <div className="space-y-6">
            
            <Card className="p-6 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-pink-50 text-brand-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} />
              </div>
              <h3 className="font-bold text-brand-dark">Email Us</h3>
              <p className="text-slate-400 text-sm mb-2">For general inquiries</p>
              <a href="mailto:hello@theideaiq.com" className="text-brand-pink font-medium hover:underline">hello@theideaiq.com</a>
            </Card>

            <Card className="p-6 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-yellow-50 text-brand-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={24} />
              </div>
              <h3 className="font-bold text-brand-dark">Call Us</h3>
              <p className="text-slate-400 text-sm mb-2">Mon-Fri from 9am to 6pm</p>
              <a href="tel:+9647700000000" className="text-brand-dark font-medium hover:underline">+964 770 000 0000</a>
            </Card>

            <Card className="p-6 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="
