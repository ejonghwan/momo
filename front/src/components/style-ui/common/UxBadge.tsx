import { ElementType, HTMLAttributes } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/components/style-ui/common/btn1';

// ----------------------------------------------------------------------------- UxBadge

const badgeVariants = cva('ux__badge', {
  variants: {
    variant: {
      success: '',
      warning: '',
      error: '',
      info: '',
      solid: '',
      outline: '',

      // 1. 강조도에 따른 분류
      contained: 'ux__badge--contained', // 배경색이 꽉 찬 스타일
      outlined: 'ux__badge--outlined', // 테두리만 있는 스타일
      soft: 'ux__badge--soft', // 연한 배경색 스타일

      // 2. 혹은 역할에 따른 분류
      alarm: 'ux__badge--alarm', // 알림용 (우측 상단에 붙는 작은 점 등)
      tag: 'ux__badge--tag', // 태그 형태
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
