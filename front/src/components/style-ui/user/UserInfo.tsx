'use client';

import { Button, Flex, Skeleton } from '@radix-ui/themes';
import clsx from 'clsx';

import { UxText } from '@/components/style-ui/common/UxText';
import LoginButton from '@/components/style-ui/user/LoginButton';
import LoginButtonKaKao from '@/components/style-ui/user/LoginButtonKaKao';
import LogoutButton from '@/components/style-ui/user/LogoutButton';
import UserAvatar from '@/components/style-ui/user/UserAvatar';
import UserInfoSelfCategory from '@/components/style-ui/user/UserInfoSelfCategory';
import UserSignout from '@/components/style-ui/user/UserSignout';
import { useUserStore } from '@/store/front/useUserStore';

import UserInfoAssets from './UserInfoAssets';
import UserInfoDefaultAssets from './UserInfoDefaultAssets';

import style from '@/styles/components/user/UserInfo.module.scss';

const UserInfo = () => {
  const user = useUserStore((state) => state.user);
  const profile = useUserStore((state) => state.profile);
  const isInitialized = useUserStore((state) => state.isInitialized);

  const datetest = (str: string) => new Date(str).toDateString();

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
        {user.user_metadata?.avatar_url && (
          <div className={style['user__info__wrap']}>
            {/* <Skeleton width={'50px'} height={'50px'} borderRadius={'50%'} /> */}
            {/* <img src={user.user_metadata.avatar_url} alt="profile" width={50} /> */}

            <div className={style['user__info__avatar']}>
              <UserAvatar
                avatartUrl={user.user_metadata.avatar_url}
                nextImgHeight="80rem"
                nextImgWidth="80rem"
                style={{ objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
            <div className={style['user__info__name']}>
              <UxText variant={'H_20_M'}>{user.user_metadata.full_name}</UxText>
              {user && <LogoutButton />}
            </div>
            <div>{user.user_metadata.email}</div>
            {/* <div
              className={clsx(
                style['user__info__wrap--provider'],
                user.app_metadata.provider?.slice(0, 1) === 'g' ? 'g' : 'k',
              )}
            >
              {user.app_metadata.provider?.slice(0, 1).toLocaleUpperCase()}
            </div> */}
            <div
              className={clsx(
                style['user__info__wrap--provider'],
                user.app_metadata.provider?.slice(0, 1) === 'g' ? 'g' : 'k',
              )}
            >
              {user.app_metadata.provider?.slice(0, 1).toLocaleUpperCase()}
            </div>
            <div>클래스 : {profile?.role}</div>
            {/* <div>
              닉네임 :{' '}
              {profile?.nickname ? profile?.nickname : <button type="button">닉네임 설정</button>}
            </div> */}
            <div>
              셀프 카테고리 : <UserInfoSelfCategory categorys={profile?.self_categorys} />
            </div>
            <div>
              카드 or 계좌들 : <UserInfoAssets />
            </div>
            <div>
              디폴트 : <UserInfoDefaultAssets />
            </div>
            <br />
            <div>마지막 접속일 : {datetest(profile?.last_sign_in as string)}</div>
            <div>가입일 : {datetest(profile?.created_at as string)}</div>
            <div>개인정보 수정일 : {datetest(profile?.updated_at as string)}</div>
            <div>
              <UserSignout />
            </div>
          </div>
        )}
      </>
    );
  }
};

export default UserInfo;
