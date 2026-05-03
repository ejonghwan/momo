'use client';

import { useState } from 'react';

import { DEFAULT_CATEGORIES } from '@/constants/category';
import { useUserStore } from '@/store/front/useUserStore';
import { supabaseClient } from '@/store/supabase/client';
import { Categorys } from '@/types/user/UserType';
import { generateId } from '@/utils/utils';

interface Props {
  categorys: Categorys[] | undefined;
}

const UserInfoSelfCategory = ({ categorys }: Props) => {
  const profile = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setUserProfile);

  const [isEdit, setisEdit] = useState<boolean>(false);
  const [categories, setCategories] = useState<Categorys[]>(profile?.self_categorys || []);
  const [categoryValue, setCategoryValue] = useState<string>('');

  // 수정
  const handleClickEdit = () => {
    setisEdit((prev) => !prev);
  };

  // 카테고리 켄슬
  const handleClickCancel = () => {
    setisEdit((prev) => !prev);
    setCategories(profile?.self_categorys || []);
  };

  // 카테고리 추가
  const handleClickAddCategory = () => {
    if (!categoryValue.trim()) return alert('카테고리명을 입력해주세요.');

    // 유저 디비 + 추가작성한 내용에 이미 등록된건 추가못하게
    if (categories.some((c) => c.name === categoryValue))
      return alert('이미 존재하는 카테고리입니다.');

    // 상수로 저장된 것들도 추가못하게
    const isDefaultConflict = DEFAULT_CATEGORIES.some(
      (category) => category.name === categoryValue,
    );

    if (isDefaultConflict) {
      alert(
        `'${categoryValue}'은(는) 기본 카테고리에 이미 존재합니다. \n 기본 카테고리 : ${DEFAULT_CATEGORIES.map((item) => item.name).join(', ')}`,
      );
      return;
    }

    const newCat: Categorys = {
      // id: `custom_${Date.now()}`,
      id: generateId(),
      name: categoryValue,
      default: false,
    };

    setCategories((prev) => [...prev, newCat]);
    setCategoryValue('');
  };

  // 카테고리 삭제
  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  // 카테고리 서브밋
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const oldCategories = profile?.self_categorys || [];
      const newItems = categories.filter(
        (newCol) => !oldCategories.some((oldCol) => oldCol.id === newCol.id),
      );
      const totalLen = [...categories, ...newItems].length; // 기존 카테고리와 추가된 카테고리 총 렝스

      // console.log(oldCategories.length, totalLen);

      // 새로운 아이템이 추가되지 않거나 기존이랑 같으면 변경하지않음
      if (newItems.length <= 0 && oldCategories.length === totalLen)
        return alert('추가된 카테고리가 없습니다.');

      const { data: updatedProfile, error } = await supabaseClient
        .from('users')
        .update({ self_categorys: categories })
        .eq('id', profile?.id) // 현재 로그인한 유저 ID
        .select();
      // .maybeSingle();

      if (error) throw error;

      // 성공시
      if (updatedProfile && profile) {
        setProfile({ ...profile, self_categorys: updatedProfile[0].self_categorys });
        alert(`카테고리가 변경 되었습니다.`);
        setisEdit((prev) => !prev);
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
          {categorys?.map((item, key) => (
            <span key={key} className={item.default ? 'select' : ''}>
              {item.name}
            </span>
          ))}

          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div>
                카테고리:
                {/* {(categories as Categorys[])?.map((c) => c.name).join(', ')} */}
                {(categories as Categorys[])?.map((c) => (
                  <span key={c.id}>
                    {c.name}{' '}
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(c.id)}
                      data-name={c.name}
                    >
                      x
                    </button>{' '}
                    {'  '}
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={categoryValue}
                placeholder="추가할 카테고리 입력"
                onChange={(e) => setCategoryValue(e.target.value)}
              />
              <button type="button" onClick={handleClickAddCategory}>
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
          {categorys?.length && categorys.length > 0 ? (
            <>
              {categorys?.map((item, key) => (
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
            {categorys?.length && categorys.length > 0 ? '수정' : '추가'}
          </button>
        </>
      )}
    </div>
  );
};

export default UserInfoSelfCategory;
