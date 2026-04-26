"use client"

import React from 'react'
import LoginButton from '@/components/style-ui/user/LoginButton'
import LoginButtonKaKao from '@/components/style-ui/user/LoginButtonKaKao'
import LogoutButton from '@/components/style-ui/user/LogoutButton'
import { useUserStore } from '@/store/front/useUserStore'


const UserInfo = () => {

   const user = useUserStore((state) => state.user);
   const isInitialized = useUserStore((state) => state.isInitialized);

   if (!isInitialized) {
      return (
         <div className="loading-container">
            {/* <Skeleton width="50px" height="50px" borderRadius="50%" />
           <p>사용자 정보를 확인하고 있습니다...</p> */}
         </div>
      );
   }


   if (isInitialized && !user) {
      return (
         <div>
            <LoginButton />
            <LoginButtonKaKao />
            로그인이 필요합니다.
         </div>
      )
   }


   if (isInitialized && user) {
      return (
         <>
            {user.user_metadata?.avatar_url && (
               <>
                  {/* <Skeleton width={"50px"} height={"50px"} borderRadius={"50%"} /> */}
                  <div>{user && <LogoutButton />}</div>
                  <img src={user.user_metadata.avatar_url} alt="profile" width={50} />
                  <div>{user.user_metadata.email}</div>
                  <div>{user.user_metadata.full_name}</div>
                  <div>{user.app_metadata.provider}</div>
               </>
            )}
         </>
      )
   }
}

export default UserInfo