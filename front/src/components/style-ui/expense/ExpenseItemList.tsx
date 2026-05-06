'use client';

import React, { useEffect } from 'react';

import ExpenseItem from '@/components/style-ui/expense/ExpenseItem';
import { useExpenseStore } from '@/store/front/useExpenseStore';
import { useUserStore } from '@/store/front/useUserStore';
// import { ExpenseItemType } from '@/types/expense/ExpenseType';

const ExpenseItemList = () => {
  const data = useExpenseStore((state) => state.expense);
  const loadExpenses = useExpenseStore((state) => state.loadExpenses);
  const isLoading = useExpenseStore((state) => state.isLoading);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    // 3. 유저 ID가 있을 때 데이터를 가져오라고 명령합니다.
    if (user?.id) {
      loadExpenses(user?.id);
    }
  }, [user?.id, loadExpenses]); // 의존성 배열에 넣어주어 안전하게 관리

  if (isLoading && data.length === 0) return <div>데이터 불러오는 중...</div>;

  return (
    <>
      {data.length === 0 ? (
        <p>내역이 없습니다.</p>
      ) : (
        data.map((item) => (
          <React.Fragment key={item.id}>
            <ExpenseItem item={item} />
          </React.Fragment>
        ))
      )}
    </>
  );
};

export default ExpenseItemList;
