import React, { Children, ComponentProps, ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';

import { cva, VariantProps } from 'class-variance-authority';
import { type ClassValue, clsx } from 'clsx';
import { UrlObject } from 'url';

import { cn } from '@/components/style-ui/common/btn1';

import '@/styles/common/UxButton.scss';

const buttonVariants = cva('disabled:pointer-events-none text-black button', {
  variants: {
    variant: {
      fill: 'button--fill',
      text: 'button--text',
      border: 'button--border',
      weak: 'button--weak',
      none: 'button--none',
    },
    arrow: {
      left: 'button--arrow--left',
      right: 'button--arrow--right',
      top: 'button--arrow--top',
      bottom: 'button--arrow--bottom',
    },
    size: {
      xlarge: 'button--xlarge',
      large: 'button--large',
      medium: 'button--medium',
      small: 'button--small',
      none: 'button--none',
    },
    state: {
      default: '',
      loading: 'button--loading',
    },
    _color: {
      primary: 'button--primary',
      danger: 'button--danger',
      light: 'button--light',
      dark: 'button--dark',
    },
    display: {
      inline: 'button--inline',
      block: 'button--block',
      full: 'button--full',
    },
  },
  defaultVariants: {
    variant: 'fill',
    arrow: 'right',
    size: 'medium',
    state: 'default',
    _color: 'primary',
    display: 'full',
  },
});

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
  state?: VariantProps<typeof buttonVariants>['state'];
  display?: VariantProps<typeof buttonVariants>['display'];
  _color?: VariantProps<typeof buttonVariants>['_color'];
  arrow?: VariantProps<typeof buttonVariants>['arrow'];
  // display?: 'inline' | 'block' | 'full';
  // color?: 'primary' | 'danger' | 'light' | 'dark';
  as?: string;
  href?: string | UrlObject;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  ariaLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const UxButton = ({
  children,
  className,
  variant,
  size,
  as = 'button',
  href = '/',
  type = 'button',
  disabled = false,
  state,
  _color,
  display,
  arrow,
  handleClick,
  ...props
}: ButtonProps) => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    // e.preventDefault();

    handleClick?.(e);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget?.classList.add('button--mouse-down');
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget?.classList.remove('button--mouse-down');
  };

  // button
  if (as === 'button') {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={(e) => handleButtonClick(e)}
        onPointerDown={(e) => handleMouseDown(e)}
        onPointerUp={(e) => handleMouseUp(e)}
        className={cn(
          buttonVariants({ variant, size, className, state, display, _color, arrow }),
          disabled && 'button--disabeld',
        )}
        {...props}
      >
        {state === 'loading' ? (
          <div className="loader dots-bounce" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }

  //   link 버튼
  if (as === 'a') {
    return (
      <Link
        href={href ?? '/'}
        className={cn(
          buttonVariants({ variant, size, className, state, display, _color, arrow }),
          disabled && 'button--disabeld',
        )}
        onClick={(e) => handleButtonClick(e)}
      >
        {state === 'loading' ? <>...loading</> : children}
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
