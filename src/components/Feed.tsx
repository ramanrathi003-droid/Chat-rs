import { motion } from 'motion/react';
import { Video, Mic, Search } from 'lucide-react';
import { CreatorProfile } from '../types';
import { cn } from '../lib/utils';

interface FeedProps {
  startCall: (creator: CreatorProfile, type: 'voice' | 'video') => void;
}

const MOCK_CREATORS: CreatorProfile[] = [
  { userId: '1', displayName: 'Aria Sharma', photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aria', bio: 'Let\'s chat about music!', ratePerMinute: 15, isOnline: true, rating: 4.8, totalMinutes: 1200, earnings: 4500 },
  { userId: '2', displayName: 'Kabir Singh', photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kabir', bio: 'Fitness & Life Motivation', ratePerMinute: 10, isOnline: true, rating: 4.9, totalMinutes: 2400, earnings: 8000 },
  { userId: '3', displayName: 'Zoya Khan', photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoya', bio: 'Cooking and Travel tales', ratePerMinute: 25, isOnline: false, rating: 4.7, totalMinutes: 800, earnings: 3000 },
  { userId: '4', displayName: 'Ishaan Verma', photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ishaan', bio: 'Gaming & Tech discussions', ratePerMinute: 12, isOnline: true, rating: 4.6, totalMinutes: 1500, earnings: 5000 },
  { userId: '5', displayName: 'Priya Das', photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', bio: 'Art and Design help', ratePerMinute: 18, isOnline: true, rating: 4.9, totalMinutes: 600, earnings: 2500 },
  { userId: '6', displayName: 'Rohan Mehta', photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan', bio: 'Financial planning 101', ratePerMinute: 30, isOnline: false, rating: 5.0, totalMinutes: 300, earnings: 1500 },
];

export default function Feed({ startCall }: FeedProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Popular Creators</h2>
        <div className="vibrant-pill px-4 py-2 rounded-xl flex items-center gap-2 text-sm text-gray-400">
          <Search className="w-4 h-4" />
          <input type="text" placeholder="Search creators..." className="bg-transparent outline-none text-white italic" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CREATORS.map((creator) => (
          <motion.div
            key={creator.userId}
            whileHover={{ y: -5 }}
            className="vibrant-glass p-6 rounded-3xl relative overflow-hidden group"
          >
            {creator.isOnline && (
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-brand-accent rounded-full animate-pulse shadow-[0_0_10px_#00FF95]" />
                <span className="text-[10px] font-black uppercase text-brand-accent">Online</span>
              </div>
            )}
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white/10 p-1">
                  <img 
                    src={creator.photoURL} 
                    alt={creator.displayName} 
                    className="w-full h-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold">{creator.displayName}</h3>
                <p className="text-sm text-white/50">{creator.bio}</p>
              </div>

              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 py-2 px-3 bg-white/5 rounded-xl text-xs font-bold text-gray-400">
                  {creator.ratePerMinute} Coins/min
                </div>
                <div className="flex-1 py-2 px-3 bg-white/5 rounded-xl text-xs font-bold text-gold">
                  ⭐ {creator.rating}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full pt-2">
                <button 
                  onClick={() => startCall(creator, 'voice')}
                  disabled={!creator.isOnline}
                  className={cn(
                    "flex items-center justify-center gap-2 p-3 rounded-xl font-bold border transition-all",
                    creator.isOnline 
                      ? "border-white/20 hover:bg-white/10 text-white" 
                      : "opacity-30 cursor-not-allowed border-transparent text-gray-500"
                  )}
                >
                  <Mic className="w-4 h-4" />
                  Voice
                </button>
                <button 
                  onClick={() => startCall(creator, 'video')}
                  disabled={!creator.isOnline}
                  className={cn(
                    "flex items-center justify-center gap-2 p-3 rounded-xl font-bold transition-all",
                    creator.isOnline 
                      ? "bg-brand-accent/20 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-[#0F0125] border" 
                      : "opacity-30 cursor-not-allowed bg-white/5 text-gray-500"
                  )}
                >
                  <Video className="w-4 h-4" />
                  Video
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
