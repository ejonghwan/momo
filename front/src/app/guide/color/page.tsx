import clsx from 'clsx';

import { UxText } from '@/components/style-ui/common/UxText';

import style from '@/app/guide/guide.module.scss';

const ColorGuide = () => {
  const color = {
    gray: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    greyOpacity: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    blue: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    red: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    orange: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    yellow: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    green: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    teal: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    purple: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    bg_white: [],
    bg_gray: [],
  };

  return (
    <>
      <h1>
        <UxText variant={'H_22_M'}>Color</UxText>
      </h1>
      <ul className={style['color__wrap']}>
        {/* gray */}
        <li className={style['color__wrap__item']}>
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
        {/* greyOpacity */}
        <li className={style['color__wrap__item']}>
          <h2>
            <UxText variant={'C_19_M'}>greyOpacity</UxText>
          </h2>
          {color?.greyOpacity.map((item) => (
            <span
              key={item}
              className={clsx(`bg_grey_${item} ${style[item >= 600 ? 'upup' : '']}`)}
            >
              .bg_greyOpacity_{item}
            </span>
          ))}
        </li>

        {/* blue */}
        <li className={style['color__wrap__item']}>
          <h2>
            <UxText variant={'C_19_M'}>blue</UxText>
          </h2>
          {color?.blue.map((item) => (
            <span
              key={item}
              className={clsx(`bg_blue_${item} ${style[item >= 600 ? 'upup' : '']}`)}
            >
              .bg_blue_{item}
            </span>
          ))}
        </li>
        {/* red */}
        <li className={style['color__wrap__item']}>
          <h2>
            <UxText variant={'C_19_M'}>red</UxText>
          </h2>
          {color?.red.map((item) => (
            <span key={item} className={clsx(`bg_red_${item} ${style[item >= 600 ? 'upup' : '']}`)}>
              .bg_red_{item}
            </span>
          ))}
        </li>
        {/* orange */}
        <li className={style['color__wrap__item']}>
          <h2>
            <UxText variant={'C_19_M'}>orange</UxText>
          </h2>
          {color?.orange.map((item) => (
            <span
              key={item}
              className={clsx(`bg_orange_${item} ${style[item >= 600 ? 'upup' : '']}`)}
            >
              .bg_orange_{item}
            </span>
          ))}
        </li>
        {/* yellow */}
        <li className={style['color__wrap__item']}>
          <h2>
            <UxText variant={'C_19_M'}>yellow</UxText>
          </h2>
          {color?.yellow.map((item) => (
            <span
              key={item}
              className={clsx(`bg_yellow_${item} ${style[item >= 600 ? 'upup' : '']}`)}
            >
              .bg_yellow_{item}
            </span>
          ))}
        </li>
        {/* gray */}
        <li className={style['color__wrap__item']}>
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
        {/* green */}
        <li className={style['color__wrap__item']}>
          <h2>
            <UxText variant={'C_19_M'}>green</UxText>
          </h2>
          {color?.green.map((item) => (
            <span
              key={item}
              className={clsx(`bg_green_${item} ${style[item >= 600 ? 'upup' : '']}`)}
            >
              .bg_green_{item}
            </span>
          ))}
        </li>
        {/* teal */}
        <li className={style['color__wrap__item']}>
          <h2>
            <UxText variant={'C_19_M'}>teal</UxText>
          </h2>
          {color?.teal.map((item) => (
            <span
              key={item}
              className={clsx(`bg_teal_${item} ${style[item >= 600 ? 'upup' : '']}`)}
            >
              .bg_teal_{item}
            </span>
          ))}
        </li>
        {/* purple */}
        <li className={style['color__wrap__item']}>
          <h2>
            <UxText variant={'C_19_M'}>purple</UxText>
          </h2>
          {color?.purple.map((item) => (
            <span
              key={item}
              className={clsx(`bg_purple_${item} ${style[item >= 600 ? 'upup' : '']}`)}
            >
              .bg_purple_{item}
            </span>
          ))}
        </li>
        {/* purple */}
        <li className={style['color__wrap__item']}>
          <h2>
            <UxText variant={'C_19_M'}>white / gray</UxText>
          </h2>
          <span className={`bg_white`} style={{ border: '1px solid #eee' }}>
            .bg_white
          </span>
          <span className={`bg_gray`}>.bg_gray</span>
        </li>
      </ul>
    </>
  );
};

export default ColorGuide;
