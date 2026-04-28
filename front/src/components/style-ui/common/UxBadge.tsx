import React, { ComponentProps, ElementType, HTMLAttributes } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/components/style-ui/common/btn1';

// ----------------------------------------------------------------------------- UxBadge

const badgeVariants = cva('ux__badge', {
  variants: {
    variant: {
      bgcolor: '',
      bgcolorLight: '',
      bgcolorSky: '',
      bgcolorGray: '',
      bgcolorSecondary: '',
      borderPrimary: '',
      borderGray: '',
      text: '',
      more: '',
      arrow: '',
      none: '',
    },
    size: {
      xlarge: 'badge__xlarge',
      large: 'badge__large',
      medium: 'badge__medium',
      small: 'badge__small',
      xsmall: 'badge__xsmall',
      none: 'badge__none',
    },
  },
  defaultVariants: {
    variant: 'none',
    size: 'none',
  },
});

// interface BadgeProps
//   extends ComponentProps<'span' | ElementType>, VariantProps<typeof badgeVariants> {
//   variant?: badgeVariants<typeof badgeVariants>['variant'];
//   size?: badgeVariants<typeof badgeVariants>['size'];
//   as?: ElementType;
// }

interface BadgeProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof badgeVariants> {
  as?: ElementType;
}

export const UxBadge = ({ className, variant, size, as, ...props }: BadgeProps) => {
  const Component = as || 'span';
  return (
    <Component
      data-name="Uxbadge"
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    ></Component>
  );
};

// ----------------------------------------------------------------------------- UxBadge

// ----------------------------------------------------------------------------- UxBadgeWrap

const badgeWrapVariants = cva('badge__wrap', {
  variants: {
    variant: {
      uiType: '',
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

export default UxBadgeWrap;
