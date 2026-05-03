'use client';

import { useState } from 'react';

interface Props {
  categorys: string[] | undefined;
}

const UserInfoEdit = ({ categorys }: Props) => {
  const [isEdit, setisEdit] = useState<boolean>(false);

  const handleClickEdit = () => {
    setisEdit((prev) => !prev);
  };
  const handleClickCancel = () => {
    setisEdit((prev) => !prev);
  };

  return (
    <div>
      {isEdit ? (
        <>
          {categorys?.map((item, key) => (
            <span key={key}>{item}</span>
          ))}
          <button type="button" onClick={handleClickCancel}>
            cancel
          </button>
        </>
      ) : (
        <>
          {categorys?.length && categorys.length > 0 ? categorys : <span>0개</span>}
          <button type="button" onClick={handleClickEdit}>
            자주사용하는 카테고리 설정하기
          </button>
        </>
      )}
    </div>
  );
};

export default UserInfoEdit;
