'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';

import { useUserStore } from '@/store/front/useUserStore';
import { CreateExpenseItemType, ExpenseItemType } from '@/types/expense/ExpenseType';

const CreateExpense = () => {
  const user = useUserStore((state) => state.user);
  const [createExpense, setCreateExpense] = useState<CreateExpenseItemType>({
    user_id: '',
    title: '',
    memo: '',
    amount: 0,
    is_income: false,
    category: [],
  });

  // form 작성
  const handleChangeExpense = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    const { name, value, type, checked } = e.target;

    // 카테고리(배열)인 경우 특수 처리
    if (name === 'category') {
      setCreateExpense((prev) => {
        const currentCategories = prev.category || [];

        if (checked) {
          // 체크됨: 배열에 추가
          return { ...prev, category: [...currentCategories, value] };
        } else {
          // 체크 해제됨: 배열에서 제거
          return {
            ...prev,
            category: currentCategories.filter((cat) => cat !== value),
          };
        }
      });
      return; // 카테고리 처리가 끝났으므로 함수 종료
    }

    // 라디오가 income, expense로 오니깐 분기처리
    const val = value === 'expense' ? false : value === 'income' ? true : value;
    setCreateExpense((prev) => ({ ...prev, [name]: val }));
  };

  // request insert
  const handleSubmitExpense = () => {
    if (!user?.id) return alert('로그인 정보가 없습니다.');

    const payload = {
      ...createExpense,
      user_id: user.id,
    };

    //   const { error } = await supabase.from('expenses').insert(payload);

    // if (!error) {
    //   alert('저장 완료!');
    // }
  };

  //   const onSubmit = async () => {
  //   // 1. 슈파베이스 저장 요청
  //   const { data, error } = await supabase.from('expenses').insert(form).select();

  //   if (!error && data) {
  //     // 2. 성공하면 쥬스탄드 리스트 맨 앞에 추가
  //     addExpense(data[0]);
  //     // 3. 입력 폼 비우기
  //     setForm({ title: '', amount: 0 });
  //   }
  // };

  useEffect(() => {
    console.log('createExpense??', createExpense);
  }, [createExpense]);

  // useEffect에선 setSTate 사용시
  // 렌더링 완 -> useEffect 실행 -> setState -> 재렌더링 -> 리액트(무한렌더링??)

  const categories = ['식비', '교통비', '쇼핑', '의료비', '교육', '통신', '기타'];

  return (
    <div>
      <form action="">
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          value={createExpense.title}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="memo">memo</label>
        <input
          type="text"
          name="memo"
          value={createExpense.memo}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="amount">amount</label>
        <input
          type="number"
          name="amount"
          value={createExpense.amount}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="income">income 수입</label>
        <input
          type="radio"
          id="income"
          name="is_income"
          value="income"
          checked={createExpense.is_income}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="expense">expense 지출</label>
        <input
          type="radio"
          id="expense"
          name="is_income"
          value="expense"
          checked={!createExpense.is_income}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="category">title</label>
        {categories.map((cat) => (
          <label key={cat} style={{ marginRight: '8px' }}>
            <input
              type="checkbox"
              name="category"
              value={cat} // 이 값이 배열에 들어감
              checked={createExpense.category?.includes(cat)} // 배열에 있으면 체크 상태
              onChange={(e) => handleChangeExpense(e)}
            />
            {cat}
          </label>
        ))}

        <br />
      </form>
      <div>
        <div>{createExpense.title}</div>
        <div>{createExpense.memo}</div>
        <div>{createExpense.amount}</div>
        <div>{createExpense.is_income ? '수입' : '지출'}</div>
        <div>{createExpense.category}</div>
      </div>
    </div>
  );
};

export default CreateExpense;
