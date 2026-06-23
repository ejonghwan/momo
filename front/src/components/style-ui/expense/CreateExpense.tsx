'use client';

import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { format } from 'date-fns';

import UxDatePicker from '@/components/style-ui/common/UxDatePicker';
import { AssetSelectedWrap } from '@/components/style-ui/expense/AssetSelected';
import { DEFAULT_CATEGORIES } from '@/constants/category';
import { useExpenseStore } from '@/store/front/useExpenseStore';
import { useUserStore } from '@/store/front/useUserStore';
import { supabaseClient } from '@/store/supabase/client';
import { CreateExpenseItemType } from '@/types/expense/ExpenseType';
import { Assets, Categorys } from '@/types/user/UserType';

const CreateExpense = () => {
  const user = useUserStore((state) => state.user);
  const profile = useUserStore((state) => state.profile);
  const addExpense = useExpenseStore((state) => state.addExpense);

  // 1. 초기 상태값 정리
  const initialForm: CreateExpenseItemType = {
    user_id: '',
    title: '',
    description: '',
    amount: 0,
    transaction_type: 'out',
    categorys: [],
    date: format(new Date(), 'yyyy-MM-dd'),
    assets: profile?.assets || undefined,
  };

  const [createExpense, setCreateExpense] = useState<CreateExpenseItemType>(initialForm);
  const [categoryValue, setCategoryValue] = useState<string>('');
  const [categories, setCategories] = useState<Categorys[]>(DEFAULT_CATEGORIES);
  const [selectAsset, setSelectAsset] = useState<Assets[] | []>([]);
  // change fn
  const handleChangeExpense = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    // 카테고리 처리
    if (name === 'categorys') {
      const catName = e.target.dataset.name || '';

      setCreateExpense((prev) => {
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

    // 숫자형 데이터 처리 (amount)
    const finalValue = name === 'amount' ? Number(value) : value;
    setCreateExpense((prev) => ({ ...prev, [name]: finalValue }));
  }, []);

  // add categorys fn
  const handleClickAddCategory = () => {
    if (!categoryValue.trim()) return alert('카테고리명을 입력해주세요.');
    if (categories.some((c) => c.name === categoryValue))
      return alert('이미 존재하는 카테고리입니다.');

    // 새 객체 생성 (ID는 임시로 타임스탬프)
    const newCat: Categorys = {
      id: `custom_${Date.now()}`,
      name: categoryValue,
      default: false,
    };

    setCategories((prev) => [...prev, newCat]);

    // 현재 작성 중인 폼에도 바로 추가(선택 상태)
    setCreateExpense((prev) => ({
      ...prev,
      categorys: [...((prev.categorys as Categorys[]) || []), newCat],
    }));
    setCategoryValue('');
  };

  // submit fn
  const handleSubmitExpense = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) return alert('로그인 정보가 없습니다.');

    const payload = {
      ...createExpense,
      user_id: user.id,
      assets: selectAsset,
    };

    const { data, error } = await supabaseClient.from('expense').insert(payload).select();

    if (!error && data) {
      addExpense(data[0]);
      setCreateExpense(initialForm); // 초기화
      setSelectAsset([]); // 초기화
      alert('저장 완료!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitExpense}>
        <label>title</label>
        <input
          type="text"
          name="title"
          required
          value={createExpense.title}
          onChange={handleChangeExpense}
        />
        <br />
        <label>memo</label>
        <input
          type="text"
          name="description"
          value={createExpense.description}
          onChange={handleChangeExpense}
        />
        <br />
        <label>amount</label>
        <input
          type="number"
          name="amount"
          required
          value={createExpense.amount || ''}
          onChange={handleChangeExpense}
        />
        <br />
        <label>유형: </label>
        <input
          type="radio"
          id="in"
          name="transaction_type"
          value="in"
          checked={createExpense.transaction_type === 'in'}
          onChange={handleChangeExpense}
        />{' '}
        수입
        <input
          type="radio"
          id="out"
          name="transaction_type"
          value="out"
          checked={createExpense.transaction_type === 'out'}
          onChange={handleChangeExpense}
        />{' '}
        지출
        <input
          type="radio"
          id="transfer"
          name="transaction_type"
          value="transfer"
          checked={createExpense.transaction_type === 'transfer'}
          onChange={handleChangeExpense}
        />{' '}
        자산이동
        <div style={{ margin: '20px 0' }}>
          <label>사용날짜</label>
          <UxDatePicker
            date={new Date(createExpense.date)}
            onChange={(time) =>
              setCreateExpense((prev) => ({
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
        {/* {categories.map((cat) => (
          <label key={cat.id} style={{ marginRight: '8px' }}>
            <input
              type="checkbox"
              name="categorys"
              value={cat.id}
              data-name={cat.name} // name을 가져오기 위한 트릭
              checked={(createExpense.categorys as Categorys[])?.some((c) => c.id === cat.id)}
              onChange={handleChangeExpense}
            />
            {cat.name}
          </label>
        ))} */}
        {/* 가입할때부터 카테고리 그냥 프로필에 저장 후 커스텀 할 수 있게 */}
        {profile?.self_categorys.map((cat) => (
          <label key={cat.id} style={{ marginRight: '8px' }}>
            <input
              type="checkbox"
              name="categorys"
              value={cat.id}
              data-name={cat.name} // name을 가져오기 위한 트릭
              checked={(createExpense.categorys as Categorys[])?.some((c) => c.id === cat.id)}
              onChange={handleChangeExpense}
            />
            {cat.name}
          </label>
        ))}
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
        <button type="submit" style={{ marginTop: '20px' }}>
          내역 저장
        </button>
      </form>

      <hr />
      {/* 하단 프리뷰 섹션 */}
      <div>
        <strong>Preview:</strong>
        <p>제목: {createExpense.title}</p>
        <p>금액: {createExpense.amount?.toLocaleString()}원</p>
        <p>카테고리: {(createExpense.categorys as Categorys[])?.map((c) => c.name).join(', ')}</p>
        <p>선택된 에셋: {selectAsset.map((item) => item.name)}</p>
      </div>
    </div>
  );
};

export default CreateExpense;
