'use client';

import React from 'react';
import {
  PiAlienDuotone,
  PiArrowRightBold,
  PiDotsThreeOutlineFill,
  PiGithubLogoDuotone,
  PiGraphDuotone,
  PiPawPrintDuotone,
  PiPolygonDuotone,
  PiPulseDuotone,
  PiQuotesDuotone,
  PiSignOutBold,
} from 'react-icons/pi';

import { IconButton, Link } from '@radix-ui/themes';
import clsx from 'clsx';

import UxButton from '@/components/style-ui/common/UxButton';
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
  pageName?: string;
}

const Header = ({ children, uiType = 'main', pageName }: HeaderProps) => {
  const isSideActive = useUserStore((state) => state.isHeaderSide);
  const setIsHeaderSide = useUserStore((state) => state.setIsHeaderSide);

  const handleShowSidbar = () => {
    setIsHeaderSide(!isSideActive);
  };

  if (uiType === 'main') {
    return (
      <div className={`${style['header__wrap']} ${style['main']}`}>
        {children ? (
          <header id={style['header']}>{children}</header>
        ) : (
          <header id={style['header']}>
            <div className={style['header__inner']}>
              <div style={{ width: '40rem', height: '40rem' }}>
                <LogoutButton />
              </div>
              {pageName && (
                <div>
                  <UxText variant={'C_15_M'}>{pageName}</UxText>
                </div>
              )}
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
            <HeaderSide />
          </header>
        )}
      </div>
    );
  }

  if (uiType === 'sub') {
    return (
      <div className={`${style['header__wrap']} ${style['sub']}`}>
        {children ? (
          <header id={style['header']}>{children}</header>
        ) : (
          <header id={style['header']}>
            <div className={style['header__inner']}>
              <div className={style['header__logo']}>
                {/* <PiQuotesDuotone size={'40rem'} /> */}
                {/* <PiPulseDuotone size={'40rem'} /> */}
                {/* <PiPolygonDuotone size={'40rem'} /> */}
                {/* <PiPawPrintDuotone size={'40rem'} /> */}
                {/* <PiGraphDuotone size={'30rem'} color="blue" /> */}
                <Link href={'/'}>
                  <PiGithubLogoDuotone size={'30rem'} color="#e9eaec" />
                </Link>
              </div>
              {pageName && (
                <div>
                  <UxText variant={'C_15_M'} className="text_gray_700">
                    {pageName}
                  </UxText>
                </div>
              )}
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
            <HeaderSide />
          </header>
        )}
      </div>
    );
  }
};

export default Header;

const HeaderSide = () => {
  const user = useUserStore((state) => state.user);
  const isSideActive = useUserStore((state) => state.isHeaderSide);
  const setIsHeaderSide = useUserStore((state) => state.setIsHeaderSide);

  return (
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
        <li>
          {/* <UxButton isPure>
                  asdasd
              </UxButton> */}
          <Link href="/userinfo" className={style['header__menu__item']}>
            <PiAlienDuotone size={24} />
            <UxText variant={'C_15_R'}>내 정보</UxText>
          </Link>
        </li>
        <li>
          <Link href="/userinfo" className={style['header__menu__item']}>
            <PiAlienDuotone size={24} />
            <UxText variant={'C_15_R'}>생성하기</UxText>
          </Link>
        </li>
        <li>
          <Link href="/userinfo" className={style['header__menu__item']}>
            <PiAlienDuotone size={24} />
            <UxText variant={'C_15_R'}>생성하기</UxText>
          </Link>
        </li>
        <li>
          <Link href="/userinfo" className={style['header__menu__item']}>
            <PiAlienDuotone size={24} />
            <UxText variant={'C_15_R'}>생성하기</UxText>
          </Link>
        </li>
        <li>
          <Link href="/userinfo" className={style['header__menu__item']}>
            <PiAlienDuotone size={24} />
            <UxText variant={'C_15_R'}>생성하기</UxText>
          </Link>
        </li>
        <li>
          <Link href="/userinfo" className={style['header__menu__item']}>
            <PiSignOutBold size={24} />
            <UxText variant={'C_15_R'}>로그아웃</UxText>
          </Link>
        </li>
      </ul>
    </UxSide>
  );
};
