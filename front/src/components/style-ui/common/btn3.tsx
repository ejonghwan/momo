import { Button } from '@/react/headless-ui';
import HxIcon, { HxIconProps } from '@/react/styled-ui/atoms/icon/HxIcon';
import HxImage from '@/react/styled-ui/atoms/image/HxImage'
import { HxLottie } from '@/react/styled-ui/index-utils';
import styles from '@assets/style/components/button.module.scss';
import { usePreventDuplicate } from '@oqf/shared-common/hooks';
import clsx from 'clsx';
import * as React from 'react';
import { useCallback } from 'react'

enum BUTTONSIZE {
   T = 'tiny',
   XS = "xsmall",
   S = "small",
   M = "medium",
   L = "large",
   XL = "xLarge"
}

enum BUTTONVARIANT {
   PRIMARY = "primary",
   SECONDARY = "--secondary",
   SECONDARY_WHITE = "--teriary-white",
   TERTIARY_OPACITY = "--teriary-opacity",
   TERTIARY = "--tertiary",
   OUTLINE_TEAL = "--outline-teal",
   OUTLINE_GRAY = "--outline-gray",
   TEXT = "text",
   TEXT_ARROM = "--arrow",
   ICON = "__gray-icon",
   ICON_WQUARE = "__gray-square",
   ICON_BORDER = "__gray-border",
   ICON_SHADOW = "__gray-shadow",
   PURE = "pure",
   LOADING = "loading"
}

enum TEXTCOLOR {
   BLACK = "black",
   GRAY = "gray",
   GREEN = "green",
   WHITE = "white",
}

enum TEXTBUTTONSIZE {
   S = "m15",
   M = "m17",
   L = "sb19",
   XL = "sb24"
}

type ShowIcon = "none" | "left" | "right" | "both"
type IconUIType = "round" | "square";

interface HxButtonIcon extends HxIconProps {
   name?: string;
   alt?: string;
   width?: number;
   height?: number;
   color?: string;
   uiType?: IconUIType
}

