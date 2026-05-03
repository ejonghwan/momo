'use client';

import { useExpenseStore } from '@/store/front/useExpenseStore';
import { supabaseClient } from '@/store/supabase/client';

const DeleteExpense = ({ id }: { id: string }) => {
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);

  const handleDelete = async () => {
    if (!confirm('정말 삭제 하시겠습니까?')) return;

    const { error } = await supabaseClient.from('expense').delete().eq('id', id);

    if (!error) {
      deleteExpense(id);
    }
  };

  return (
    <button type="button" onClick={handleDelete}>
      삭제
    </button>
  );
};

export default DeleteExpense;
