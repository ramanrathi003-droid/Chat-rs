import { motion } from 'motion/react';
import { Plus, History, ArrowUpRight, ArrowDownLeft, Coins } from 'lucide-react';
import { UserProfile, Transaction } from '../types';
import { cn } from '../lib/utils';

interface WalletViewProps {
  profile: UserProfile | null;
}

const MOCK_TXS: Transaction[] = [
  { id: '1', userId: 'me', amount: 100, coins: 200, type: 'purchase', status: 'completed', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '2', userId: 'me', amount: 0, coins: -50, type: 'spend', status: 'completed', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', userId: 'me', amount: 0, coins: 50, type: 'referral', status: 'completed', createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export default function WalletView({ profile }: WalletViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-10"
    >
      <div className="balance-card-gradient p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
        
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <p className="text-white/70 text-sm font-bold uppercase tracking-wider mb-2">Available Wallet Balance</p>
            <h2 className="text-6xl font-black">{profile?.coins || 0} Coins</h2>
            <div className="mt-6 flex items-center gap-4">
              <button className="bg-white text-brand-secondary px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 transition-transform">
                <Plus className="w-5 h-5" />
                ADD COINS
              </button>
              <p className="text-white/60 text-xs font-bold uppercase italic">Current Rate: 10 Coins = ₹5</p>
            </div>
          </div>
          <motion.div 
            animate={{ rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Coins className="w-32 h-32 text-white/15" />
          </motion.div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-brand-primary" />
          <h3 className="text-xl font-bold">Transaction History</h3>
        </div>

        <div className="space-y-3">
          {MOCK_TXS.map((tx) => (
            <div key={tx.id} className="vibrant-glass p-5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.07] transition-all">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  tx.type === 'spend' ? "bg-red-500/10 text-red-500" : "bg-brand-accent/10 text-brand-accent"
                )}>
                  {tx.type === 'spend' ? <ArrowUpRight /> : <ArrowDownLeft />}
                </div>
                <div>
                  <h4 className="font-bold capitalize">{tx.type} {tx.type === 'purchase' ? 'Success' : ''}</h4>
                  <p className="text-xs text-white/40">{new Date(tx.createdAt).toLocaleDateString()} • {new Date(tx.createdAt).toLocaleTimeString()}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={cn(
                  "font-black text-lg",
                  tx.coins > 0 ? "text-brand-accent" : "text-white"
                )}>
                  {tx.coins > 0 ? '+' : ''}{tx.coins} 🪙
                </div>
                <div className="text-[10px] uppercase font-black text-white/30 tracking-widest">{tx.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
