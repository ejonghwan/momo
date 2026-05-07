'use client';

import { memo, useState } from 'react';

import DeleteExpense from '@/components/style-ui/expense/DeleteExpense';
import UpdateExpense from '@/components/style-ui/expense/UpdateExpense';
import { ExpenseItemType } from '@/types/expense/ExpenseType';
import { changeViewDate, formatComma } from '@/utils/utils';

interface Props {
  item: ExpenseItemType;
}

const ExpenseItem = ({ item }: Props) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleExpenseUpdate = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    console.log('update?', id, item);
    setIsEdit((prev) => !prev);
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
          <span>{formatComma(item.amount)}원</span>
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
          assets :{' '}
          {item.assets?.map((item) => {
            return (
              <span key={item.id}>
                {item.bank.map((item) => item.bank)}
                {item.name}
              </span>
            );
          })}
          <br />
          <span>
            category:
            {item.categorys?.map((cat, key) => (
              <span key={key}>{cat.name}</span>
            ))}
          </span>
          <br />
          <span>생성일:{changeViewDate(item.created_at, 'second')}</span>
          <br />
          <span>수정일:{item.updated_at !== item.created_at ? '수정됨' : '널'}</span>
          <br />
          <span>돈쓴날:{changeViewDate(item.date, 'second')}</span>
          <br />
          <button type="button" onClick={(e) => handleExpenseUpdate(e, item.id)}>
            수정
          </button>
          <DeleteExpense id={item.id} />
          <br />
          <br />
          <hr />
        </>
      )}
    </div>
  );
};

export default memo(ExpenseItem);
