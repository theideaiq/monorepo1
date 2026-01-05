'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { SkipForward, Disc3, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Hidden Player (Audio Engine)
const ReactPlayer = dynamic(() => import('react-player'), { 
  ssr: false,
}) as any;

export default function JukeboxHost() {
  const [queue, setQueue] = useState<any[]>([]);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // Required to unlock audio on browsers
  
  const supabase = createClient();

  // 1. Setup Realtime
  useEffect(() => {
    const fetchQueue = async () => {
      const { data } = await supabase
        .from('jukebox_queue')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });
      if (data) setQueue(data);
    };

    fetchQueue();

    const channel = supabase
      .channel('jukebox_queue')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'jukebox_queue' }, (payload) => {
        setQueue((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // 2. Autoplay Logic
  useEffect(() => {
    if (!currentVideo && queue.length > 0) {
      playNext();
    }
  }, [queue, currentVideo]);

  const playNext = async () => {
    if (queue.length === 0) {
      setCurrentVideo(null);
      setIsPlaying(false);
      return;
    }
    const next = queue[0];
    const remaining = queue.slice(1);
    setCurrentVideo(next);
    setQueue(remaining);
    await supabase.from('jukebox_queue').update({ status: 'played' }).eq('id', next.id);
  };

  // 3. Unlock Audio Button (Browsers block audio until you click once)
  if (!hasInteracted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <button 
          onClick={() => setHasInteracted(true)}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-8 shadow-2xl transition transform hover:scale-110"
        >
          <Play size={48} fill="currentColor" />
        </button>
        <p className="mt-4 text-gray-400 font-mono uppercase tracking-widest">Click to Start Jukebox</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-hidden font-sans relative flex flex-col">
      
      {/* BACKGROUND GLOW */}
      {currentVideo && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={currentVideo.thumbnail} 
            alt="bg" 
            fill 
            className="object-cover opacity-20 blur-3xl scale-110" 
          />
        </div>
      )}

      {/* --- INVISIBLE AUDIO PLAYER --- */}
      <div className="hidden">
        <ReactPlayer
          key={currentVideo?.video_id || 'empty'}
          // ✅ Corrected URL Syntax
          url={currentVideo ? `https://www.youtube.com/watch?v=${currentVideo.video_id}` : ''}
          playing={true}
          muted={false} // We want sound now!
          width="0"
          height="0"
          onEnded={playNext}
          onStart={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={(e: any) => console.error(e)}
        />
      </div>

      {/* --- MAIN STAGE (Vinyl) --- */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-8">
        
        {/* The Vinyl Record */}
        <motion.div 
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="relative w-64 h-64 md:w-96 md:h-96 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.8)] border-4 border-gray-800 bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Vinyl Grooves Texture */}
          <div className="absolute inset-0 rounded-full border-[20px] border-neutral-900 opacity-50 pointer-events-none"></div>
          <div className="absolute inset-0 rounded-full border-[60px] border-neutral-800 opacity-30 pointer-events-none"></div>
          
          {/* Album Art (Center Label) */}
          <div className="relative w-1/2 h-1/2 rounded-full overflow-hidden border-4 border-neutral-950 shadow-inner">
            {currentVideo ? (
               <Image src={currentVideo.thumbnail} alt="art" fill className="object-cover" />
            ) : (
               <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                 <Disc3 className="text-neutral-600" size={48} />
               </div>
            )}
          </div>
        </motion.div>

        {/* Now Playing Text */}
        <div className="mt-12 text-center space-y-2 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            {currentVideo?.title || "Jukebox Ready"}
          </h1>
          <p className="text-xl text-red-500 font-bold uppercase tracking-widest">
            {isPlaying ? "Now Spinning" : "Queue Empty"}
          </p>
        </div>
      </div>

      {/* --- UP NEXT QUEUE --- */}
      <div className="bg-black/40 backdrop-blur-md border-t border-white/5 p-6 h-48 relative z-20">
         <div className="max-w-4xl mx-auto h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Up Next ({queue.length})</h3>
              {currentVideo && (
                <button 
                  onClick={playNext} 
                  className="flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition"
                >
                  <SkipForward size={14} /> Skip Track
                </button>
              )}
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {queue.length === 0 ? (
                <div className="text-gray-500 text-sm italic w-full text-center mt-4">No requests pending...</div>
              ) : (
                queue.map((item, i) => (
                  <div key={item.id} className="min-w-[200px] p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition group">
                    <div className="relative h-24 rounded-lg overflow-hidden mb-2">
                       <Image src={item.thumbnail} alt="thumb" fill className="object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                    <p className="text-sm font-bold truncate">{item.title}</p>
                    <p className="text-xs text-gray-400">#{i + 1} in queue</p>
                  </div>
                ))
              )}
            </div>
         </div>
      </div>

    </div>
  );
}
