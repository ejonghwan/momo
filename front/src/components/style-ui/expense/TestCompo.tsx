import React, { useEffect } from 'react';

import { useExpenseStore } from '@/store/front/useExpenseStore';
import { formatComma } from '@/utils/utils';

const TestCompo2 = () => {
  // test
  const expense = useExpenseStore((state) => state.expense);
  const setExpense = useExpenseStore((state) => state.setExpense);
  const removeExpense = useExpenseStore((state) => state.removeExpense);
  const updateExpense = useExpenseStore((state) => state.updateExpense);

  const handleRemove = () => {
    removeExpense('2');
  };

  const handleUpdate = () => {
    updateExpense({
      id: '2',
      user_id: 'ho',
      title: 'hooh change',
      memo: 'memo',
      amount: formatComma(333333),
      is_income: false,
      category: 'how',
      created_at: '2026-04-05',
      updated_at: null,
    });
  };

  useEffect(() => {
    setExpense([
      {
        id: '1',
        user_id: 'ho',
        title: 'hooh',
        memo: 'memo',
        amount: formatComma(333333),
        is_income: false,
        category: 'how',
        created_at: '2026-04-05',
        updated_at: null,
      },
      {
        id: '2',
        user_id: 'ho',
        title: 'hooh',
        memo: 'memo',
        amount: formatComma(333333),
        is_income: false,
        category: 'how',
        created_at: '2026-04-05',
        updated_at: null,
      },
      {
        id: '3',
        user_id: 'ho',
        title: 'hooh',
        memo: 'memo',
        amount: formatComma(333333),
        is_income: false,
        category: 'how',
        created_at: '2026-04-05',
        updated_at: null,
      },
    ]);

    console.log('expense???', expense);
  }, []);

  useEffect(() => {
    console.log('expense???', expense);
  }, [expense]);

  return (
    <div>
      <div>
        zustand test
        <br />
        {expense?.map((item) => (
          <div key={item.id}>
            {item.id} | {item.title}
          </div>
        ))}
      </div>

      <button type="button" onClick={() => handleUpdate()}>
        update
      </button>
      <button type="button" onClick={() => handleRemove()}>
        remove
      </button>
    </div>
  );
};

export default TestCompo2;
