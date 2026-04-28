import { ElementType } from 'react';
import Image, { ImageProps } from 'next/image';

interface CustomImageProps extends ImageProps {
  wrapClassName?: string;
  wrapTag?: ElementType | string;
  // props?: any;
  src: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  isNextImg?: boolean;
  nextImgWidth?: string;
  nextImgHeight?: string;
  uiType: 'pure' | 'circle' | 'quadrangle_20' | 'quadrangle_80' | 'quadrangle_100';
}

const UxImage = ({
  uiType = 'pure',
  wrapClassName,
  wrapTag,
  src,
  width,
  height,
  alt = '',
  isNextImg = false,
  nextImgWidth,
  nextImgHeight,
  style,
  ...props
}: CustomImageProps) => {
  const Component = wrapTag || 'div';

  return (
    <>
      {isNextImg ? (
        <Component
          className={wrapClassName}
          style={{ position: 'relative', width: nextImgWidth, height: nextImgHeight }}
        >
          <Image src={src} {...props} width={width} height={height} alt={alt} style={style} />
        </Component>
      ) : (
        <Component className={wrapClassName}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} {...props} width={width} height={height} alt={alt} style={style} />
        </Component>
      )}
    </>
  );
};

export default UxImage;
