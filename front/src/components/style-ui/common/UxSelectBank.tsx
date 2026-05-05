// import React, { useState } from 'react';

import clsx from 'clsx';

import { Banks } from '@/types/user/UserType';

import style from '@/styles/common/UxSelectBank.module.scss';

// --------------------------------------------------- UxSelectBankWrap [S]

interface UxSelectBankWrapProps {
  children: React.ReactNode;
  classNames?: string;
  // isOne: boolean; // 하나만 선택하게 할건지. 기본 다중선택 + 토글
}

export const UxSelectBankWrap = ({ children, classNames }: UxSelectBankWrapProps) => {
  return <div className={clsx(style['banklist__wrap'], classNames)}>{children}</div>;
};

// --------------------------------------------------- UxSelectBankWrap [E]

// --------------------------------------------------- UxSelectBank [S]

interface Props {
  data: Banks;
  classNames?: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

export const UxSelectBankItem = ({ data, classNames, isActive = false, onClick }: Props) => {
  return (
    <div
      className={clsx(style['banklist__item'], classNames, {
        [style['banklist__item--active']]: isActive,
      })}
    >
      {onClick ? (
        <>
          <button key={data.id} type={'button'} onClick={(e) => onClick(e, data.id)}>
            {data.bank}
          </button>
        </>
      ) : (
        <>
          <span key={data.id}>{data.bank}</span>
        </>
      )}
    </div>
  );
};

// --------------------------------------------------- UxSelectBank [E]
