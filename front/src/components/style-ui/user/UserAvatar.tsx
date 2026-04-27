import React from 'react'
import UxImage from '@/components/style-ui/common/UxImage'


const UserAvatar = ({ avatartUrl }: { avatartUrl: string } ) => {

   console.log('avatartUrl??', avatartUrl)

   return (
      <div style={{ width: "20rem", height: "auto" }}>
         <UxImage src={avatartUrl} alt="" fill style={{ objectFit: 'cover' }} isNextImg />
      </div>
   )
}

export default UserAvatar