import { ExpenseItemType } from '@/types/expense/ExpenseType';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
// import { User } from '@supabase/supabase-js';

interface ExpenseState {
  expense: null | undefined;
  isInitialized: boolean;
  setExpense: (expense: ExpenseItemType | null) => void;
}

export const useExpenseStore = create<ExpenseState>()(
  devtools(
    (set) => ({
      expense: null,
      isInitialized: false,
      setExpense: (expense) => set({ expense, isInitialized: true }),
    }),
    { name: 'UserStore' },
  ),
);
