'use client';

import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';

import { format } from 'date-fns';

import UxDatePicker from '@/components/style-ui/common/UxDatePicker';
import { useExpenseStore } from '@/store/front/useExpenseStore';
import { useUserStore } from '@/store/front/useUserStore';
import { supabaseClient } from '@/store/supabase/client';
import { CreateExpenseItemType } from '@/types/expense/ExpenseType';

const CreateExpense = () => {
  const user = useUserStore((state) => state.user);
  const addExpense = useExpenseStore((state) => state.addExpense);

  // 일반 지출
  const [createExpense, setCreateExpense] = useState<CreateExpenseItemType>({
    user_id: '',
    title: '',
    description: '',
    amount: 0,
    transaction_type: 'out',
    categorys: [],
    date: format(new Date(), 'yyyy-MM-dd'), // 사용한 날짜 시간
    // created_at은 글을 작성한 시간
  });
  // 자산이동은 다른 컴포넌트로 뺴야될듯 ?

  // form 작성
  const handleChangeExpense = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    const { name, value, checked } = e.target;

    // 카테고리(배열)인 경우 특수 처리
    if (name === 'categorys') {
      setCreateExpense((prev) => {
        const currentCategories = prev.categorys || [];

        if (checked) {
          // 체크됨: 배열에 추가
          return { ...prev, categorys: [...currentCategories, value] };
        } else {
          // 체크 해제됨: 배열에서 제거
          return {
            ...prev,
            categorys: currentCategories.filter((cat) => cat !== value),
          };
        }
      });
      return; // 카테고리 처리가 끝났으므로 함수 종료
    }

    // 라디오가 income, expense로 오니깐 분기처리
    // const val = value === 'expense' ? false : value === 'income' ? true : value;
    setCreateExpense((prev) => ({ ...prev, [name]: value }));
  }, []);

  // request insert
  const handleSubmitExpense = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.id) return alert('로그인 정보가 없습니다.');

    const payload = {
      ...createExpense,
      user_id: user.id,
    };

    const { data, error } = await supabaseClient.from('expense').insert(payload).select();

    if (!error && data) {
      addExpense(data[0]);
      setCreateExpense({
        user_id: '',
        title: '',
        description: '',
        amount: 0,
        transaction_type: 'out',
        categorys: categories,
        date: format(new Date(), 'yyyy-MM-dd'),
      });
      alert('저장 완료!');
    }
  };

  useEffect(() => {
    console.log('createExpense??', createExpense);
  }, [createExpense]);

  // useEffect에선 setSTate 사용시
  // 렌더링 완 -> useEffect 실행 -> setState -> 재렌더링 -> 리액트(무한렌더링??)

  // 카테고리 기능 수정
  // const categories = ['식비', '교통비', '쇼핑', '의료비', '교육', '통신'];
  const [categoryValue, setCategoryValue] = useState<string>('');
  const [categories, setCategories] = useState([
    '식비',
    '교통비',
    '쇼핑',
    '의료비',
    '교육',
    '통신',
  ]);

  const handleClickAddCategory = () => {
    if (!categoryValue.trim()) return alert('카테고리명을 입력해주세요.');
    if (categories.includes(categoryValue)) return alert('이미 존재하는 카테고리입니다.');
    setCategories((prev) => [...prev, categoryValue]);

    // payload state에 추가
    setCreateExpense((prev) => ({
      ...prev,
      categorys: [...(prev.categorys || []), categoryValue],
    }));
    setCategoryValue('');

    // 유저 개인 db에 추가할지 묻는 alert.
    // true => 유저 db에 추가
  };

  return (
    <div>
      <form action="" onSubmit={(e) => handleSubmitExpense(e)}>
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
        <label>사용날짜</label>
        {/* <input
          type="date"
          id="date"
          name="date"
          // checked={createExpense.transaction_type === 'out'}
          // onChange={(e) => handleChangeExpense(e)}
        /> */}
        <div style={{ textAlign: 'center' }}>
          <UxDatePicker
            date={new Date(createExpense.date)}
            onChange={(time) =>
              setCreateExpense((prev) => ({
                ...prev,
                date: format(time ? format(new Date(time), 'yyyy-MM-dd') : '', 'yyyy-MM-dd'),
              }))
            }
          />
        </div>
        {/* <p>선택된 날짜: {selectedDate?.toLocaleDateString()}</p> */}

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
        <label htmlFor="categorys">title</label>
        {categories.map((cat) => (
          <label key={cat} style={{ marginRight: '8px' }}>
            <input
              type="checkbox"
              name="categorys"
              value={cat} // 이 값이 배열에 들어감
              checked={createExpense.categorys?.includes(cat)} // 배열에 있으면 체크 상태
              onChange={(e) => handleChangeExpense(e)}
            />
            {cat}
          </label>
        ))}
        <label key={'기타'}>
          <input
            type="input"
            name="categorys"
            value={categoryValue} // 이 값이 배열에 들어감
            placeholder="기타"
            // 배열에 있으면 체크 상태
            // onChange={(e) => handleChangeExpense(e)}
            onChange={(e) => setCategoryValue(e.target.value)}
          />
          <button type="button" onClick={handleClickAddCategory}>
            추가
          </button>
        </label>
        <p>※ 개인정보 수정 &gt; 카테고리추가에서 추가할 수 있습니다</p>

        <br />

        <button type="submit">create!!</button>
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
        <div>{createExpense.categorys}</div>
        <div>{createExpense.date}</div>
      </div>
    </div>
  );
};

export default CreateExpense;
