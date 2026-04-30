'use client';

import React, { useState } from 'react';

import ExpenseItem from '@/components/style-ui/expense/ExpenseItem';
import { ExpenseItemType } from '@/types/expense/ExpenseType';

interface Props {
  data: ExpenseItemType[];
}

const ExpenseItemList = ({ data }: Props) => {
  const [expenseData, setExpenseData] = useState(data);

  return (
    <>
      {data?.map((item) => (
        <React.Fragment key={item.id}>
          <ExpenseItem item={item} setData={setExpenseData} />
        </React.Fragment>
      ))}
    </>
  );
};

export default ExpenseItemList;
