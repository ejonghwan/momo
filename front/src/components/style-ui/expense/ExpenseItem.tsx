'use client';

import { ExpenseItemType } from '@/types/expense/ExpenseType';
import React, { useState } from 'react';

interface Props {
  item: ExpenseItemType;
  setData: any;
}

const ExpenseItem = ({ item, setData }: Props) => {
  // const handleExpenseUpdate = (e) => {};
  // const handleExpenseDelete = (e) => {
  //   setData((prev) => {
  //     return [...prev, prev.filter()];
  //   });
  // };

  return (
    <div>
      <span>{item.id}</span>
      <span>{item.user_id}</span>
      <span>{item.title}</span>
      <span>{item.amount}</span>
      <span>{item.is_income ? 'true' : 'false'}</span>
      <span>{item.category}</span>
      <span>{item.created_at}</span>
      <span>{item.updated_at ? '수정됨' : '널'}</span>

      {/* <button type="button" onClick={(e) => handleExpenseUpdate(e)}>
        수정
      </button>
      <button type="button" onClick={(e) => handleExpenseDelete(e)}>
        삭제
      </button> */}
    </div>
  );
};

export default ExpenseItem;
