import React from 'react';

import Contents from '@/components/pages/common/Contents';
import Header from '@/components/pages/common/Header';
import UserInfo from '@/components/style-ui/user/UserInfo';

const UserInfoPage = () => {
  return (
    <>
      <Header uiType="sub" pageName={'내 정보'} />
      <Contents>
        <UserInfo />
      </Contents>
    </>
  );
};

export default UserInfoPage;
