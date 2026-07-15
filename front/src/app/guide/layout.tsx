import React from 'react';
import Link from 'next/link';

import style from '@/app/guide/guide.module.scss';

const GuidePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={style['guide__wrap']}>
      <div className={style['guide__header']}>header</div>
      <div className={style['guide__body']}>
        <div className={style['guide__body__side']}>
          <Link href="/guide/text">Text</Link>
          <Link href="/guide/color">Color</Link>
          <Link href="/guide/badge">Badge</Link>
        </div>
        <div className={style['guide__body__wrap']}>
          <div className={style['guide__body__cont']}>{children}</div>
        </div>
      </div>

      <div className={style['guide__footer']}>footer</div>
    </div>
  );
};

export default GuidePage;
