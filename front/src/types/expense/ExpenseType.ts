export interface ExpenseItemType {
  id: string;
  user_id: string;
  title: string; // 소비한 내역
  description?: string; // 메모
  amount: number;
  transaction_type: 'in' | 'out' | 'transfer'; // 수입, 지출, 자산이동
  category?: string[]; // 소비한 카테고리
  date: string;

  // 아래 4개는 나중에 구현하기
  assets: string[]; // 자산들. 카드 or 계좌
  default_asset: string; // 기본 선택한 자산
  from_account: string; // 어디에서
  to_account: string; // 어디로 보냈는지

  created_at: string;
  updated_at: string | null;
}

export interface CreateExpenseItemType {
  user_id: string;
  title: string;
  description?: string;
  amount: number;
  transaction_type: 'in' | 'out' | 'transfer';
  category?: string[];
  date: string;
}
