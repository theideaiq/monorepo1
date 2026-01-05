'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Plus, Check, Youtube } from 'lucide-react';
import { createClient } from '@/lib/supabase/client'; // Your existing Supabase client
import { Button } from '@/components/ui/Button';

export default function JukeboxGuest() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState<string | null>(null);
  
  // Use Supabase directly to add to queue
  const supabase = createClient();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.items || []);
    setLoading(false);
  };

  const addToQueue = async (video: any) => {
    setCooldown(video.id);
    
    await supabase.from('jukebox_queue').insert({
      video_id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      status: 'pending'
    });

    setTimeout(() => setCooldown(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">
      {/* Header */}
      <div className="p-6 text-center border-b border-white/10">
        <h1 className="text-3xl font-black flex items-center justify-center gap-2">
          <Youtube className="text-red-600" size={32} /> IDEA <span className="text-white">Jukebox</span>
        </h1>
        <p className="text-gray-400 text-sm mt-2">Search & Add to the Room Queue</p>
      </div>

      {/* Search */}
      <div className="p-4 sticky top-0 bg-[#0f0f0f] z-10">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search YouTube..." 
            className="flex-1 bg-[#1f1f1f] border border-white/10 rounded-full px-6 h-12 text-white focus:outline-none focus:border-red-600"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" className="rounded-full w-12 h-12 bg-red-600 hover:bg-red-700 p-0 flex items-center justify-center">
            {loading ? "..." : <Search size={20} />}
          </Button>
        </form>
      </div>

      {/* Results */}
      <div className="p-4 space-y-4 pb-20">
        {results.map((video) => (
          <div key={video.id} className="flex gap-4 items-center bg-[#1f1f1f] p-3 rounded-xl hover:bg-[#2f2f2f] transition">
            <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0">
              <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: video.title }}></h3>
              <p className="text-xs text-gray-400 mt-1">{video.channel}</p>
            </div>
            <button 
              onClick={() => addToQueue(video)}
              disabled={cooldown === video.id}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition ${cooldown === video.id ? 'bg-green-500' : 'bg-white/10 hover:bg-white/20'}`}
            >
              {cooldown === video.id ? <Check size={18} /> : <Plus size={20} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
