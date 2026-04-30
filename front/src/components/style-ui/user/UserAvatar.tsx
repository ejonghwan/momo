import React, { StyleHTMLAttributes } from 'react';
import UxImage from '@/components/style-ui/common/UxImage';

interface AvatarProps {
  avatartUrl: string;
  nextImgWidth: string;
  nextImgHeight: string;
  style: React.CSSProperties;
}

const UserAvatar = ({
  avatartUrl,
  nextImgWidth = '30rem',
  nextImgHeight = '30rem',
  style,
}: AvatarProps) => {
  console.log('avatartUrl??', avatartUrl);

  return (
    <UxImage
      uiType="circle"
      src={avatartUrl}
      alt=""
      fill
      style={style}
      isNextImg
      nextImgWidth={nextImgWidth}
      nextImgHeight={nextImgHeight}
    />
  );
};

export default UserAvatar;
