/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Wallet, 
  LayoutDashboard, 
  Users, 
  Settings, 
  Coins, 
  Video, 
  Mic, 
  ShieldCheck, 
  TrendingUp,
  Gift,
  Plus
} from 'lucide-react';
import { auth, signInWithGoogle, db } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { UserProfile, CreatorProfile } from './types';
import { cn } from './lib/utils';

// Components
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import WalletView from './components/WalletView';
import CreatorDashboard from './components/CreatorDashboard';
import ReferEarn from './components/ReferEarn';
import CallScreen from './components/CallScreen';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('feed');
  const [activeCall, setActiveCall] = useState<{ creator: CreatorProfile; type: 'voice' | 'video' } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch or create profile
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          const newProfile: UserProfile = {
            uid: user.uid,
            displayName: user.displayName || 'User',
            email: user.email || '',
            photoURL: user.photoURL || '',
            coins: 50, // Welcome bonus
            isCreator: false,
            kycStatus: 'none',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          await setDoc(userRef, newProfile);
          setProfile(newProfile);
        } else {
          setProfile(userDoc.data() as UserProfile);
          // Listen for coin updates
          onSnapshot(userRef, (doc) => {
            setProfile(doc.data() as UserProfile);
          });
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuth = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Auth failed", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#0F0125]">
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-2xl font-black vibrant-gradient-text"
        >
          CHAT RS
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#0F0125] p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full p-8 rounded-3xl vibrant-glass"
        >
          <h1 className="text-4xl font-black mb-4 vibrant-gradient-text">CHAT RS</h1>
          <p className="text-gray-400 mb-8">Vibrant calls, real connections. Connect with your favorite creators instantly.</p>
          <button 
            onClick={handleAuth}
            className="w-full bg-white text-[#0F0125] py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" referrerPolicy="no-referrer" />
            Continue with Google
          </button>
          <div className="mt-8 flex justify-center gap-4 text-gray-500 text-sm">
            <span>OTP</span>
            <span>Facebook</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#0F0125] font-sans selection:bg-brand-primary selection:text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto px-10 py-8 relative">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-black">
              Hello, {profile?.displayName.split(' ')[0]}! 
              {profile?.kycStatus === 'verified' && (
                <span className="ml-3 px-2 py-0.5 bg-brand-accent text-[#0F0125] text-[10px] font-black rounded uppercase">KYC Verified</span>
              )}
            </h1>
            <p className="text-gray-500 text-sm mt-1">Find your favorite creators and start a call.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="vibrant-pill flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer" onClick={() => setActiveTab('wallet')}>
              <Coins className="text-gold w-5 h-5" />
              <span className="font-bold">{profile?.coins} Coins</span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-brand-primary overflow-hidden">
              <img src={profile?.photoURL || ''} alt="User" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'feed' && <Feed key="feed" startCall={(creator, type) => setActiveCall({ creator, type })} />}
          {activeTab === 'wallet' && <WalletView key="wallet" profile={profile} />}
          {activeTab === 'creator' && <CreatorDashboard key="dashboard" profile={profile} />}
          {activeTab === 'refer' && <ReferEarn key="refer" />}
        </AnimatePresence>

        {activeCall && (
          <CallScreen 
            creator={activeCall.creator} 
            type={activeCall.type} 
            onClose={() => setActiveCall(null)} 
          />
        )}
      </main>
    </div>
  );
}

