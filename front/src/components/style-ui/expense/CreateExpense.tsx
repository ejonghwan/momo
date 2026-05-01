'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';

import { useUserStore } from '@/store/front/useUserStore';
import { CreateExpenseItemType, ExpenseItemType } from '@/types/expense/ExpenseType';

const CreateExpense = () => {
  const user = useUserStore((state) => state.user);

  // 일반 지출
  const [createExpense, setCreateExpense] = useState<CreateExpenseItemType>({
    user_id: '',
    title: '',
    description: '',
    amount: 0,
    transaction_type: 'out',
    category: [],
    date: new Date().toISOString(), //기본값은 작성한 현재 시간
  });
  // 자산이동은 다른 컴포넌트로 뺴야될듯 ?

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
    // const val = value === 'expense' ? false : value === 'income' ? true : value;
    setCreateExpense((prev) => ({ ...prev, [name]: value }));
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
          name="description"
          value={createExpense.description}
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
        <label htmlFor="in">in 수입</label>
        <input
          type="radio"
          id="in"
          name="transaction_type"
          value="in"
          checked={createExpense.transaction_type === 'in'}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="out">out 지출</label>
        <input
          type="radio"
          id="out"
          name="transaction_type"
          value="out"
          checked={createExpense.transaction_type === 'out'}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="transfer">transfer 자산이동</label>
        <input
          type="radio"
          id="transfer"
          name="transaction_type"
          value="transfer"
          checked={createExpense.transaction_type === 'transfer'}
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
        <div>{createExpense.description}</div>
        <div>{createExpense.amount}</div>
        <div>
          {createExpense.transaction_type === 'in'
            ? '수입'
            : createExpense.transaction_type === 'out'
              ? '지출'
              : '자산이동'}
        </div>
        <div>{createExpense.category}</div>
      </div>
    </div>
  );
};

export default CreateExpense;
