import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { useExpenseStore } from '@/store/front/useExpenseStore';
import { useUserStore } from '@/store/front/useUserStore';
// import { supabaseClient } from '@/store/supabase/client';
import { CreateExpenseItemType, ExpenseItemType } from '@/types/expense/ExpenseType';

interface Props {
  item: ExpenseItemType;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const UpdateExpense = ({ item, setIsEdit }: Props) => {
  //   const updateAmount = async (id, newAmount) => {
  //   await supabase
  //     .from('expense')
  //     .update({ amount: newAmount }) // 딱 바뀐 필드만 객체로 전달
  //     .eq('id', id);
  // }

  const user = useUserStore((state) => state.user);
  // const addExpense = useExpenseStore((state) => state.addExpense);

  // 일반 지출
  const [updateExpense, setUpdateExpense] = useState<CreateExpenseItemType>({
    user_id: '',
    title: item.title,
    description: item.description,
    amount: item.amount,
    transaction_type: item.transaction_type,
    categorys: item.categorys,
    date: new Date().toISOString(), //기본값은 작성한 현재 시간
  });
  // 자산이동은 다른 컴포넌트로 뺴야될듯 ?

  // form 작성
  const handleChangeExpense = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    const { name, value, type, checked } = e.target;

    // 카테고리(배열)인 경우 특수 처리
    if (name === 'categorys') {
      setUpdateExpense((prev) => {
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
    setUpdateExpense((prev) => ({ ...prev, [name]: value }));
  };

  // request insert
  const handleSubmitExpense = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.id) return alert('로그인 정보가 없습니다.');

    const payload = {
      ...updateExpense,
      user_id: user.id,
    };

    // const { data, error } = await supabaseClient.from('expense').insert(payload).select();

    // console.log('data???????', data);

    // if (!error && data) {
    //   addExpense(data[0]);

    // 초기화
    // setUpdateExpense({
    //   user_id: '',
    //   title: item.title,
    //   description: item.description,
    //   amount: item.amount,
    //   transaction_type: item.transaction_types,
    //   categorys: item.categorys,
    //   date: new Date().toISOString(),
    // });
    alert('저장 완료!');
    setIsEdit((prev) => !prev);
    // }
  };

  const handleCancel = () => {
    console.log('handleCancel???');
    setIsEdit((prev) => !prev);
  };

  useEffect(() => {
    console.log('updateExpense??', updateExpense);
  }, [updateExpense]);

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
          value={updateExpense.title}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="memo">memo</label>
        <input
          type="text"
          name="description"
          value={updateExpense.description}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="amount">amount</label>
        <input
          type="number"
          name="amount"
          value={updateExpense.amount}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="in">in 수입</label>
        <input
          type="radio"
          id="in"
          name="transaction_type"
          value="in"
          checked={updateExpense.transaction_type === 'in'}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="out">out 지출</label>
        <input
          type="radio"
          id="out"
          name="transaction_type"
          value="out"
          checked={updateExpense.transaction_type === 'out'}
          onChange={(e) => handleChangeExpense(e)}
        />
        <br />
        <label htmlFor="transfer">transfer 자산이동</label>
        <input
          type="radio"
          id="transfer"
          name="transaction_type"
          value="transfer"
          checked={updateExpense.transaction_type === 'transfer'}
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
              checked={updateExpense.categorys?.includes(cat)} // 배열에 있으면 체크 상태
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
