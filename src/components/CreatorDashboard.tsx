import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Clock, Wallet, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';
import { cn } from '../lib/utils';

interface CreatorDashboardProps {
  profile: UserProfile | null;
}

const DATA = [
  { day: 'Mon', calls: 12, earnings: 450 },
  { day: 'Tue', calls: 8, earnings: 320 },
  { day: 'Wed', calls: 15, earnings: 600 },
  { day: 'Thu', calls: 20, earnings: 850 },
  { day: 'Fri', calls: 18, earnings: 700 },
  { day: 'Sat', calls: 25, earnings: 1100 },
  { day: 'Sun', calls: 22, earnings: 950 },
];

export default function CreatorDashboard({ profile }: CreatorDashboardProps) {
  if (!profile?.isCreator) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6"
      >
        <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center">
          <Users className="w-12 h-12 text-brand-primary" />
        </div>
        <div className="max-w-md">
          <h2 className="text-3xl font-black mb-4">Become a Creator</h2>
          <p className="text-gray-400 mb-8">Share your energy, chat with followers, and earn coins for every minute you spend on live calls.</p>
          <button className="bg-brand-primary px-10 py-4 rounded-2xl font-black shadow-lg shadow-brand-primary/20 hover:scale-105 transition-transform">
            APPLY TO JOIN
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 pb-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Earnings', value: '45,200', icon: Wallet, color: '#00FF95', suffix: '🪙' },
          { label: 'Active Calls', value: '1,420', icon: Clock, color: '#FF0099', suffix: 'min' },
          { label: 'Followers', value: '12.5k', icon: Users, color: '#4932FF', suffix: '' },
          { label: 'KYC Status', value: 'Verified', icon: CheckCircle2, color: '#FFD700', suffix: '' },
        ].map((stat, i) => (
          <div key={i} className="vibrant-glass p-8 rounded-3xl border border-white/10 group overflow-hidden relative">
            <div className="absolute -bottom-4 -right-4 transition-transform group-hover:scale-110">
              <stat.icon className="w-20 h-20 text-white/5" />
            </div>
            <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-2">{stat.label}</p>
            <h4 className="text-2xl font-black flex items-baseline gap-1" style={{ color: stat.color }}>
              {stat.value} <span className="text-xs opacity-50">{stat.suffix}</span>
            </h4>
          </div>
        ))}
      </div>

      <div className="vibrant-glass p-8 rounded-[40px]">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="text-brand-accent w-5 h-5" />
              Earnings Insights
            </h3>
            <p className="text-sm text-white/40">Weekly performance summary</p>
          </div>
          <div className="flex gap-2">
            <button className="vibrant-pill px-4 py-1.5 rounded-lg text-xs font-bold bg-white/10">7D</button>
            <button className="vibrant-pill px-4 py-1.5 rounded-lg text-xs font-bold text-gray-400">30D</button>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FF95" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00FF95" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="day" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A0B2E', border: '1px solid #ffffff10', borderRadius: '16px' }}
                itemStyle={{ color: '#00FF95' }}
              />
              <Area 
                type="monotone" 
                dataKey="earnings" 
                stroke="#00FF95" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorEarnings)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
