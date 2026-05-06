// import React, { useState } from 'react';

import { Dispatch, SetStateAction, useState } from 'react';

import clsx from 'clsx';

import { Banks } from '@/types/user/UserType';

import style from '@/styles/common/UxSelectBank.module.scss';

// --------------------------------------------------- UxSelectBankWrap [S]

interface UxSelectBankWrapProps {
  // children: React.ReactNode;
  data: Banks[];
  classNames?: string;
  isOne?: boolean;
  selectedBank: Banks[];
  setSelectedBank: Dispatch<SetStateAction<Banks[]>>;
}

export const UxSelectBankWrap = ({
  data,
  classNames,
  isOne = false,
  selectedBank,
  setSelectedBank,
}: UxSelectBankWrapProps) => {
  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setSelectedBank((prev) => {
      // 1. 이미 선택된 은행인지 ID로 확인
      const isExist = prev.some((item) => item.id === id);

      if (isOne) {
        // 단일 선택 모드
        if (isExist) return []; // 이미 선택된 거면 해제
        const target = data.find((b) => b.id === id); // 데이터에서 객체 찾기
        return target ? [target] : prev;
      } else {
        // 다중 선택 모드
        if (isExist) {
          return prev.filter((item) => item.id !== id); // 해제
        } else {
          const target = data.find((b) => b.id === id); // 추가
          return target ? [...prev, target] : prev;
        }
      }
    });
    console.log('현재 선택된 ID 목록:', selectedBank);
  };

  return (
    <div className={clsx(style['banklist__wrap'], classNames)}>
      {data?.map((bank) => (
        <UxSelectBankItem
          key={bank.id}
          data={bank}
          // isActive={selectedId === bank.id}
          isActive={selectedBank.some((item) => item.id === bank.id)}
          onClick={handleSelect}
        />
      ))}
    </div>
  );
};

// --------------------------------------------------- UxSelectBankWrap [E]

// --------------------------------------------------- UxSelectBankItem [S]

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

// --------------------------------------------------- UxSelectBankItem [E]
