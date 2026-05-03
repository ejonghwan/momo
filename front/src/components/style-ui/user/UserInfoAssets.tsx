'use client';

import { useState } from 'react';

import { DEFAULT_CATEGORIES } from '@/constants/category';
import { useUserStore } from '@/store/front/useUserStore';
import { Assets, Categorys } from '@/types/user/UserType';
import { generateId } from '@/utils/utils';

interface Props {
  assets: Assets[] | undefined;
}

const UserInfoAssets = ({ assets }: Props) => {
  const profile = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setUserProfile);

  const [isEdit, setisEdit] = useState<boolean>(false);
  const [assetsData, setAssetsData] = useState<Assets[]>(profile?.assets || []);
  const [assetsValue, setAssetsValue] = useState<string>('');

  // 수정
  const handleClickEdit = () => {
    setisEdit((prev) => !prev);
  };

  // 캔슬하면 없애는 로직 다시 수정해야됨 카테고리도
  // 카테고리 켄슬
  const handleClickCancel = () => {
    setisEdit((prev) => !prev);
    setAssetsData(profile?.assets || []);
  };

  // 자산 추가
  const handleClickAddAsset = () => {
    if (!assetsValue.trim()) return alert('자산명을 입력해주세요.');

    // 유저 디비 등록된건 추가못하게
    if (assetsData.some((c) => c.name === assetsValue)) return alert('이미 등록한 자산입니다.');

    const newAss: Assets = {
      id: generateId(),
      name: assetsValue,
      default: false,
      bank: 'hana',
    };

    setAssetsData((prev) => [...prev, newAss]);
    setAssetsValue('');
  };

  // 자산 삭제
  const handleDeleteAsset = (id: string) => {
    setAssetsData((prev) => prev.filter((item) => item.id !== id));
  };

  // 섭밋
  const handleSubmit = (e: React.SyntheticEvent) => {};

  return (
    <div>
      {isEdit ? (
        <>
          {assetsData?.map((item, key) => (
            <span key={key} className={item.default ? 'select' : ''}>
              {item.name}
            </span>
          ))}

          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div>
                자산:
                {(assetsData as Categorys[])?.map((ass) => (
                  <span key={ass.id}>
                    {ass.name}{' '}
                    <button
                      type="button"
                      onClick={() => handleDeleteAsset(ass.id)}
                      data-name={ass.name}
                    >
                      x
                    </button>{' '}
                    {'  '}
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={assetsValue}
                placeholder="추가할 에셋 입력"
                onChange={(e) => setAssetsValue(e.target.value)}
              />
              <button type="button" onClick={handleClickAddAsset}>
                추가
              </button>
            </div>
            <button type="submit" onClick={handleSubmit}>
              save
            </button>
            <button type="button" onClick={handleClickCancel}>
              cancel
            </button>
          </form>
        </>
      ) : (
        <>
          {assetsData?.length && assetsData.length > 0 ? (
            <>
              {assetsData?.map((item, key) => (
                <span key={key} className={item.default ? 'select' : ''}>
                  {item.name}
                </span>
              ))}
            </>
          ) : (
            <>
              <span>0개</span>
            </>
          )}

          <button type="button" onClick={handleClickEdit}>
            {assetsData?.length && assetsData.length > 0 ? '수정' : '추가'}
          </button>
        </>
      )}
    </div>
  );
};

export default UserInfoAssets;
