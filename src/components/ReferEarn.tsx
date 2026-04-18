import { motion } from 'motion/react';
import { Gift, Copy, Share2 } from 'lucide-react';

export default function ReferEarn() {
  const code = "CHATRS-GOLD";
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto py-10"
    >
      <div className="bg-gold/10 border border-gold/30 p-12 rounded-[50px] text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        
        <motion.div 
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-block"
        >
          <Gift className="w-20 h-20 text-gold" />
        </motion.div>

        <div>
          <h2 className="text-4xl font-black text-gold mb-4 italic">Spread the Energy!</h2>
          <p className="text-gray-300">Refer a friend & get <span className="text-white font-bold">50 Coins Free!</span> Your friend also gets 50 coins on their first recharge.</p>
        </div>

        <div className="flex flex-col items-center gap-4 pt-4">
          <div className="vibrant-glass p-2 pr-6 rounded-2xl flex items-center gap-4">
            <div className="bg-gold text-[#0F0125] px-6 py-4 rounded-xl font-black text-2xl tracking-[0.2em]">
              {code}
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(code)}
              className="text-gold/60 hover:text-gold transition-colors"
            >
              <Copy className="w-6 h-6" />
            </button>
          </div>
          <button className="bg-gold text-[#0F0125] px-10 py-5 rounded-2xl font-black flex items-center gap-2 hover:scale-105 transition-transform">
            <Share2 className="w-5 h-5" />
            SHARE LINK
          </button>
        </div>
      </div>
    </motion.div>
  );
}
