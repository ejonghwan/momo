'use client';

interface Props {
  defalutAssets: string | undefined;
}

const UserInfoDefaultAssets = ({ defalutAssets }: Props) => {
  // 이 컴포넌트는 assets랑 합칠지 고민중
  return (
    <div>
      {defalutAssets ? defalutAssets : <span>기본 설정된 카드가 없습니다</span>}
      <button type="button">기본 카드/계좌 등록하기</button>
    </div>
  );
};

export default UserInfoDefaultAssets;
