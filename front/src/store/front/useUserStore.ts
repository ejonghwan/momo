import { create } from 'zustand'
import { User } from '@supabase/supabase-js'

interface UserState {
   user: User | null;
   isInitialized: boolean;
   setUser: (user: User | null) => void
}

export const useUserStore = create<UserState>((set) => ({
   user: null,
   isInitialized: false,
   setUser: (user) => set({ user, isInitialized: true }),
}))