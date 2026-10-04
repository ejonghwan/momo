import React from 'react';

import clsx from 'clsx';

import style from '@/styles/common/UxSidebar.module.scss';

interface Props {
  children?: React.ReactNode;
  className?: string;
  isActive: boolean;
}
// isPrimary && 'btn-primary',
const UxSide = ({ children, isActive }: Props) => {
  return (
    <div className={style['sidebar__wrap']}>
      <div className={clsx(style['sidebar__content'], isActive && style['active'])}>
        <div className={style['sidebar__inner']}>{children}</div>
      </div>
      <div className={style['sidebar__dimd']}></div>
    </div>
  );
};

export default UxSide;
