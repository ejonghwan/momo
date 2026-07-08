'use client';

import { ChangeEvent, Children, useState } from 'react';

import clsx from 'clsx';

import UxTextField from '@/components/style-ui/common/UxTextField';
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

  const [testtt, setTesttt] = useState('');
  const handleChangeTT = (e: ChangeEvent<HTMLInputElement>) => {
    setTesttt(e.target.value);
  };

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
        <div>
          <p>input test</p>
          <UxTextField
            value={testtt}
            variant={'search'}
            size={'xsmall'}
            onChange={(e) => handleChangeTT(e)}
            message={{
              children: <>asdasd</>,
            }}
          />
        </div>

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
            <div>클래스 : {profile?.role}</div>
            <div>
              닉네임 :{' '}
              {profile?.nickname ? profile?.nickname : <button type="button">닉네임 설정</button>}
            </div>
            <div>
              셀프 카테고리 : <UserInfoSelfCategory categorys={profile?.self_categorys} />
            </div>
            <hr />
            <br />
            <hr />
            <div>
              카드 or 계좌들 : <UserInfoAssets />
            </div>
            <hr />
            <br />
            <hr />
            <div>
              디폴트 : <UserInfoDefaultAssets />
            </div>
            <hr />
            <br />

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
