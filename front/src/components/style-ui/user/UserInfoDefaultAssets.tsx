'use client';

import { useState } from 'react';

import { useUserStore } from '@/store/front/useUserStore';
import { supabaseClient } from '@/store/supabase/client';
import { Assets } from '@/types/user/UserType';

// interface Props {
//   defaultAssets: Assets | undefined;
// }

/*
  **assets list
  1. 에셋 리스트에 등록하지 않으면 default 영역 아예 노렌더링
  2. lsit에 유저가 등록 후 default_assets 컬럼을 따로 설정하지 않으면 첫번쨰가 디폴트  

*/

const UserInfoDefaultAssets = () => {
  const profile = useUserStore((state) => state.profile);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [defaultAssetData, setDefaultAssetData] = useState<Assets | null>(null);

  // change fn
  const handleChangeDefaultAsset = (item: Assets) => {
    console.log('target item ???', item);
    setDefaultAssetData(item);
  };

  // add fn
  const handleClickAddAmount = () => {
    setIsEdit((prev) => !prev);
  };

  // submit fn
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

  if (profile?.assets === null) return;

  return (
    <div>
      {isEdit ? (
        // edit mode
        <>
          <form onSubmit={handleSubmit}>
            {profile?.assets?.map((item) => (
              <button key={item.id} type="button" onClick={() => handleChangeDefaultAsset(item)}>
                <span>
                  {item.bank.map((item) => item.bank).join('/')} - {item.name}
                  {/* {item.name} */}
                </span>
              </button>
            ))}

            <div>
              <>
                선택됨 : {defaultAssetData?.bank?.map((item) => item.bank).join('/')}
                {defaultAssetData?.name}
              </>
            </div>
            <button type="submit">등록하기</button>
          </form>
        </>
      ) : (
        <div>
          {profile?.assets === null ? (
            <span>0개</span>
          ) : (
            <>
              설정된 항목:{profile?.default_asset?.bank?.map((item) => item.bank)} -{' '}
              {profile?.default_asset?.name}
            </>
          )}
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
