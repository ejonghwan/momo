import { Children, ComponentProps, ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';

import { cva, VariantProps } from 'class-variance-authority';
import { type ClassValue, clsx } from 'clsx';
import { UrlObject } from 'url';

import { cn } from '@/components/style-ui/common/btn1';

const buttonVariants = cva('disabled:pointer-events-none text-black', {
  variants: {
    variant: {
      color: '',
      text: '',
      arrow: '',
      border: '',
      none: '',
    },
    size: {
      xlarge: 'button__xlarge',
      large: 'button__large',
      medium: 'button__medium',
      small: 'button__small',
      none: 'button__none',
    },
    state: {
      loading: 'button__loading',
    },
    disabled: {},
  },
  defaultVariants: {
    variant: 'none',
    size: 'medium',
  },
});

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
  as?: string;
  href?: string | UrlObject;
  children: React.ReactNode;
  desabled?: boolean;
  type?: 'button' | 'submit';
}

const UxButton = ({
  children,
  className,
  variant,
  size,
  as = 'button',
  href = '/',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type = 'button',
  disabled,
  ...props
}: ButtonProps) => {
  // button
  if (as === 'button') {
    return (
      <button
        type="button"
        disabled={disabled}
        className={cn(buttonVariants({ variant, size, className, disabled }))}
        {...props}
      >
        {children}
      </button>
    );
  }

  //   link 버튼
  if (as === 'a') {
    return (
      <Link
        href={href ?? '/'}
        className={cn(buttonVariants({ variant, size, className, disabled }))}
      >
        {children}
      </Link>
    );
  }
};

export default UxButton;

// const ButtonArea = ({ children, className, grid, ...props }: ButtonAreaProps) => {
//   return (
//     <div className={cn('btn-area shrink-0', buttonAreaVariants({ grid, className }))} {...props}>
//       {children}
//     </div>
//   );
// };

// const Button = ({ className, variant, size, ...props }: ButtonProps) => {
//   return (
//     <button type="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
//   );
// };

// const ButtonLink = ({ children, className, variant, size, href, ...props }: ButtonLinkProps) => {
//   return (
//     <Link
//       href={href}
//       className={cn('block text-center', buttonVariants({ variant, size, className }))}
//       {...props}
//     >
//       {children}
//     </Link>
//   );
// };

// export { Button, ButtonArea, ButtonLink };
