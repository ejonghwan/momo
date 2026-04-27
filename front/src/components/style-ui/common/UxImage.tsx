import Image, { ImageProps } from 'next/image';
import { ElementType } from 'react'

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
  uiType: "pure" | "circle" | "quadrangle_20" | "quadrangle_80" | "quadrangle_100"
}


const UxImage = ({
  uiType,
  wrapClassName,
  wrapTag,
  src,
  width,
  height,
  alt = "",
  isNextImg = false,
  nextImgWidth,
  nextImgHeight,
  style,
  ...props
}: CustomImageProps) => {

  const Component = wrapTag || 'div';



  return (
    <>
      {
        isNextImg ? (
          <Component className={wrapClassName} style={{ position: "relative", width: nextImgWidth, height: nextImgHeight }} >
            <Image src={src} {...props} width={width} height={height} alt={alt} style={style} />
          </Component >
        ) : (
          <Component className={wrapClassName}>
            <img src={src} {...props} width={width} height={height} alt={alt} style={style} />
          </Component>
        )}
    </>
  )
}

export default UxImage