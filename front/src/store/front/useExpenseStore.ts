import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ExpenseItemType } from '@/types/expense/ExpenseType';
// import { User } from '@supabase/supabase-js';

interface ExpenseState {
  expense: ExpenseItemType[] | null;
  isInitialized: boolean;
  setExpense: (expense: ExpenseItemType[]) => void;
  updateExpense: (expense: ExpenseItemType) => void;
  removeExpense: (id: string) => void;
}

export const useExpenseStore = create<ExpenseState>()(
  devtools(
    (set) => ({
      expense: [],
      isInitialized: false,
      setExpense: (expense) => set({ expense, isInitialized: true }),

      // createExpense: (newExpense: ExpenseItemType) => set((state) => {})

      updateExpense: (updatedItem: ExpenseItemType) =>
        set((state) => ({
          expense: state.expense?.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
        })),

      // state는 스토어 전체
      removeExpense: (id: string) =>
        set((state) => ({ expense: state.expense?.filter((item) => item.id !== id) })),
    }),
    { name: 'UserStore' },
  ),
);
