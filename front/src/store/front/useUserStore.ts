import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { User } from '@supabase/supabase-js'

interface UserState {
   user: User | null;
   isInitialized: boolean;
   setUser: (user: User | null) => void
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      isInitialized: false,
      setUser: (user) => set({ user, isInitialized: true }),
    }),
    { name: 'UserStore' } // 선택 사항: 데브툴에 표시될 이름
  )
);


/*
**구글 로그인
동기화 중 : 세션 만료 안됨. 며칠 후에 로그인 해도 자동로그인 되어있음 
동기화 끔 : 세션 만료 안됨. 다만 로그아웃하면 동기화 안되어있을 때 비번 쳐야됨 

그럼 동기화 끊었을 때 세션 만료 수동으로 해줘야될듯 ? 
test 1 : 내꺼에서 로그인상태에서 크롬 로그아웃되면 세션 만료되는지 테스트 (11: 15분 로그아웃)

1시 50분에도 세션만료안됨 


나중에 수정하기

*/