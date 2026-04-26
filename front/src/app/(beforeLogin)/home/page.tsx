"use client"


import React, { useEffect, useState } from "react";
import { useUserStore } from '@/store/front/useUserStore'
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import LoginButtonKaKao from "@/components/LoginButtonKaKao";
import Skeleton from "@/components/style-ui/common/Skeleton";

const HomePage = () => {

  const user = useUserStore((state) => state.user);
  const isInitialized = useUserStore((state) => state.isInitialized);
  // const isLoggedIn = !!user; // 유저 정보가 있으면 true


  // const useIsMounted = () => {
  //   const [mounted, setMounted] = useState(false);
  //   useEffect(() => {
  //     setTimeout(() => { setMounted(true) }, 1000)
  //   }, []);
  //   return mounted;
  // };

  // const is = useIsMounted()


  useEffect(() => {
    console.log(user)
  }, [])


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


};

export default HomePage;
