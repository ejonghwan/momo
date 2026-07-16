import clsx from 'clsx';

import { UxText } from '@/components/style-ui/common/UxText';

import style from '@/app/guide/guide.module.scss';

const ButtonGuide = () => {
  return (
    <>
      <h1>
        <UxText variant={'H_22_M'}>Button</UxText>
      </h1>
      <ul className={style['button__wrap']}>
        <li className={style['button__wrap__item']}>
          <h2>
            <UxText variant={'C_19_M'}>gray</UxText>
          </h2>
          {color?.gray.map((item) => (
            <span
              key={item}
              className={clsx(`bg_grey_${item} ${style[item >= 600 ? 'upup' : '']}`)}
            >
              .bg_grey_{item}
            </span>
          ))}
        </li>
      </ul>
    </>
  );
};

export default ButtonGuide;
