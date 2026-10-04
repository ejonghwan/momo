'use client';

import React from 'react';
import { PiArrowRightBold, PiDotsThreeOutlineFill } from 'react-icons/pi';

import { IconButton } from '@radix-ui/themes';
import clsx from 'clsx';

import UxSide from '@/components/style-ui/common/UxSide';
import { UxText } from '@/components/style-ui/common/UxText';
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
  const isSideActive = useUserStore((state) => state.isHeaderSide);
  const setIsHeaderSide = useUserStore((state) => state.setIsHeaderSide);

  const handleShowSidbar = () => {
    console.log('side bar open');
    setIsHeaderSide(!isSideActive);
  };

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
                <IconButton onClick={handleShowSidbar} radius="full" variant="soft">
                  <PiDotsThreeOutlineFill />
                </IconButton>
                {/* <UserInfo /> */}
                {/* <UserAvatar
                  avatartUrl={user?.user_metadata.avatar_url as string}
                  nextImgHeight="30rem"
                  nextImgWidth="30rem"
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                /> */}
              </div>
            </div>
          </header>
        )}
        <UxSide isActive={isSideActive}>
          <ul className={style['header__side']}>
            <li>
              <div className={style['header__userInfo']}>
                <UserAvatar
                  avatartUrl={user?.user_metadata.avatar_url as string}
                  nextImgHeight="30rem"
                  nextImgWidth="30rem"
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
                <UxText variant={'C_13_M'}>{user?.user_metadata.full_name}</UxText>
                <div
                  className={clsx(
                    style['user__info__wrap--provider'],
                    user?.app_metadata.provider?.slice(0, 1) === 'g' ? 'g' : 'k',
                  )}
                >
                  {user?.app_metadata.provider?.slice(0, 999)}
                </div>
              </div>
              <IconButton onClick={() => setIsHeaderSide(false)} radius="full" variant="soft">
                <PiArrowRightBold />
              </IconButton>
            </li>
            <li>s</li>
            <li>asdasd</li>
          </ul>
        </UxSide>
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
