"use client"

import { useUserStore } from '@/store/front/useUserStore';
import React, { useEffect } from 'react'

const LoginPage = () => {

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    console.log('??? user', user)
  }, [])

  return (
    <div>
        로그인 페이지
    </div>
  )
}

export default LoginPage