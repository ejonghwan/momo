'use client';

import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useCallback, useState } from 'react';

import { format } from 'date-fns';

import UxDatePicker from '@/components/style-ui/common/UxDatePicker';
import { AssetSelectedWrap } from '@/components/style-ui/expense/AssetSelected';
import { DEFAULT_CATEGORIES } from '@/constants/category';
import { useExpenseStore } from '@/store/front/useExpenseStore';
import { useUserStore } from '@/store/front/useUserStore';
import { supabaseClient } from '@/store/supabase/client';
import { ExpenseItemType, UpdateExpenseItemType } from '@/types/expense/ExpenseType';
import { Assets, Categorys } from '@/types/user/UserType';

interface Props {
  item: ExpenseItemType;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const UpdateExpense = ({ item, setIsEdit }: Props) => {
  const user = useUserStore((state) => state.user);
  // const profile = useUserStore((state) => state.profile);
  const updateExpense = useExpenseStore((state) => state.updateExpense);

  // 에셋 수정
  const [selectAsset, setSelectAsset] = useState<Assets[] | []>(item.assets);

  const [updateExpenseData, setUpdateExpenseData] = useState<UpdateExpenseItemType>({
    user_id: item.user_id,
    title: item.title,
    description: item.description,
    amount: item.amount,
    transaction_type: item.transaction_type,
    categorys: item.categorys,
    date: format(new Date(item.date), 'yyyy-MM-dd'),
    assets: selectAsset,
  });

  // 기타 입력을 위한 상태 추가
  const [categoryValue, setCategoryValue] = useState<string>('');
  const [categories, setCategories] = useState<Categorys[]>(() => {
    // props로 카테고리
    const itemCats = (item.categorys as Categorys[]) || [];

    // 기본카테고리 중복체크
    const defaultIds = new Set(DEFAULT_CATEGORIES.map((c) => c.id));

    // db에서 온거중 기본 목록에 없는 기타만 필터링
    const customCats = itemCats.filter((c) => !defaultIds.has(c.id));

    // 기본값 + 커스텀값 합쳐서 초기 상태로 설정. 한 번만 실행
    return [...DEFAULT_CATEGORIES, ...customCats];
  });

  const handleChangeExpense = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === 'categorys') {
      const catName = e.target.dataset.name || '';
      setUpdateExpenseData((prev) => {
        const currentCategories = (prev.categorys as Categorys[]) || [];

        if (checked) {
          const newCategory: Categorys = {
            id: value,
            name: catName,
            default: false,
          };
          return { ...prev, categorys: [...currentCategories, newCategory] };
        } else {
          return {
            ...prev,
            categorys: currentCategories.filter((cat) => cat.id !== value),
          };
        }
      });
      return;
    }

