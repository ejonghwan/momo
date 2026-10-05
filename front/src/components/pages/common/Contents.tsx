import React from 'react';

import style from '@/styles/common/Content.module.scss';

interface Props {
  children: React.ReactNode;
}

const Contents = ({ children }: Props) => {
  return (
    <main className={style['contents__wrap']}>
      <div className={style['contents__inner']}>{children}</div>
    </main>
  );
};

export default Contents;
