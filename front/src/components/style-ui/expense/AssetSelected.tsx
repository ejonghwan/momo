'use client';

import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import { useUserStore } from '@/store/front/useUserStore';
import { Assets } from '@/types/user/UserType';

import style from '@/styles/components/expense/AssetSelected.module.scss';

// interface Props {
//   //   assetsData: Assets[] | undefined;
//   //   isActive: boolean;
// }

const AssetSelected = () => {
  const profile = useUserStore((state) => state.profile);
  const [assetsData, setAssetsData] = useState<Assets[] | []>(profile?.assets || []);
  //  const [assetsData, setAssetsData] = useState<Assets[]>(profile?.assets || []);
  const [selectAsset, setSelectAsset] = useState<Assets[] | []>([]);

  const isActive = true;

  const handleClickAsset = (asset: Assets) => {
    console.log('sele??', asset);

    const isTarget = profile?.assets.some((item) => item.id === asset.id);
    console.log('isTarget???', isTarget);

    if (isActive) setSelectAsset([asset]);
  };

  useEffect(() => {
    console.log('assetsData?????????', assetsData);

    console.log(
      'ho?',
      assetsData?.map((item) => item.name),
    );
  }, [assetsData]);

  //   useEffect(() => {
  //     if (profile) {
  //       setAssetsData(profile?.assets);
  //     }
  //   }, [profile]);

  //   if (assetsData && assetsData?.length <= 0) {
  //     return (
  //       <div>
  //         카드 등록 안되어있음
  //         <br />
  //         <button type="button">등록하러가기</button>
  //       </div>
  //     );
  //   }

  return (
    <div className={style['asset__select__wrap']}>
      ???
      {profile?.assets.map((item) => (
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
      ))}
      <div>
        선택됨: <br />
        {selectAsset.map((item) => item.name)}
      </div>
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

export default AssetSelected;
