'use client';

import clsx from 'clsx';

import LoginButton from '@/components/style-ui/user/LoginButton';
import LoginButtonKaKao from '@/components/style-ui/user/LoginButtonKaKao';
import LogoutButton from '@/components/style-ui/user/LogoutButton';
import UserAvatar from '@/components/style-ui/user/UserAvatar';
import UserInfoSelfCategory from '@/components/style-ui/user/UserInfoSelfCategory';
import { useUserStore } from '@/store/front/useUserStore';

import UserInfoAssets from './UserInfoAssets';
import UserInfoDefaultAssets from './UserInfoDefaultAssets';

import style from '@/styles/components/user/UserInfo.module.scss';

const UserInfo = () => {
  const user = useUserStore((state) => state.user);
  const profile = useUserStore((state) => state.profile);
  const isInitialized = useUserStore((state) => state.isInitialized);

  if (!isInitialized) {
    return (
      <div className="loading-container">
        {/* <Skeleton width="50px" height="50px" borderRadius="50%" />
           <p>사용자 정보를 확인하고 있습니다...</p> */}
      </div>
    );
  }

  if (isInitialized && !user) {
    return (
      <div>
        <LoginButton />
        <LoginButtonKaKao />
        로그인이 필요합니다.
      </div>
    );
  }

  if (isInitialized && user) {
    return (
      <>
        <div>user info</div>
        {user.user_metadata?.avatar_url && (
          <div className={style['user__info__wrap']}>
            {/* <Skeleton width={"50px"} height={"50px"} borderRadius={"50%"} /> */}
            <div>{user && <LogoutButton />}</div>
            {/* <img src={user.user_metadata.avatar_url} alt="profile" width={50} /> */}
            <UserAvatar
              avatartUrl={user.user_metadata.avatar_url}
              nextImgHeight="50rem"
              nextImgWidth="50rem"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
            <div>{user.user_metadata.email}</div>
            <div>{user.user_metadata.full_name}</div>
            <div
              className={clsx(
                style['user__info__wrap--provider'],
                user.app_metadata.provider?.slice(0, 1) === 'g' ? 'g' : 'k',
              )}
            >
              {user.app_metadata.provider?.slice(0, 1).toLocaleUpperCase()}
            </div>
            <div>클래스 : {profile?.class}</div>
            <div>
              닉네임 :{' '}
              {profile?.nickname ? profile?.nickname : <button type="button">닉네임 설정</button>}
            </div>
            <div>
              셀프 카테고리 : <UserInfoSelfCategory categorys={profile?.self_categorys} />
            </div>
            <div>
              카드 or 계좌들 : <UserInfoAssets assets={profile?.assets} />
            </div>
            <div>
              디폴트 : <UserInfoDefaultAssets defalutAssets={profile?.default_asset} />
            </div>

            <br />
            <div>마지막 접속일 : {profile?.last_sign_in}</div>
            <div>가입일 : {profile?.created_at}</div>
            <div>개인정보 수정일 : {profile?.updated_at}</div>
          </div>
        )}
      </>
    );
  }
};

export default UserInfo;
