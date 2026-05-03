'use client';

interface Props {
  assets: string[] | undefined;
}

const UserInfoAssets = ({ assets }: Props) => {
  return (
    <div>
      {assets && assets.length > 0 ? assets : <span>0개</span>}
      <button type="button">카드/계좌 등록하기</button>
    </div>
  );
};

export default UserInfoAssets;
