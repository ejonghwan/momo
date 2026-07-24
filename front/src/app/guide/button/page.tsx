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
      <ul className={style['g__button__wrap']}>
        <li className={style['g__button__item']}>
          <h2>
            <UxText variant={'C_19_M'}>size</UxText>
          </h2>

          <UxButton
            type="button"
            display={'inline'}
            _color={'primary'}
            variant={'text'}
            size={'xlarge'}
          >
            xlarge
          </UxButton>
          <UxButton type="button" display={'inline'} variant={'fill'} size={'large'}>
            large
          </UxButton>
          <UxButton type="button" display={'inline'} variant={'fill'} size={'medium'}>
            medium
          </UxButton>
          <UxButton type="button" display={'inline'} variant={'fill'} size={'small'}>
            small
          </UxButton>
          <UxButton type="button" display={'inline'} variant={'fill'} size={'none'}>
            none
          </UxButton>
        </li>
        <li className={style['g__button__item']}>
          <h2>
            <UxText variant={'C_19_M'}>color</UxText>
          </h2>
          <UxButton type="button" _color={'primary'} variant={'fill'} size={'large'}>
            primary
          </UxButton>
          <UxButton type="button" _color={'danger'} variant={'fill'} size={'large'}>
            danger
          </UxButton>
          <UxButton type="button" _color={'dark'} variant={'fill'} size={'large'}>
            dark
          </UxButton>
          <UxButton type="button" _color={'light'} variant={'fill'} size={'large'}>
            light
          </UxButton>
        </li>
        <li className={style['g__button__item']}>
          <h2>
            <UxText variant={'C_19_M'}>disabeld</UxText>
          </h2>
          <UxButton type="button" disabled _color={'primary'} variant={'fill'} size={'large'}>
            primary
          </UxButton>
          <UxButton type="button" disabled _color={'danger'} variant={'fill'} size={'large'}>
            danger
          </UxButton>
          <UxButton type="button" disabled _color={'dark'} variant={'fill'} size={'large'}>
            dark
          </UxButton>
          <UxButton type="button" disabled _color={'light'} variant={'fill'} size={'large'}>
            light
          </UxButton>
        </li>
        <li className={style['g__button__item']}>
          <h2>
            <UxText variant={'C_19_M'}>state</UxText>
          </h2>
          <UxButton
            type="button"
            variant={'fill'}
            size={'large'}
            disabled={false}
            state={'default'}
            arrow={'right'}
          >
            default
          </UxButton>
          <UxButton
            type="button"
            variant={'fill'}
            size={'large'}
            disabled={false}
            state={'loading'}
            arrow={'right'}
          >
            loading
          </UxButton>
        </li>
        <li className={style['g__button__item']}>
          <h2>
            <UxText variant={'C_19_M'}>arrow</UxText>
          </h2>
          <UxButton
            type="button"
            variant={'fill'}
            size={'large'}
            disabled={false}
            state={'loading'}
            arrow={'right'}
          >
            arrow right
          </UxButton>
        </li>
        <li className={style['g__button__item']}>
          <h2>
            <UxText variant={'C_19_M'}>as</UxText>
          </h2>
          <UxButton
            as="button"
            type="submit"
            variant={'fill'}
            size={'large'}
            disabled={false}
            arrow={'right'}
          >
            button
          </UxButton>
          <UxButton
            as="a"
            variant={'fill'}
            size={'large'}
            disabled={false}
            state={'loading'}
            arrow={'right'}
          >
            a
          </UxButton>
        </li>
      </ul>
    </>
  );
};

export default ButtonGuide;