interface HxButtonProps extends React.ComponentPropsWithoutRef<"Button"> {
   buttonSize?: BUTTONSIZE;
   uiType?: BUTTONVARIANT;
   children?: React.ReactNode | string;
   onClick?: (e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
   isRoundButton?: boolean;
   disabled?: boolean;
   to?: string;
   underline?: boolean;

   textColor?: TEXTCOLOR;
   textButtonSize?: TEXTBUTTONSIZE;
   iconDirection?: ShowIcon;
   leftIcon?: HxButtonIcon;
   rightIcon?: HxButtonIcon
   isDialogButton?: boolean;
   //isTextBlind?: boolean;

   imgSrc?: string;
   imgText?: string;
   extraMarginOnRightIcon?: boolean;
   as?: Button.TagType;
   ariaLabel?: string;
   changeColor?: boolean;

   //중복방지관련 (활성화, 지연시간)
   preventDuplicate?: boolean;
   duplicateDelay?: number;
   "data-direction"?: string;
   tabIndex?: number;
   isStatic?: boolean;
}

const HxButton = React.forwardRef<HTMLButtonElement, HxButtonProps>((props, ref) => {
   const {
      id,
      buttonSize = BUTTONSIZE.L,
      uiType = BUTTONVARIANT.PRIMARY,
      children,
      onClick,
      isRoundButton = false,
      disabled,
      underline,
      textColor = TEXTCOLOR.BLACK,
      textButtonSize = TEXTBUTTONSIZE.M,
      iconDirection = "none",
      leftIcon = {
         name: "IconSuccess",
         alt: "완료",
         width: 20,
         height: 20
      },
      rightIcon = {
         name: "IconSystemExceptionArrowRight20",
         alt: "",
         width: 8,
         height: 20
      },
      imgSrc,
      imgText,
      isDialogButton = false,
      extraMarginOnRightIcon = false,
      preventDuplicate = true,
      duplicateDelay,
      as,
      "data-direction": dataDirection,
      tabIndex,
      isStatic = false,
      from
   } = props;

   const { execute } = usePreventDuplicate({
      delay: duplicateDelay ?? 1000,
      shouldReject: false
   })

   const handleClick = useCallback(() => {
      async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
         if (!onClick) return;
         // preventDuplicate와 관계없이 이벤트 객체를 직접 전달

         if (preventDuplicate) {
            await execute(() => onClick(e));
         } else {
            onClick(e)
         }
      }
   }, [preventDuplicate, execute, onClick])

   const className = () => {
      const getStaticVariant = (variant: BUTTONVARIANT) => {
         const staticVariants = [
            BUTTONVARIANT.SECONDARY,
            BUTTONVARIANT.SECONDARY_WHITE,
            BUTTONVARIANT.TERTIARY_OPACITY,
            BUTTONVARIANT.TERTIARY,
            BUTTONVARIANT.OUTLINE_TEAL,
            BUTTONVARIANT.OUTLINE_GRAY,
         ]

         if (isStatic && staticVariants.includes(variant)) {
            return `${variant}_Static`
         }
         return variant;
      }

      const finalUiType = getStaticVariant(uiType);

      if (uiType === BUTTONVARIANT.TEXT || uiType === BUTTONVARIANT.TEXT_ARROW) {
         return clsx(
            style["text-button"],
            style[`text-button--${textButtonSize}`],
            style[`text-button--${textColor}`],
            underline && style["text-button--underline"],
            disabled && style["disabled"],
            isDialogButton && style["dialog_space"],
            uiType === BUTTONVARIANT.TEXT_ARROW && style["text-button--arrow"],
            "text-button"

         );
      } else if (
         uiType === BUTTONVARIANT.ICON ||
         uiType === BUTTONVARIANT.ICON_SQUARE ||
         uiType === BUTTONVARIANT.ICON_BORDER ||
         uiType === BUTTONVARIANT.ICON_SHADOW
      ) {
         return clsx(style[`icon-button${finalUIType}`], "icon-button");
      } else {
         return clsx(
            style["box-button"],
            style[`box-button${finalUiType}`],
            style[buttonSize],
            isRoundButton && style["round-button"],
            disabled && style["disabled"],
            isDialogButton && style["dialog_space"],
            "box-button"
         )
      }

   }

   const tag = as || button;

   const renderButtonRoot = (children: React.ReactNode) => {
      //esline...~~
      const { onClick, ...restProps } = props;

      return (
         <Button.Root
            ref={ref}
            className={uiType === BUTTONVARIANT.PURE ? prestProps.className : ClassNames()}
            onClick={handleClick}
            disabled={disabled}
            as={Tag}
            dataName="HxButton"
            id={id ?? "HxButton-001"}
            data-direction={dataDirection}
            tabIndex={tabIndex}
            from={from}
            {...restProps}
         >
            {children}
         </Button.Root>
      )
   }

   return renderButtonRoot(
      <>
         {uiType === BUTTONVARIANT.PURE ? (
            <>{children}</>
         ) : uiType === BUTTONVARIANT.LOADING ? (
            <HxLottie
               type="infinite"
               animationUrl={`로띠주소`}
               autoplay={true}
               width={32}
               height={32}
            // onCompete={() => {}}
            // onLoopComplete={() => {}}
            />
         ) : uiType === BUTTONVARIANT.ICON ? (
            <>
               {/* 아이콘 버튼 */}
               <HxIcon
                  name={leftIcon.name}
                  width={leftIcon.width}
                  height={leftIcon.height}
                  className={clsx(leftIcon.color, style["top-icon"])}
                  alt={leftIcon.alt}
               />
               <Button.Inner className={style["button-value"]}>{children}</Button.Inner>
            </>
         ) : uiType === BUTTONVARIANT.ICON_SQUARE || uiType === BUTTONVARIANT.ICON_SHADOW ? (
            <>
               {/* 섀도우 버튼 */}
               <HxIcon
                  name={leftIcon.name}
                  width={leftIcon.width}
                  height={leftIcon.height}
                  className={leftIcon.color}
                  alt={leftIcon.alt}
               />
               <Button.Inner className={style["button-value"]}>{children}</Button.Inner>
            </>
         ) : uiType === BUTTONVARIANT.ICON_BORDER ? (
            <>
               <HxImage src={imgSrc} width={48} height={48} />
               <Button.Inner className={style["button-value"]}>{imgText}</Button.Inner>
            </>
         ) : (
            {(iconDirection === "left" || iconDirection === "both") && (
               <>
                  <HxIcon
                     name={rightIcon.name}
                     width={rightIcon.width}
                     height={rightIcon.height}
                     alt={rightIcon.alt}
                     className={clsx(
                        rightIcon.color,
                        extraMarginOnRightIcon && style["button--end-icon--small"]
                     )}
                  />
               </>
            )}
         )}
      </>
   )

})

HxButton.displayName = "HxButton";
export default HxButton;
export { BUTTONSIZE, BUTTONVARIANT, TEXTBUTTONSIZE, TEXTCOLOR }
export type { HxButtonProps }
