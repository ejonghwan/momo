'use client';

import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import LoginButton from '@/components/style-ui/user/LoginButton';
import LoginButtonKaKao from '@/components/style-ui/user/LoginButtonKaKao';
import LogoutButton from '@/components/style-ui/user/LogoutButton';
import UserAvatar from '@/components/style-ui/user/UserAvatar';
import UserInfoEdit from '@/components/style-ui/user/UserInfoEdit';
import { useUserStore } from '@/store/front/useUserStore';

import style from '@/styles/components/user/UserInfo.module.scss';

const UserInfo = () => {
  const user = useUserStore((state) => state.user);
  const profile = useUserStore((state) => state.profile);
  const isInitialized = useUserStore((state) => state.isInitialized);
  const [isEdit, setIsEdit] = useState<boolean>(false);

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
              셀프 카테고리 :
              {profile?.self_categorys ? (
                profile?.self_categorys
              ) : (
                <button type="button">자주사용하는 카테고리 설정하기</button>
              )}
            </div>
            <div>
              카드 or 계좌들 :
              {profile?.assets ? (
                profile?.assets
              ) : (
                <button type="button">카드/계좌 등록하기</button>
              )}
            </div>
            <div>
              디폴트 asset :
              {profile?.default_asset ? (
                profile?.default_asset
              ) : (
                <button type="button">기본 카드/계좌 등록하기</button>
              )}
            </div>

            <br />
            <div>마지막 접속일 : {profile?.last_sign_in}</div>
            <div>가입일 : {profile?.created_at}</div>
            <div>개인정보 수정일 : {profile?.updated_at}</div>
          </div>
        )}
        <button type="button" onClick={() => setIsEdit((prev) => !prev)}>
          정보 수정
        </button>

        {isEdit && <UserInfoEdit />}
      </>
    );
  }
};

export default UserInfo;
