import React from 'react'
import UxImage from '@/components/style-ui/common/UxImage'


const UserAvatar = ({ avatartUrl }: { avatartUrl: string }) => {

   console.log('avatartUrl??', avatartUrl)

   return (
      <UxImage
         uiType='circle'
         src={avatartUrl}
         alt=""
         fill
         style={{ objectFit: 'cover' }}
         isNextImg
         nextImgWidth='20rem'
         nextImgHeight='20rem'
      />
   )
}

export default UserAvatar