import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { supabaseClient } from '@/store/supabase/client';
import { ExpenseItemType } from '@/types/expense/ExpenseType';
// import { User } from '@supabase/supabase-js';

interface ExpenseState {
  expense: ExpenseItemType[];
  isInitialized: boolean;
  isLoading: boolean;

  loadExpenses: (userId: string) => void;
  setExpense: (expense: ExpenseItemType[]) => void;
  addExpense: (newExpense: ExpenseItemType) => void;
  updateExpense: (expense: ExpenseItemType) => void;
  deleteExpense: (id: string) => void;
}

/* 
  1. 동적으로 변하지 않는 데이터는 서버컴포넌트에서 쥬스탄드로 set 
  2. 동적으로 변하는 데이터는 쥬스탄드에서 받아서 set

  ex) user는 1번 expense 는 2번이 효율 좋음
*/

export const useExpenseStore = create<ExpenseState>()(
  devtools(
    (set) => ({
      expense: [],
      isInitialized: false,
      isLoading: false,
      loadExpenses: async (userId: string) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabaseClient
            .from('expense')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

          if (error) throw error;
          set({ expense: data || [] });
        } catch (error) {
          console.error('데이터 로드 실패:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      setExpense: (expense) => set({ expense, isInitialized: true }),

      addExpense: (newExpense: ExpenseItemType) =>
        set((state) => ({
          expense: [newExpense, ...state.expense],
        })),

      updateExpense: (updatedItem: ExpenseItemType) =>
        set((state) => ({
          expense: state.expense?.map((item) => {
            if (!item || !item.id) return item;
            // console.log('stroe?????????????', item, state.expense, updatedItem);

            return item.id === updatedItem.id ? updatedItem : item;
          }),
        })),

      // state는 스토어 전체
      deleteExpense: (id: string) =>
        set((state) => ({ expense: state.expense?.filter((item) => item.id !== id) })),
    }),
    { name: 'ExpenseStore' },
  ),
);
