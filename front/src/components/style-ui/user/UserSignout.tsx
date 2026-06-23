import { useState } from 'react';

import { supabaseClient } from '@/store/supabase/client';

// Supabase 클라이언트 설정 (상황에 맞게 경로 수정)
// const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

const UserSignout = () => {
  const [loading, setLoading] = useState(false);

  //   const handleWithdrawal = async () => {
  //     const confirmWithdraw = window.confirm(
  //       '정말로 탈퇴하시겠습니까? 탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.',
  //     );

  //     if (!confirmWithdraw) return;

  //     setLoading(true);

  //     try {
  //       // 1. 현재 로그인한 유저 정보 가져오기
  //       const {
  //         data: { user },
  //         error: userError,
  //       } = await supabaseClient.auth.getUser();

  //       if (userError || !user) {
  //         alert('로그인 정보가 없거나 만료되었습니다.');
  //         return;
  //       }

  //       const { error: deleteError } = await supabaseClient.from('users').delete().eq('id', user.id);

  //       if (deleteError) throw deleteError;

  //       await supabaseClient.auth.signOut();
  //       alert('회원탈퇴가 정상적으로 완료되었습니다.');

  //       window.location.href = '/';
  //     } catch (error) {
  //       console.error('회원탈퇴 중 오류 발생:', error);
  //       alert('회원탈퇴 처리에 실패했습니다. 다시 시도해 주세요.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleWithdrawal = async () => {
    const confirmWithdraw = window.confirm(
      '정말로 탈퇴하시겠습니까? 데이터가 모두 삭제되며 복구할 수 없습니다.',
    );

    if (!confirmWithdraw) return;

    setLoading(true);

    try {
      // 💡 딱 이 RPC 함수 하나만 호출하면 DB(public.users)와 계정(auth.users)이 동시에 날아갑니다.
      const { error: rpcError } = await supabaseClient.rpc('delete_user_self');

      if (rpcError) {
        throw rpcError;
      }

      // 탈퇴 후 남아있는 세션 로그아웃 처리
      await supabaseClient.auth.signOut();

      alert('회원탈퇴가 정상적으로 완료되었습니다.');
      window.location.href = '/';
    } catch (error) {
      console.error('회원탈퇴 중 오류 발생:', error);
      alert(`탈퇴 처리 실패: ${error || '알 수 없는 오류'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>회원 탈퇴</h2>
      <p>아래 버튼을 누르면 계정이 영구 삭제됩니다.</p>
      <button
        onClick={handleWithdrawal}
        disabled={loading}
        style={{
          backgroundColor: '#ff4d4f',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? '탈퇴 처리 중...' : '회원 탈퇴하기'}
      </button>
    </div>
  );
};

export default UserSignout;
