'use client';

import { useEffect, useState } from 'react';

import { UxSelectBankWrap } from '@/components/style-ui/common/UxSelectBank';
import { DEFAULT_BANK } from '@/constants/assets';
import { useUserStore } from '@/store/front/useUserStore';
import { supabaseClient } from '@/store/supabase/client';
import { Assets, Banks } from '@/types/user/UserType';
import { generateId } from '@/utils/utils';

// interface Props {
//   assets: Assets[] | undefined;
// }

const UserInfoAssets = () => {
  const profile = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setUserProfile);

  const [isEdit, setisEdit] = useState<boolean>(false);
  const [assetsData, setAssetsData] = useState<Assets[]>(profile?.assets || []);
  const [assetsValue, setAssetsValue] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<Banks[]>([]); // 은행선택
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
      bank: selectedBank.length > 0 ? selectedBank.map((item) => item) : [],
    };

    setAssetsData((prev) => [...prev, newAss]);
    setAssetsValue('');
  };

  // 자산 삭제
  const handleDeleteAsset = (id: string) => {
    setAssetsData((prev) => prev.filter((item) => item.id !== id));
  };

  // 섭밋
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const oldAssets = profile?.assets || [];
      const newItems = assetsData.filter(
        (newAss) => !oldAssets.some((oldAss) => oldAss.id === newAss.id),
      );
      const totalLen = [...assetsData, ...newItems].length; // 기존 카테고리와 추가된 카테고리 총 렝스

      // 새로운 아이템이 추가되지 않거나 기존이랑 같으면 변경하지않음
      if (newItems.length <= 0 && oldAssets.length === totalLen)
        return alert('추가된 자산이 없습니다.');

      const { data: updatedProfile, error } = await supabaseClient
        .from('users')
        .update({ assets: assetsData })
        .eq('id', profile?.id)
        .select();

      if (error) throw error;

      // 성공시
      if (updatedProfile && profile) {
        setProfile({ ...profile, assets: updatedProfile[0].assets });
        alert(`자산리스트가 변경 되었습니다.`);
        setisEdit((prev) => !prev);
      }
    } catch (error) {
      console.error('업데이트 실패:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    console.log('assetsData???????', assetsData);
  }, [assetsData]);

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
              <UxSelectBankWrap
                data={DEFAULT_BANK}
                isOne
                selectedBank={selectedBank}
                setSelectedBank={setSelectedBank}
              />

              <div>
                은행설정: {selectedBank.length > 0 ? selectedBank.map((item) => item.bank) : '기타'}
                <br />
                자산별명:
                {(assetsData as Assets[])?.map((ass) => (
                  <span key={ass.id}>
                    <span>{ass.bank.map((item) => item.bank)} - </span>
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
                  <span>{item.bank.map((item) => item.bank)}</span> -<span>{item.name}</span>
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
