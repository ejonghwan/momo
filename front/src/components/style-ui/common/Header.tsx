'use client';

import React from 'react';

import style from '@/styles/common/Header.module.scss';

// import style from '@/styles/components/'

interface HeaderProps {
  uiType: 'main' | 'sub';
  children: React.ReactNode;
}

const Header = ({ children, uiType = 'main' }: HeaderProps) => {
  if (uiType === 'main') {
    <div className={`${style['header__wrap']} ${style['main']}`}>
      <header></header>
    </div>;
  }

  return (
    <div className={`${style['header__wrap']} ${style['sub']}`}>
      <header>{children}</header>
    </div>
  );
};

export default Header;
