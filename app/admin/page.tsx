'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Package, Truck, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

// Connect to Database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Define what a "Rental" looks like
type Rental = {
  id: number;
  user_id: string;
  item_name: string;
  amount: number;
  status: 'active' | 'delivered' | 'returned' | 'overdue';
  created_at: string;
};

export default function AdminDashboard() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch the latest orders
  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('rentals')
      .select('*')
      .order('created_at', { ascending: false }); // Newest first

    if (error) console.error('Error fetching:', error);
    else setRentals(data || []);
    setLoading(false);
  };

  // Fetch on load
  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to update status (e.g., when a driver delivers it)
  const updateStatus = async (id: number, newStatus: string) => {
    await supabase.from('rentals').update({ status: newStatus }).eq('id', id);
    fetchOrders(); // Refresh the list
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-dark">Operations Command</h1>
            <p className="text-slate-500">Manage rentals, deliveries, and returns.</p>
          </div>
          <button 
            onClick={fetchOrders}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-slate-50 text-slate-600 font-medium"
          >
            <RefreshCw size={18} /> Refresh
          </button>
        </div>

        {/* The Order Board */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold text-slate-600">Order ID</th>
                <th className="p-4 font-semibold text-slate-600">Customer</th>
                <th className="p-4 font-semibold text-slate-600">Item</th>
                <th className="p-4 font-semibold text-slate-600">Status</th>
                <th className="p-4 font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-400">Loading mission data...</td></tr>
              ) : rentals.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-sm text-slate-500">#{order.id}</td>
                  <td className="p-4 font-medium text-brand-dark">User {order.user_id}</td>
                  <td className="p-4 text-brand-pink font-bold">{order.item_name}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                      ${order.status === 'active' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${order.status === 'delivered' ? 'bg-blue-100 text-blue-800' : ''}
                      ${order.status === 'returned' ? 'bg-green-100 text-green-800' : ''}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {/* STAFF BUTTONS */}
                    {order.status === 'active' && (
                      <button 
                        onClick={() => updateStatus(order.id, 'delivered')}
                        className="text-xs bg-brand-dark text-white px-3 py-1.5 rounded hover:bg-slate-700"
                      >
                        Mark Delivered
                      </button>
                    )}
                    {order.status === 'delivered' && (
                      <button 
                        onClick={() => updateStatus(order.id, 'returned')}
                        className="text-xs bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600"
                      >
                        Confirm Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {rentals.length === 0 && !loading && (
            <div className="p-12 text-center text-slate-400">
              <Package size={48} className="mx-auto mb-4 opacity-50" />
              No active orders right now. Time for tea! ☕
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
