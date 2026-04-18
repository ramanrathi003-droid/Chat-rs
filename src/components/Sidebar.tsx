import { Home, Wallet, LayoutDashboard, Users, Settings, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'feed', label: 'Feed', icon: Home, color: '#FF0099' },
    { id: 'wallet', label: 'Wallet History', icon: Wallet, color: '#4932FF' },
    { id: 'creator', label: 'Creator Studio', icon: LayoutDashboard, color: '#00FF95' },
    { id: 'refer', label: 'Refer & Earn', icon: Users, color: '#FFD700' },
    { id: 'settings', label: 'Settings', icon: Settings, color: '#FF4B2B' },
  ];

  return (
    <aside className="w-[300px] h-full bg-white/5 border-r border-white/10 p-8 flex flex-col">
      <div className="text-3xl font-black mb-12 tracking-tighter vibrant-gradient-text px-4">
        CHAT RS
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300",
              activeTab === item.id 
                ? "bg-white/10 text-white" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="w-6 h-6" style={{ color: activeTab === item.id ? item.color : 'inherit' }} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto p-5 bg-white/[0.03] rounded-3xl border border-white/5">
        <div className="text-[10px] font-black text-white/40 uppercase mb-2 tracking-widest">Security Status</div>
        <div className="flex items-center gap-2 text-sm text-brand-accent font-bold">
          <ShieldCheck className="w-4 h-4" />
          E2E Encrypted
        </div>
      </div>
    </aside>
  );
}