    const finalValue = name === 'amount' ? Number(value) : value;
    setUpdateExpenseData((prev) => ({ ...prev, [name]: finalValue }));
  }, []);

  // 기타 카테고리 추가 로직
  const handleClickAddCategory = () => {
    if (!categoryValue.trim()) return alert('카테고리명을 입력해주세요.');
    if (categories.some((c) => c.name === categoryValue))
      return alert('이미 존재하는 카테고리입니다.');

    const newCat: Categorys = {
      id: `custom_${Date.now()}`,
      name: categoryValue,
      default: false,
    };

    setCategories((prev) => [...prev, newCat]);

    // 현재 수정 중인 데이터에도 즉시 추가 (체크 상태)
    setUpdateExpenseData((prev) => ({
      ...prev,
      categorys: [...((prev.categorys as Categorys[]) || []), newCat],
    }));
    setCategoryValue('');
  };

  // 섭밋
  const handleSubmitExpense = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) return alert('로그인 정보가 없습니다.');

    const changedFields: Partial<UpdateExpenseItemType> = {};
    (Object.keys(updateExpenseData) as Array<keyof UpdateExpenseItemType>).forEach((key) => {
      const newValue = updateExpenseData[key];
      const oldValue = item[key as keyof ExpenseItemType];

      // 비교
      if (Array.isArray(newValue)) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          changedFields[key] = newValue as any;
        }
      }
      // 날짜만 예외 비교 처리
      else if (key === 'date') {
        // DB의 긴 문자열과 state의 짧은 문자열을 모두 yyyy-MM-dd로 통일해서 비교
        const formattedNew = format(new Date(newValue as string), 'yyyy-MM-dd');
        const formattedOld = format(new Date(oldValue as string), 'yyyy-MM-dd');

        if (formattedNew !== formattedOld) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          changedFields[key] = newValue as any;
        }
      }
      // 나머지 비교
      else if (newValue !== oldValue) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        changedFields[key] = newValue as any;
      }
    });

    console.log('update query Fields::::::::::::::::::::::', changedFields);

    if (
      Object.keys(changedFields).length === 0 &&
      selectAsset.some((selectAss) => selectAss.id === item.assets[0].id)
    ) {
      alert('변경사항이 없습니다.');
      return;
    }

    const payload = {
      ...changedFields,
      user_id: user.id,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseClient
      .from('expense')
      .update(payload)
      .eq('id', item?.id)
      .select()
      .single();

    if (error) {
      console.error('업데이트 실패:', error.message);
      return;
    }

    if (data) {
      updateExpense(data);
      alert('수정 완료!');
      setIsEdit(false);
    }
  };

  return (
    <div style={{ border: '10rem solid yellow' }}>
      <form onSubmit={handleSubmitExpense}>
        <label>제목</label>
        <input
          type="text"
          name="title"
          value={updateExpenseData.title}
          onChange={handleChangeExpense}
        />
        <br />
        <label>메모</label>
        <input
          type="text"
          name="description"
          value={updateExpenseData.description}
          onChange={handleChangeExpense}
        />
        <br />
        <label>금액</label>
        <input
          type="number"
          name="amount"
          value={updateExpenseData.amount}
          onChange={handleChangeExpense}
        />
        <br />
        <label>유형: </label>
        <input
          type="radio"
          name="transaction_type"
          value="in"
          checked={updateExpenseData.transaction_type === 'in'}
          onChange={handleChangeExpense}
        />{' '}
        수입
        <input
          type="radio"
          name="transaction_type"
          value="out"
          checked={updateExpenseData.transaction_type === 'out'}
          onChange={handleChangeExpense}
        />{' '}
        지출
        <input
          type="radio"
          name="transaction_type"
          value="transfer"
          checked={updateExpenseData.transaction_type === 'transfer'}
          onChange={handleChangeExpense}
        />{' '}
        자산이동
        <div style={{ margin: '20px 0' }}>
          <UxDatePicker
            date={new Date(updateExpenseData.date)}
            onChange={(time) =>
              setUpdateExpenseData((prev) => ({
                ...prev,
                date: time
                  ? format(new Date(time), 'yyyy-MM-dd')
                  : format(new Date(), 'yyyy-MM-dd'),
              }))
            }
          />
        </div>
        <div>
          asset : <br />
          <AssetSelectedWrap selectAsset={selectAsset} setSelectAsset={setSelectAsset} />
          {/* // expense db assets 추가 query 필요 */}
        </div>
        <label>카테고리</label>
        {categories.map((cat) => (
          <label key={cat.id} style={{ marginRight: '8px' }}>
            <input
              type="checkbox"
              name="categorys"
              value={cat.id}
              data-name={cat.name}
              checked={(updateExpenseData.categorys as Categorys[])?.some((c) => c.id === cat.id)}
              onChange={handleChangeExpense}
            />
            {cat.name}
          </label>
        ))}
        {/* 기타 카테고리 추가 UI */}
        <div>
          <input
            type="text"
            value={categoryValue}
            placeholder="기타 카테고리 직접 입력"
            onChange={(e) => setCategoryValue(e.target.value)}
          />
          <button type="button" onClick={handleClickAddCategory}>
            추가
          </button>
        </div>
        <p style={{ fontSize: '12px', color: '#666' }}>
          ※ 개인정보 수정 &gt; 카테고리추가에서 관리할 수 있습니다
        </p>
        <br />
        <button type="button" onClick={() => setIsEdit(false)}>
          cancel
        </button>
        <button type="submit">update!!</button>
      </form>
    </div>
  );
};

export default UpdateExpense;
