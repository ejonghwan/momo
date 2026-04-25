"use client"

import React, { useState } from "react";
import { useUserStore } from '@/store/front/useUserStore'
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import LoginButtonKaKao from "@/components/LoginButtonKaKao";
import Skeleton from "@/components/style-ui/common/Skeleton";

const HomePage = () => {

  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user; // 유저 정보가 있으면 true

  const [loading, setLoading] = useState(false)

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

  return <div>

    {loading ? (
      <>

        {user.user_metadata?.avatar_url && (
          <>
            <div>{user && <LogoutButton />}</div>
            <img src={user.user_metadata.avatar_url} alt="profile" width={50} />
            <div>{user.user_metadata.email}</div>
          </>
        )}</>
    ) : (
      <Skeleton width={"50px"} height={"50px"} borderRadius={"50%"} />
    )}
    before Layoutaa


  </div>
};

export default HomePage;
