import CreateExpense from '@/components/style-ui/expense/CreateExpense';
import ExpenseItemList from '@/components/style-ui/expense/ExpenseItemList';
// import LoadExpense from '@/components/style-ui/expense/LoadExpense';
// import TestCompo2 from '@/components/style-ui/expense/TestCompo';
import UserInfo from '@/components/style-ui/user/UserInfo';
import { supabaseServer } from '@/store/supabase/server';

const HomePage = async () => {
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

  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (!user) {
  //   console.warn('로그인한 유저가 없습니다.');
  //   return;
  // }

  // const { data, error } = await supabase
  //   .from('expense')
  //   .select('*')
  //   .eq('user_id', user?.id) // 내 데이터만
  //   .order('created_at', { ascending: false }); // 최신순 정렬

  // console.log('data?', data, user);

  return (
    <>
      {/* <TestCompo2 /> */}
      <UserInfo />
      {/* <ExpenseItemList /> */}

      <br />
      <br />
      <h3>create</h3>
      <CreateExpense />
      <br />
      <br />
      <h3>load</h3>
      <ExpenseItemList />
    </>
  );
};

export default HomePage;
