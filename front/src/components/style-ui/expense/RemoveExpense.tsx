import React from 'react';

import { useExpenseStore } from '@/store/front/useExpenseStore';
import { supabase } from '@/store/supabase/supabase';

const RemoveExpense = () => {
  const removeExpense = useExpenseStore((state) => state.removeExpense);

  const handleDelete = async (id: string) => {
    // 1. 슈파베이스에 삭제 요청
    const { error } = await supabase.from('expenses').delete().eq('id', id);

    if (!error) {
      // 2. 성공 시 쥬스탄드에서 제거 (화면 자동 업데이트)
      removeExpense(id);
    }
  };

  return <div>RemoveExpense</div>;
};

export default RemoveExpense;
