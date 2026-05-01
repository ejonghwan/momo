'use client';
import { useEffect } from 'react';

import CreateExpense from '@/components/style-ui/expense/CreateExpense';
import ExpenseItemList from '@/components/style-ui/expense/ExpenseItemList';
// import TestCompo2 from '@/components/style-ui/expense/TestCompo';
import UserInfo from '@/components/style-ui/user/UserInfo';
import { supabase } from '@/store/supabase/client';
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

  // 클라이언트 컴포넌트 내부
  // useEffect(() => {
  //   console.log('브라우저 전체 쿠키:', document.cookie);

  //   const checkUser = async () => {
  //     const { data } = await supabase.auth.getUser();
  //     console.log('getUser 결과:', data.user);
  //   };

  //   checkUser();
  // }, []);

  return (
    <>
      {/* <TestCompo2 /> */}
      <UserInfo />
      {/* <ExpenseItemList /> */}

      <br />
      <br />
      <h3>create</h3>
      <CreateExpense />
    </>
  );
};

export default HomePage;
