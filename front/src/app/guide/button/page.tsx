import clsx from 'clsx';

import UxButton from '@/components/style-ui/common/UxButton';
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
            <UxText variant={'C_19_M'}>aaaa</UxText>
          </h2>
          <UxButton type="button" variant={'text'} size={'xlarge'} desabled state={'loading'}>
            text
          </UxButton>
          <UxButton type="button" variant={'fill'} size={'small'} desabled state={'loading'}>
            text
          </UxButton>
        </li>
      </ul>
    </>
  );
};

export default ButtonGuide;
