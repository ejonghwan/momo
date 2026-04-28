import React from 'react';

import style from '@/app/guide/guide.module.scss';

const GuidePage = ({ children }: { children: React.ReactNode }) => {
  return <div className={style['guide__wrap']}>asdasd{children}</div>;
};

export default GuidePage;
