// import React, { useState } from 'react';

import { useState } from 'react';

import clsx from 'clsx';

import { Banks } from '@/types/user/UserType';

import style from '@/styles/common/UxSelectBank.module.scss';

// import clsx from 'clsx';

// import { Banks } from '@/types/user/UserType';

// import style from '@/styles/common/UxSelectBank.module.scss';

// // --------------------------------------------------- UxSelectBank [S]

// interface Props {
//   data: Banks;
//   classNames?: string;
//   isActive: boolean;
//   onClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
// }

// export const UxSelectBankItem = ({ data, classNames, onClick, isActive }: Props) => {
//   return (
//     <div
//       className={clsx(style['banklist__item'], classNames, {
//         [style['banklist__item--active']]: isActive,
//       })}
//     >
//       {onClick ? (
//         <>
//           <button key={data.id} type={'button'} onClick={(e) => onClick(e, data.id)}>
//             {data.name}
//           </button>
//         </>
//       ) : (
//         <>
//           <span key={data.id}>{data.name}</span>
//         </>
//       )}
//     </div>
//   );
// };

// // --------------------------------------------------- UxSelectBank [E]

// // --------------------------------------------------- UxSelectBankWrap [S]

// interface UxSelectBankWrapProps {
//   children: React.ReactNode;
//   classNames?: string;
//   isOne: boolean; // 하나만 선택하게 할건지. 기본 다중선택 + 토글
//   onClick?: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
// }

// export const UxSelectBankWrap = ({
//   children,
//   isOne,
//   isActive,
//   classNames,
//   onClick,
// }: UxSelectBankWrapProps) => {
//   const [isActive, setIsActive] = useState(false);

//   const handleClickBankItem = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
//     setIsActive((prev) => !prev);
//     onClick?.(e, id);
//   };

//   return <div className={clsx(style['banklist__wrap'], classNames)}>{children}</div>;
// };

// // --------------------------------------------------- UxSelectBankWrap [E]

// UxSelectBankWrap.tsx (부모)
export const UxSelectBankWrap = ({ children, classNames, isOne = false, onSelect }: any) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  //   const handleSelect = (id: string) => {
  //     if (isOne) {
  //       setSelectedId(id);
  //     } else {
  //       onSelect?.(id);
  //     } // 하나만 선택되는 로직
  //   };

  // 자식들에게 현재 선택 상태를 주입하기 위해 React.Children.map 등을 쓸 수 있지만,
  // 가장 편한 건 사용처에서 직접 넘기는 것입니다. (아래 2번 참고)
  return <div className={clsx(style['banklist__wrap'], classNames)}>{children}</div>;
};

interface Props {
  data: Banks;
  classNames?: string;
  isActive: boolean; // 부모가 결정해서 내려줌
  onClick?: (id: string) => void;
}

export const UxSelectBankItem = ({ data, classNames, isActive, onClick }: Props) => {
  return (
    <div
      className={clsx(style['banklist__item'], classNames, {
        [style['banklist__item--active']]: isActive, // 모듈 사스라면 style[]로 감싸야 함
      })}
    >
      <button type="button" onClick={() => onClick?.(data.id)}>
        {data.name}
      </button>
    </div>
  );
};
