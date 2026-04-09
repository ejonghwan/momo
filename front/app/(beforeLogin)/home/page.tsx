"use client"

import React from "react";
import { useUserStore } from '@/store/front/useUserStore'
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import LoginButtonKaKao from "@/components/LoginButtonKaKao";

const HomePage = () => {
 
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user; // 유저 정보가 있으면 true


  
  console.log('user????', user)
  if (!isLoggedIn) {
    return <div>

      {!user && (
        <>
          <LoginButton />
          <LoginButtonKaKao />
        </>
      )}
      로그인이 필요합니다.
    </div>;
  }

  return <div>before Layoutaa
    {user.user_metadata?.avatar_url && (
      <>
        <div>{user &&  <LogoutButton />}</div>
        <img src={user.user_metadata.avatar_url} alt="profile" width={50} />
        <div>{user.user_metadata.email}</div>
      </>
    )}
  </div>
};

export default HomePage;
