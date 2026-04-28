import { ElementType, HTMLAttributes } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/components/style-ui/common/btn1';

import '@/styles/common/UxBadge.scss';

// ----------------------------------------------------------------------------- UxBadge

const badgeVariants = cva('badge', {
  variants: {
    variant: {
      // success: '',
      // warning: '',
      // error: '',
      // info: '',
      // solid: '',
      // outline: '',

      default: 'badge--default',
      solid: 'badge--solid',
      outline: 'badge--outline',
      none: '',
    },

    size: {
      xlarge: 'badge--xlarge',
      large: 'badge--large',
      medium: 'badge--medium',
      small: 'badge--small',
      xsmall: 'badge--xsmall',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'small',
  },
});

// interface BadgeProps
//   extends ComponentProps<'span' | ElementType>, VariantProps<typeof badgeVariants> {
//   variant?: badgeVariants<typeof badgeVariants>['variant'];
//   size?: badgeVariants<typeof badgeVariants>['size'];
//   as?: ElementType;
// }

// interface BadgeProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof badgeVariants> {
//   as?: ElementType;
// }

// HTMLAttributes에 원래 있던 속성은 Omit로 우선순위 결정
interface BadgeProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>, VariantProps<typeof badgeVariants> {
  as?: ElementType;
  bgColor?: string;
  txtColor?: string;
  children: string | React.ReactNode;
}

export const UxBadge = ({
  className,
  variant,
  size,
  as,
  bgColor, // props
  txtColor, // props
  children,
  ...props
}: BadgeProps) => {
  const Component = as || 'span';
  return (
    <Component
      data-name="Uxbadge"
      className={cn(badgeVariants({ variant, size, className }), bgColor, txtColor)}
      {...props}
    >
      {children}
    </Component>
  );
};

// ----------------------------------------------------------------------------- UxBadge

// ----------------------------------------------------------------------------- UxBadgeWrap

const badgeWrapVariants = cva('badge__wrap', {
  variants: {
    variant: {
      flex: 'badge__wrap--flex',
      flexWrap: 'badge__wrap--flex-wrap',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'none',
  },
});

interface BadgeWrapProps
  extends HTMLAttributes<HTMLElement>, VariantProps<typeof badgeWrapVariants> {
  as?: ElementType;
}

export const UxBadgeWrap = ({ className, variant, as, children, ...props }: BadgeWrapProps) => {
  const Component = as || 'span';
  return (
    <Component
      data-name="Uxbadge"
      className={cn(badgeWrapVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Component>
  );
};
