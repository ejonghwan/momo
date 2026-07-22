import { useState } from 'react';

import UxButton from '@/components/style-ui/common/UxButton';
import { supabaseClient } from '@/store/supabase/client';

// Supabase 클라이언트 설정 (상황에 맞게 경로 수정)
// const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

const UserSignout = () => {
  const [loading, setLoading] = useState(false);

  const handleWithdrawal = async () => {
    const confirmWithdraw = window.confirm(
      '정말로 탈퇴하시겠습니까? 데이터가 모두 삭제되며 복구할 수 없습니다.',
    );

    if (!confirmWithdraw) return;

    setLoading(true);

    try {
      const { error: rpcError } = await supabaseClient.rpc('delete_user_self');

      if (rpcError) {
        throw rpcError;
      }

      await supabaseClient.auth.signOut();
      await setTimeout(() => {
        console.log('ho');
      }, 2000);
      alert('회원탈퇴가 정상적으로 완료되었습니다.');
      window.location.href = '/';
      setLoading(false);
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

      <UxButton
        type="button"
        variant={'text'}
        size={'xlarge'}
        _color={'danger'}
        state={loading ? 'loading' : 'default'}
        onClick={handleWithdrawal}
        disabled={loading}
      >
        회원 탈퇴하기
      </UxButton>
    </div>
  );
};

export default UserSignout;
