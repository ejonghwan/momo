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
}


const UxImage = ({ wrapClassName, wrapTag, src, width, height, alt = "", isNextImg = false, style, ...props }: CustomImageProps) => {

  const Component = wrapTag || 'div'
  return (
    <Component className={wrapClassName} style={{ position: "reletive" }}>
      {isNextImg ? (
        <Image src={src} {...props} width={width} height={height} alt={alt} style={style} />
      ) : (
        <img src={src} {...props} width={width} height={height} alt={alt} style={style} />
      )}
    </Component>
  )
}

export default UxImage