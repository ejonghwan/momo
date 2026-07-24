'use client';

import React from 'react';

import style from 'styled-jsx/style';

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
