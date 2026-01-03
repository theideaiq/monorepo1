'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Package, LogOut, User, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/Spinner';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AccountPage() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      // 1. Get User
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUserEmail(user.email || '');

      // 2. Get Their Rentals (Only theirs!)
      const { data } = await supabase
        .from('rentals')
        .select('*')
        .eq('user_id', user.id) // Security filter
        .order('created_at', { ascending: false });
        
      setRentals(data || []);
      setLoading(false);
    };

    getData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    router.push('/');
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-brand-dark">My Account</h1>
            <p className="text-slate-500 flex items-center gap-2">
              <User size={16} /> {userEmail}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Sign Out <LogOut size={16} className="ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Sidebar Menu (Placeholder for future features) */}
          <Card className="p-4 h-fit">
             <nav className="space-y-1">
               <button className="w-full text-left px-4 py-2 bg-brand-pink/10 text-brand-pink font-bold rounded-lg">
                 My Rentals
               </button>
               <button className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                 My Courses
               </button>
               <button className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                 Order History
               </button>
               <button className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                 Settings
               </button>
             </nav>
          </Card>

          {/* Main Content: Rentals List */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-brand-dark">Active Rentals</h2>
            
            {rentals.length === 0 ? (
              <Card className="p-12 text-center text-slate-400 border-dashed">
                <Package size={48} className="mx-auto mb-4 opacity-50" />
                <p>You haven't rented anything yet.</p>
                <Button 
                  className="mt-4" 
                  onClick={() => router.push('/plus')}
                >
                  Browse Catalog
                </Button>
              </Card>
            ) : (
              rentals.map((rental) => (
                <Card key={rental.id} className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                       <Package className="text-slate-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-brand-dark">{rental.item_name}</h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <Clock size={14} /> Rented on {new Date(rental.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge variant={
                      rental.status === 'active' ? 'warning' : 
                      rental.status === 'delivered' ? 'success' : 'neutral'
                    }>
                      {rental.status}
                    </Badge>
                    <p className="text-sm font-bold mt-2">{rental.amount.toLocaleString()} IQD</p>
                  </div>
                </Card>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
