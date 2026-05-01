'use client';
import React, { useEffect } from 'react';

import { ExpenseItemType } from '@/types/expense/ExpenseType';

interface Props {
  data: ExpenseItemType[];
}

const LoadExpense = ({ data }: Props) => {
  useEffect(() => {
    console.log('data?', data);
  }, []);

  return (
    <div>
      <h3>LoadExpense</h3>
      {data?.map((item) => (
        <div key={item.id}>
          <div>title: {item.title}</div>
          <div>desc: {item.description}</div>
          <div>amount: {item.amount}</div>
          <div>
            type:
            {item.transaction_type === 'in'
              ? '수입'
              : item.transaction_type === 'out'
                ? '지출'
                : '자산이동'}
          </div>
          <div>category: {item.categorys?.map((item) => item)}</div>
          <br />
          <br />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default LoadExpense;
