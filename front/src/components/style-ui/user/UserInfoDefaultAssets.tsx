'use client';

import { useState } from 'react';

import { profile } from 'console';

import { useUserStore } from '@/store/front/useUserStore';
import { supabaseClient } from '@/store/supabase/client';
import { Assets } from '@/types/user/UserType';

// interface Props {
//   defaultAssets: Assets | undefined;
// }

const UserInfoDefaultAssets = () => {
  // 이 컴포넌트는 assets랑 합칠지 고민중
  const profile = useUserStore((state) => state.profile);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [defaultAssetData, setDefaultAssetData] = useState<Assets | null>(null);

  const handleChangeDefaultAsset = (item: Assets) => {
    console.log('target item ???', item);
    setDefaultAssetData(item);
  };

  const handleClickAddAmount = () => {
    setIsEdit((prev) => !prev);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      // 새로운 아이템이 추가되지 않거나 기존이랑 같으면 변경하지않음

      const { data: updatedProfile, error } = await supabaseClient
        .from('users')
        .update({ default_asset: defaultAssetData })
        .eq('id', profile?.id)
        .select();

      if (error) throw error;

      // 성공시
      if (updatedProfile && profile) {
        // setProfile({ ...profile, assets: updatedProfile[0].assets });
        alert(`자산리스트가 변경 되었습니다.`);
        setIsEdit((prev) => !prev);
      }
    } catch (error) {
      console.error('업데이트 실패:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      {isEdit ? (
        <>
          <form onSubmit={handleSubmit}>
            {profile?.assets.map((item) => (
              <button key={item.id} type="button" onClick={() => handleChangeDefaultAsset(item)}>
                <span>
                  {item.bank.map((item) => item.bank).join('/')} - {item.name}
                  {/* {item.name} */}
                </span>
              </button>
            ))}

            <div>
              선택됨 :{defaultAssetData?.bank.map((item) => item.bank).join('/')}
              {defaultAssetData?.name}
              {/* {defaultAssetData?.default === true } */}
            </div>
            <button type="submit">등록하기</button>
          </form>
        </>
      ) : (
        <div>
          선택됨 :{defaultAssetData?.bank.map((item) => item.bank).join('/')}
          {defaultAssetData?.name}
        </div>
      )}
      {/* {defaultAssets ? defaultAssets : <span>기본 설정된 카드가 없습니다</span>} */}
      <button type="button" onClick={handleClickAddAmount}>
        {isEdit ? '캔슬' : '기본 카드/계좌 등록하기'}
      </button>
    </div>
  );
};

export default UserInfoDefaultAssets;
