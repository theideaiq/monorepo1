'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { SkipForward, Play, Volume2, VolumeX, Radio, Disc3, Mic2, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

export default function JukeboxHost() {
  const [queue, setQueue] = useState<any[]>([]);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  // AUDIO FIX: Start muted to allow mobile autoplay, then manually unmute
  const [isMuted, setIsMuted] = useState(true); 
  const [volume, setVolume] = useState(1);

  const supabase = createClient();

  useEffect(() => {
    fetchQueue();
    const channel = supabase
      .channel('jukebox_queue')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'jukebox_queue' }, (payload) => {
        setQueue((prev) => [...prev, payload.new]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    if (isReady && !currentVideo && queue.length > 0) {
      playNext();
    }
  }, [queue, currentVideo, isReady]);

  const fetchQueue = async () => {
    const { data } = await supabase
      .from('jukebox_queue')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });
    if (data) setQueue(data);
  };

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

  // --- START SCREEN ---
  if (!isReady) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="relative z-10 text-center space-y-8">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }} 
             animate={{ scale: 1, opacity: 1 }}
             className="w-32 h-32 bg-brand-pink rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(233,30,99,0.5)] cursor-pointer hover:scale-105 transition-transform"
             onClick={() => setIsReady(true)}
           >
              <Play size={48} fill="white" className="ml-2" />
           </motion.div>
           <div>
             <h1 className="text-4xl font-black tracking-tighter mb-2">IDEA JUKEBOX</h1>
             <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Tap to Initialize System</p>
           </div>
        </div>
      </div>
    );
  }

  return (
    // ✅ FIX: Added 'pt-20' so the UI doesn't hide behind the navbar
    <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans text-white flex flex-col md:flex-row pt-20">
      
      {/* === BACKGROUND PLAYER (Audio Source) === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full relative opacity-40">
           <ReactPlayer
             key={currentVideo?.video_id || 'empty'}
             url={currentVideo ? `https://www.youtube.com/watch?v=${currentVideo.video_id}` : ''}
             playing={true}
             volume={volume}
             // ✅ CRITICAL FIX: Controlled by state. Starts true (muted) so video plays, then you click to unmute.
             muted={isMuted}
             playsinline={true}
             width="100%"
             height="100%"
             style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
             onEnded={playNext}
             onStart={() => setIsPlaying(true)}
             onPause={() => setIsPlaying(false)}
             config={{ youtube: { playerVars: { controls: 0, showinfo: 0, disablekb: 1, playsinline: 1 } } }}
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60 backdrop-blur-sm"></div>
      </div>

      {/* === LEFT PANEL (Vinyl) === */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 min-h-[50vh] md:min-h-full border-r border-white/5">
         
         <motion.div 
           animate={{ rotate: isPlaying ? 360 : 0 }}
           transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
           className="relative w-64 h-64 md:w-[450px] md:h-[450px] rounded-full shadow-2xl border-8 border-slate-900 bg-black flex items-center justify-center"
         >
           {/* Vinyl Textures */}
           <div className="absolute inset-0 rounded-full border-[2px] border-white/10 opacity-50"></div>
           <div className="absolute inset-0 rounded-full border-[40px] border-neutral-900/80 pointer-events-none"></div>
           
           <div className="relative w-[35%] h-[35%] rounded-full overflow-hidden border-4 border-slate-950 shadow-inner z-20 bg-brand-dark">
             {currentVideo ? (
                <Image src={currentVideo.thumbnail} alt="art" fill className="object-cover" />
             ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600"><Disc3 size={48} /></div>
             )}
           </div>
         </motion.div>

         <div className="mt-8 text-center space-y-4 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-lg">
              {currentVideo?.title || "Jukebox Ready"}
            </h1>
            {/* MANUAL UNMUTE BUTTON (Required for Mobile) */}
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold uppercase tracking-widest transition-all ${isMuted ? 'bg-red-600 animate-pulse text-white' : 'bg-white/10 text-slate-400'}`}
            >
              {isMuted ? <><VolumeX size={18} /> TAP TO UNMUTE</> : <><Volume2 size={18} /> AUDIO ON</>}
            </button>
         </div>
      </div>

      {/* === RIGHT PANEL (Queue) === */}
      <div className="relative z-10 w-full md:w-[400px] bg-slate-950/80 border-l border-white/5 backdrop-blur-xl flex flex-col h-[40vh] md:h-full">
         <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
           <div className="flex items-center gap-3">
             <Radio className="text-brand-pink" size={20} />
             <h2 className="font-bold text-sm uppercase tracking-widest">Up Next</h2>
             <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full text-slate-400">{queue.length}</span>
           </div>
           {currentVideo && (
             <button onClick={playNext} className="text-xs font-bold text-white hover:text-brand-yellow flex items-center gap-2 transition-colors">
               <SkipForward size={14} /> Skip
             </button>
           )}
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
           {queue.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                <Mic2 size={40} className="opacity-20" />
                <p className="text-sm font-medium italic">Queue is empty.</p>
             </div>
           ) : (
             queue.map((item, i) => (
               <div key={item.id} className="group flex gap-3 items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all">
                 <span className="text-slate-500 font-mono text-xs w-4">{i + 1}</span>
                 <div className="relative w-16 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                    <Image src={item.thumbnail} alt="thumb" fill className="object-cover" />
                 </div>
                 <p className="text-sm font-bold text-slate-200 truncate">{item.title}</p>
               </div>
             ))
           )}
         </div>
         
         <div className="p-6 border-t border-white/5 bg-slate-900/90">
            <div className="flex items-center gap-4 text-slate-400">
               <Volume2 size={18} />
               <input 
                 type="range" min="0" max="1" step="0.1" value={volume} 
                 onChange={(e) => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                 className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-pink"
               />
            </div>
         </div>
      </div>
    </div>
  );
}
