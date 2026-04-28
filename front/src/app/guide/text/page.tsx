import React from 'react';

import { UxText } from '@/components/style-ui/common/UxText';

const Text = () => {
  return (
    <div>
      <div>
        <h1>가장 큰 제목</h1>
        <UxText variant={'H_30_R'}>Typography : H_30_R</UxText> <br />
        <UxText variant={'H_30_M'}>Typography : H_30_M</UxText> <br />
        <UxText variant={'H_30_SB'}>Typography : H_30_SB</UxText> <br />
        <UxText variant={'H_30_B'}>Typography : H_30_B</UxText>
      </div>
    </div>
  );
};

export default Text;
