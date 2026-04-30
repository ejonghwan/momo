export interface ExpenseItemType {
  id: string;
  user_id: string;
  title: string;
  memo?: string;
  amount: number | string;
  is_income: boolean;
  category?: string | null;
  created_at: string;
  updated_at: string | null;
}
