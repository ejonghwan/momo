import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { format } from 'date-fns';

import UxDatePicker from '@/components/style-ui/common/UxDatePicker';
import { useExpenseStore } from '@/store/front/useExpenseStore';
import { useUserStore } from '@/store/front/useUserStore';
import { supabaseClient } from '@/store/supabase/client';
import {
  CreateExpenseItemType,
  ExpenseItemType,
  UpdateExpenseItemType,
} from '@/types/expense/ExpenseType';

interface Props {
  item: ExpenseItemType;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const UpdateExpense = ({ item, setIsEdit }: Props) => {
  const user = useUserStore((state) => state.user);
  const updateExpense = useExpenseStore((state) => state.updateExpense);

  // const [selectedDate, setSelectedDate] = useState<Date | null>(item.date);
  const [updateExpenseData, setUpdateExpenseData] = useState<UpdateExpenseItemType>({
    user_id: item.user_id,
    title: item.title,
    description: item.description,
    amount: item.amount,
    transaction_type: item.transaction_type,
    categorys: item.categorys,
    date: format(new Date(item.date), 'yyyy-MM-dd'), // api load 시 string, 변경 컴포넌트에서는 Date type
  });

  // form 작성
  const handleChangeExpense = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    const { name, value, checked } = e.target;

    // 카테고리(배열)인 경우 특수 처리
    if (name === 'categorys') {
      setUpdateExpenseData((prev) => {
        const currentCategories = prev.categorys || [];

        if (checked) {
          return { ...prev, categorys: [...currentCategories, value] }; // 체크됨: 배열에 추가
        } else {
          return {
            // 체크 해제됨: 배열에서 제거
            ...prev,
            categorys: currentCategories.filter((cat) => cat !== value),
          };
        }
      });
      return;
    }

    // 라디오가 income, expense로 오니깐 분기처리
    // const val = value === 'expense' ? false : value === 'income' ? true : value;
    setUpdateExpenseData((prev) => ({ ...prev, [name]: value }));
  };

  // request insert
  const handleSubmitExpense = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.id) return alert('로그인 정보가 없습니다.');

    // console.log('item????????', item);

    const changedFields: Partial<CreateExpenseItemType> = {};
    (Object.keys(updateExpenseData) as Array<keyof CreateExpenseItemType>).forEach((key) => {
      // if (['id', 'user_id', 'created_at'].includes(key)) return;
      if (updateExpenseData[key] !== item[key]) {
        (changedFields as any)[key] = updateExpenseData[key]; // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    });

    // console.log('변경됨??', changedFields);
    if (Object.keys(changedFields).length === 0) {
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
      .update(payload) // 딱 바뀐 필드만 객체로 전달
      .eq('id', item?.id)
      .select()
      .single();

    if (error) {
      console.error('업데이트 실패:', error.message);
      return;
    }

    if (data) {
      updateExpense(data);
      alert('저장 완료!');
      setIsEdit((prev) => !prev);
    }
  };

  const handleCancel = () => {
    // console.log('handleCancel???');
    setIsEdit((prev) => !prev);
  };

  // const handleChangeDate = (time: Date | null) => {
  //   setSelectedDate(time);
  //   setUpdateExpenseData((prev) => ({ ...prev, date: time }));
  // };

  useEffect(() => {
    console.log('updateExpenseData??', updateExpenseData);
  }, [updateExpenseData]);

  // useEffect에선 setSTate 사용시
  // 렌더링 완 -> useEffect 실행 -> setState -> 재렌더링 -> 리액트(무한렌더링??)

  const categories = ['식비', '교통비', '쇼핑', '의료비', '교육', '통신', '기타'];

  return (
    <div>
      <form action="" onSubmit={(e) => handleSubmitExpense(e)}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          value={updateExpenseData.title}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="memo">memo</label>
        <input
          type="text"
          name="description"
          value={updateExpenseData.description}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="amount">amount</label>
        <input
          type="number"
          name="amount"
          value={updateExpenseData.amount}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="in">in 수입</label>
        <input
          type="radio"
          id="in"
          name="transaction_type"
          value="in"
          checked={updateExpenseData.transaction_type === 'in'}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="out">out 지출</label>
        <input
          type="radio"
          id="out"
          name="transaction_type"
          value="out"
          checked={updateExpenseData.transaction_type === 'out'}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="transfer">transfer 자산이동</label>
        <input
          type="radio"
          id="transfer"
          name="transaction_type"
          value="transfer"
          checked={updateExpenseData.transaction_type === 'transfer'}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <div style={{ textAlign: 'center' }}>
          <UxDatePicker
            date={updateExpenseData.date}
            onChange={(time) =>
              setUpdateExpenseData((prev) => ({
                ...prev,
                date: format(time ? format(new Date(time), 'yyyy-MM-dd') : '', 'yyyy-MM-dd'),
              }))
            }
          />
        </div>
        <br />
        <label htmlFor="categorys">category</label>
        {categories.map((cat) => (
          <label key={cat} style={{ marginRight: '8px' }}>
            <input
              type="checkbox"
              name="categorys"
              value={cat} // 이 값이 배열에 들어감
              checked={updateExpenseData.categorys?.includes(cat)} // 배열에 있으면 체크 상태
              onChange={(e) => handleChangeExpense(e)}
            />
            {cat}
          </label>
        ))}
        <br />
        <button type="button" onClick={handleCancel}>
          cancel
        </button>
        <button type="submit">update!!</button>
      </form>
    </div>
  );
};

export default UpdateExpense;
