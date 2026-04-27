import { VariantProps, cva } from 'class-variance-authority'
import { ComponentProps, ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import { clsx, type ClassValue } from 'clsx';

/**
 * 1. cn 함수 보강 (tailwind-merge 적용)
 * 클래스 중복 시 우선순위를 깔끔하게 정리해줍니다.
 */
export const cn = (...inputs: ClassValue[]) => {
   return clsx(inputs);
};

/**
 * 2. Variant 정의
 */
const buttonAreaVariants = cva('flex', {
   variants: {
      grid: {
         grid00: '',
         grid01: 'btn-grid01',
         grid02: 'btn-grid02',
         grid03: 'btn-grid03',
         grid04: 'btn-grid04'
      }
   },
   defaultVariants: {
      grid: 'grid00'
   }
})

const buttonVariants = cva('disabled:pointer-events-none text-black', {
   variants: {
      variant: {
         bgcolor: 'text-white bg-primary disabled:bg-gray7 disabled:text-gray5 rounded-[99px]',
         bgcolorLight: 'text-primary bg-primary1 disabled:bg-gray7 disabled:text-gray5 rounded-[99px]',
         bgcolorSky: 'bg-primary1 text-primary disabled:bg-opacity-50 disabled:text-opacity-50 rounded-[99px]',
         bgcolorGray: 'bg-gray9 text-black disabled:text-gray5 disabled:!bg-gray7 rounded-[99px]',
         bgcolorSecondary: 'text-white hover:text-white bg-secondary disabled:bg-gray7 disabled:text-gray5 rounded-[99px]',
         borderPrimary: 'bg-white border border-primary text-primary disabled:text-gray5 disabled:border-gray6 disabled:bg-white rounded-[99px]',
         borderGray: 'bg-white border border-gray6 disabled:border-gray6 disabled:text-gray5 disabled:bg-white rounded-[99px]',
         text: 'disabled:border-gray6 disabled:text-gray5',
         more: "mr-[44px] px-[20px] py-[10px] body3 font-bold text-white bg-primary disabled:bg-gray7 disabled:text-gray5 rounded-[99px] relative after:block after:absolute after:inset-y-0 after:right-[-5px] after:m-auto after:bg-[url('/images/common/btn_Subtract.svg')] after:w-[6px] after:h-[12px] after:bg-no-repeat before:block before:size-[40px] before:bg-primary before:absolute before:inset-y-0 before:right-[-44px] before:rounded-[50%] before:bg-[url('/images/common/ico_white_arrow.svg')] before:bg-[length:10px_12px] before:bg-center before:bg-no-repeat",
         arrow: "w-[12px] h-[32px] bg-[url('/images/common/ico_link_r_arrow.svg')] bg-no-repeat bg-right-bottom",
         none: 'h-auto my-auto'
      },
      size: {
         xlarge: 'min-h-[50px] px-[16px] py-[14px] body2 font-bold !leading-none',
         large: 'min-h-[44px] px-[16px] py-[12px] body3 font-bold !leading-none',
         medium: 'min-h-[36px] px-[8px] py-[9px] label1 font-medium !leading-none',
         small: 'min-h-[32px] px-[8px] py-[7px] label1 font-medium !leading-none',
         none: ''
      }
   },
   defaultVariants: {
      variant: 'none',
      size: 'large'
   }
})

/**
 * 3. Props 인터페이스 정의 (중복 제거 핵심!)
 * VariantProps<typeof ...> 가 variant와 size 타입을 자동으로 생성해줍니다.
 */
interface ButtonAreaProps extends ComponentProps<'div'>, VariantProps<typeof buttonAreaVariants> {
   children: ReactNode;
   grid?: VariantProps<typeof buttonAreaVariants>['grid']; // 여기서 타입을 뽑아옵니다
}

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
   // 별도의 추가 프로퍼티가 없다면 variant, size를 수동으로 적지 않아도 됩니다.
   variant?: VariantProps<typeof buttonVariants>['variant'];
   size?: VariantProps<typeof buttonVariants>['size'];
}

interface ButtonLinkProps extends LinkProps, VariantProps<typeof buttonVariants> {
   children?: ReactNode;
   className?: string;
   variant?: VariantProps<typeof buttonVariants>['variant'];
   size?: VariantProps<typeof buttonVariants>['size'];
}

/**
 * 4. 컴포넌트 구현
 */
const ButtonArea = ({ children, className, grid, ...props }: ButtonAreaProps) => {
   return (
      <div className={cn('btn-area shrink-0', buttonAreaVariants({ grid, className }))} {...props}>
         {children}
      </div>
   )
}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
   return (
      <button
         type="button"
         className={cn(buttonVariants({ variant, size, className }))}
         {...props}
      />
   )
}

const ButtonLink = ({ children, className, variant, size, href, ...props }: ButtonLinkProps) => {
   return (
      <Link
         href={href}
         className={cn('block text-center', buttonVariants({ variant, size, className }))}
         {...props}
      >
         {children}
      </Link>
   )
}

export { Button, ButtonArea, ButtonLink }