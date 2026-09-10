'use client';

import React from 'react';

import style from '@/styles/common/Header.module.scss';

// import style from '@/styles/components/'

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <div className={style['header__wrap']}>
      <header>{children}</header>
    </div>
  );
};

export default Header;
