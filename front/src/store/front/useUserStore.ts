import { User } from '@supabase/supabase-js';
import { assert, profile } from 'console';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Assets, UserType } from '@/types/user/UserType';

interface UserState {
  user: User | null;
  profile: UserType | null;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserType | null) => void;
  setUserAssets: (newAssets: Assets[] | null) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      profile: null,
      isInitialized: false,
      setUser: (user) => set({ user, isInitialized: true }),
      setUserProfile: (profile) => set({ profile, isInitialized: true }),
      // setUserAssets: (newAssets) => {
      //   return set((state) => {
      //     if (state.profile) {
      //       return { profile: { ...state.profile, assets: newAssets } };
      //     } else {
      //       return {};
      //     }
      //   });
      // },
      // 여기해야댐 은행 초기화
      setUserAssets: (newAssets) =>
        set((state) => (state.profile ? { profile: { ...state.profile, assets: newAssets } } : {})),
    }),
    { name: 'UserStore' },
  ),
);

/*

state는 스토어 객체임 
setUserAssets: (newAssets) => {
    return set((state) => {
      console.log('set state?????????????????????', state);
      return state;
    });
  },
*/

/*
**구글 로그인
동기화 중 : 세션 만료 안됨. 며칠 후에 로그인 해도 자동로그인 되어있음 
동기화 끔 : 세션 만료 안됨. 다만 로그아웃하면 동기화 안되어있을 때 비번 쳐야됨 

그럼 동기화 끊었을 때 세션 만료 수동으로 해줘야될듯 ? 
test 1 : 내꺼에서 로그인상태에서 크롬 로그아웃되면 세션 만료되는지 테스트 (11: 15분 로그아웃)

1시 50분에도 세션만료안됨 


나중에 수정하기

*/
