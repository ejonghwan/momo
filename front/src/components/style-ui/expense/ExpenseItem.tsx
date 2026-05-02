'use client';

import { memo, useState } from 'react';

import UpdateExpense from '@/components/style-ui/expense/UpdateExpense';
import { ExpenseItemType } from '@/types/expense/ExpenseType';

interface Props {
  item: ExpenseItemType;
}

const ExpenseItem = ({ item }: Props) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleExpenseUpdate = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    console.log('update?', id, item);
    setIsEdit((prev) => !prev);
  };

  const handleExpenseDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    console.log('delete?', id);
  };

  return (
    <div>
      {isEdit ? (
        <UpdateExpense item={item} setIsEdit={setIsEdit} />
      ) : (
        <>
          <hr />
          <br />
          <br />
          <span>{item.id}</span>
          <br />
          <span>{item.user_id}</span>
          <br />
          <span>{item.title}</span>
          <br />
          <span>{item.amount}</span>
          <br />
          <span>
            type:
            {item.transaction_type === 'in'
              ? '수입'
              : item.transaction_type === 'out'
                ? '지출'
                : '자산이동'}
          </span>
          <br />
          <span>category: {item.categorys?.map((item) => item)}</span>
          <br />
          <span>{item.created_at}</span>
          <br />
          <span>{item.updated_at !== item.created_at ? '수정됨' : '널'}</span>
          <br />

          <button type="button" onClick={(e) => handleExpenseUpdate(e, item.id)}>
            수정
          </button>
          <button type="button" onClick={(e) => handleExpenseDelete(e, item.id)}>
            삭제
          </button>
          <br />
          <br />
          <hr />
        </>
      )}
    </div>
  );
};

export default memo(ExpenseItem);
