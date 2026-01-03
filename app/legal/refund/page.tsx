'use client';

import React from 'react';
import { RefreshCw, RotateCcw, AlertCircle, CheckCircle, Calendar, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="w-16 h-16 bg-brand-pink/10 text-brand-pink rounded-2xl flex items-center justify-center mx-auto mb-6">
            <RefreshCw size={32} />
          </div>
          <h1 className="text-4xl font-black text-brand-dark mb-4">Refund & Cancellation Policy</h1>
          <p className="text-slate-500">Last Updated: January 3, 2026</p>
        </div>

        <Card className="p-8 md:p-12 space-y-12">
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-slate-600 text-sm">
            <p>
              Thank you for choosing The IDEA. We invite you to read our policy on refunds, returns, and cancellations. 
              This policy applies to all services and products purchased through The IDEA.
            </p>
          </div>

          {/* 1. Physical Goods */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
              <span className="bg-brand-yellow/20 text-brand-dark w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Physical Goods (Megastore)
            </h2>
            <div className="pl-11 text-slate-600 space-y-4">
              <p>This section applies to physical items shipped to you (e.g., merchandise, books, equipment).</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-bold text-brand-dark mb-2">30-Day Return Window</h3>
                  <p className="text-sm">You have 30 days after receiving your item to request a return.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-bold text-brand-dark mb-2">Eligibility</h3>
                  <p className="text-sm">Item must be in the same condition you received it, unworn/unused, with tags, and in original packaging.</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-brand-dark mb-2">How to Start a Return</h3>
                <p className="text-sm mb-2">Contact us at <a href="mailto:returns@theideaiq.com" className="text-brand-pink underline">returns@theideaiq.
