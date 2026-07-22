'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import UxButton from '@/components/style-ui/common/UxButton';
import { UxText } from '@/components/style-ui/common/UxText';

import style from '@/app/guide/guide.module.scss';

const ButtonGuide = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading((prev) => !prev);
    }, 3000);
  }, []);

  return (
    <>
      <h1>
        <UxText variant={'H_22_M'}>Button</UxText>
      </h1>
      <ul className={style['button__wrap']}>
        <li className={style['button__wrap__item']}>
          <h2>
            <UxText variant={'C_19_M'}>size</UxText>
          </h2>
          <UxButton type="button" variant={'text'} size={'xlarge'} state={'loading'}>
            text
          </UxButton>
          <UxButton type="button" variant={'fill'} size={'small'} state={'loading'}>
            text
          </UxButton>
          <UxButton
            type="button"
            variant={'fill'}
            size={'large'}
            disabled={false}
            state={'loading'}
            arrow={'right'}
          >
            arrow
          </UxButton>
        </li>
        <li className={style['button__wrap__item']}>
          <h2>
            <UxText variant={'C_19_M'}>color</UxText>
          </h2>
          <UxButton type="button" _color={'primary'} variant={'text'} size={'large'}>
            primary
          </UxButton>
          <UxButton type="button" _color={'danger'} variant={'text'} size={'large'}>
            danger
          </UxButton>
          <UxButton type="button" _color={'dark'} variant={'text'} size={'large'}>
            dark
          </UxButton>
          <UxButton type="button" _color={'light'} variant={'text'} size={'large'}>
            light
          </UxButton>
        </li>
      </ul>
    </>
  );
};

export default ButtonGuide;
