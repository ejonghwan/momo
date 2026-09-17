'use client';

import React from 'react';

import LogoutButton from '@/components/style-ui/user/LogoutButton';
import UserAvatar from '@/components/style-ui/user/UserAvatar';
import UserInfo from '@/components/style-ui/user/UserInfo';
import { useUserStore } from '@/store/front/useUserStore';

import style from '@/styles/common/Header.module.scss';

// import style from '@/styles/components/'

interface HeaderProps {
  uiType?: 'main' | 'sub';
  children?: React.ReactNode;
}

const Header = ({ children, uiType = 'main' }: HeaderProps) => {
  const user = useUserStore((state) => state.user);

  if (uiType === 'main') {
    return (
      <div className={`${style['header__wrap']} ${style['main']}`}>
        {children ? (
          <header>{children}</header>
        ) : (
          <header>
            <div className={style['header__inner']}>
              <div>
                <LogoutButton />
              </div>
              <div>
                {/* <UserInfo /> */}
                <UserAvatar
                  avatartUrl={user?.user_metadata.avatar_url as string}
                  nextImgHeight="30rem"
                  nextImgWidth="30rem"
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
            </div>
          </header>
        )}
      </div>
    );
  }

  return (
    <div className={`${style['header__wrap']} ${style['sub']}`}>
      <header>{children}</header>
    </div>
  );
};

export default Header;
