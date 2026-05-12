'use client';

import React, { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';

import { useUserStore } from '@/store/front/useUserStore';
import { Assets } from '@/types/user/UserType';

import style from '@/styles/components/expense/AssetSelected.module.scss';

interface AssetSelectedWrapProps {
  selectAsset: Assets[];
  setSelectAsset: Dispatch<SetStateAction<Assets[]>>;
}

export const AssetSelectedWrap = ({ selectAsset, setSelectAsset }: AssetSelectedWrapProps) => {
  const profile = useUserStore((state) => state.profile);

  const handleClickAsset = (asset: Assets) => {
    const isTarget = profile?.assets?.some((item) => item.id === asset.id);
    if (isTarget) setSelectAsset([asset]);
  };

  // if (assetsData && assetsData?.length <= 0) {
  //   return (
  //     <div>
  //       에셋 등록 안되어있음
  //       <br />
  //       <button type="button">등록하러가기</button>
  //     </div>
  //   );
  // }

  return (
    <div className={style['asset__select__wrap']}>
      {/* 여기 유닉키 오류남 */}
      {/* 그리고 에셋 수정 추가 스토어 업데이트 안되는 이유  */}
      ???
      {profile?.assets?.map((ass) => {
        return (
          <React.Fragment key={ass.id}>
            <AssetSelectedItem
              item={ass}
              handleClickAsset={handleClickAsset}
              isActive={selectAsset?.some((item) => item.id === ass.id)}
            />
          </React.Fragment>
        );
      })}
      <div>선택됨: {selectAsset?.map((item) => item.name)}</div>
      {/* {assetsData?.map((item) => (
        <div
          key={item.id}
          className={clsx(style['asset__select__item'], {
            'asset__select__item--active': isActive,
          })}
        >
          <button type="button" onClick={() => handleClickAsset(item)}>
            {item.name}
          </button>
        </div>
      ))} */}
    </div>
  );
};

interface AssetSelectedItemProps {
  item: Assets;
  handleClickAsset: (item: Assets) => void;
  isActive: boolean;
}

export const AssetSelectedItem = ({
  item,
  handleClickAsset,
  isActive = false,
}: AssetSelectedItemProps) => {
  return (
    <div
      className={clsx(style['asset__select__item'], {
        [style['asset__select__item--active']]: isActive,
      })}
    >
      <button type="button" onClick={() => handleClickAsset(item)}>
        {item.name}
      </button>
    </div>
  );
};
