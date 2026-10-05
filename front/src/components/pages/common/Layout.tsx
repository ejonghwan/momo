import React from 'react';

import style from '@/styles/common/Layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className={style['layout__wrap']}>{children}</div>;
};

export default Layout;
