'use client';
import { useEffect } from 'react';

import CreateExpense from '@/components/style-ui/expense/CreateExpense';
import ExpenseItemList from '@/components/style-ui/expense/ExpenseItemList';
// import TestCompo2 from '@/components/style-ui/expense/TestCompo';
import UserInfo from '@/components/style-ui/user/UserInfo';
import { formatComma } from '@/utils/utils';

const HomePage = () => {
  // const isLoggedIn = !!user; // 유저 정보가 있으면 true

  // const useIsMounted = () => {
  //   const [mounted, setMounted] = useState(false);
  //   useEffect(() => {
  //     setTimeout(() => { setMounted(true) }, 1000)
  //   }, []);
  //   return mounted;
  // };

  // const is = useIsMounted()

  return (
    <>
      {/* <TestCompo2 /> */}
      <UserInfo />
      <ExpenseItemList
        data={[
          {
            id: '1',
            user_id: 'ho',
            title: 'hooh',
            memo: 'memo',
            amount: formatComma(333333),
            is_income: false,
            category: ['how'],
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
            category: ['how'],
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
            category: ['how'],
            created_at: '2026-04-05',
            updated_at: null,
          },
        ]}
      />

      <br />
      <br />
      <h3>create</h3>
      <CreateExpense />
    </>
  );
};

export default HomePage;
