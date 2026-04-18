import { motion, AnimatePresence } from 'motion/react';
import { Video, Mic, PhoneOff, Gift, MoreHorizontal, Camera, MicOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CreatorProfile } from '../types';

interface CallScreenProps {
  creator: CreatorProfile;
  type: 'voice' | 'video';
  onClose: () => void;
}

export default function CallScreen({ creator, type, onClose }: CallScreenProps) {
  const [coinsDeducted, setCoinsDeducted] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
      if (seconds > 0 && seconds % 60 === 0) {
        setCoinsDeducted(c => c + creator.ratePerMinute);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, creator.ratePerMinute]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#0F0125]/95 backdrop-blur-2xl flex flex-col"
    >
      <div className="flex-1 relative flex items-center justify-center">
        {type === 'video' ? (
          <div className="w-full h-full relative">
            <img 
              src={creator.photoURL} 
              className="w-full h-full object-cover opacity-60" 
              alt="Remote Video" 
              referrerPolicy="no-referrer"
            />
            {/* Self preview absolute bottom right */}
            <div className="absolute bottom-32 right-8 w-40 h-56 rounded-3xl border-2 border-white/20 overflow-hidden bg-black shadow-2xl">
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <Camera className="text-gray-700 w-8 h-8" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-40 h-40 rounded-full border-4 border-brand-accent p-2"
            >
              <img src={creator.photoURL} className="w-full h-full rounded-full" alt="Avatar" referrerPolicy="no-referrer" />
            </motion.div>
            <div className="text-center">
              <h2 className="text-3xl font-black">{creator.displayName}</h2>
              <p className="text-brand-accent font-bold uppercase tracking-widest text-sm mt-2">1:1 Voice Call</p>
            </div>
          </div>
        )}

        <div className="absolute top-10 left-10 flex flex-col gap-2">
          <div className="vibrant-pill px-4 py-2 rounded-full font-bold text-sm">
            {formatTime(seconds)}
          </div>
          <div className="vibrant-pill px-4 py-2 rounded-full font-bold text-sm text-gold scale-95 opacity-80">
             Deducted: -{coinsDeducted + (seconds > 0 ? creator.ratePerMinute : 0)} 🪙
          </div>
        </div>
      </div>

      <div className="h-32 bg-white/5 border-t border-white/10 flex items-center justify-center gap-10 px-8">
        <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <MicOff className="w-6 h-6" />
        </button>
        <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <Gift className="w-6 h-6 text-gold" />
        </button>
        <button 
          onClick={onClose}
          className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-all hover:scale-110 shadow-lg shadow-red-600/30"
        >
          <PhoneOff className="w-8 h-8 text-white" />
        </button>
        <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <Video className="w-6 h-6 text-brand-accent" />
        </button>
        <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
}
