import { User as FirebaseUser } from 'firebase/auth';

export type KYCStatus = 'pending' | 'verified' | 'rejected' | 'none';
export type TransactionType = 'purchase' | 'spend' | 'payout' | 'referral';
export type TransactionStatus = 'pending' | 'completed' | 'failed';
export type CallStatus = 'ongoing' | 'completed' | 'missed';
export type CallType = 'voice' | 'video';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  coins: number;
  isCreator: boolean;
  kycStatus: KYCStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreatorProfile {
  userId: string;
  displayName: string;
  photoURL?: string;
  bio: string;
  ratePerMinute: number;
  isOnline: boolean;
  rating: number;
  totalMinutes: number;
  earnings: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  coins: number;
  type: TransactionType;
  status: TransactionStatus;
  metadata?: any;
  createdAt: string;
}

export interface CallLog {
  id: string;
  callerId: string;
  receiverId: string;
  startTime: string;
  endTime?: string;
  durationSeconds?: number;
  costCoins?: number;
  status: CallStatus;
  type: CallType;
}

export interface AuthState {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
}
