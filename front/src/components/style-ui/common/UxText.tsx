import { ElementType, HTMLAttributes } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/components/style-ui/common/btn1';

import '@/styles/common/UxText.scss';

// ----------------------------------------------------------------------------- UxText

const textVariants = cva('text', {
  variants: {
    variant: {
      default: '',
      H_30_R: 'H_30_R', // 매우 큰 제목
      H_30_M: 'H_30_M',
      H_30_SB: 'H_30_SB',
      H_30_B: 'H_30_B',

      H_26_R: 'H_26_R', // 큰 제목
      H_26_M: 'H_26_M',
      H_26_SB: 'H_26_SB',
      H_26_B: 'H_26_B',

      H_22_R: 'H_22_R', // 일반 제목
      H_22_M: 'H_22_M',
      H_22_SB: 'H_22_SB',
      H_22_B: 'H_22_B',

      H_20_R: 'H_20_R', // 작은 제목
      H_20_M: 'H_20_M',
      H_20_SB: 'H_20_SB',
      H_20_B: 'H_20_B',

      C_19_R: 'C_19_R', // 큰 본문
      C_19_M: 'C_19_M',
      C_19_SB: 'C_19_SB',
      C_19_B: 'C_19_B',

      C_17_R: 'C_17_R', // 조금 큰 본문
      C_17_M: 'C_17_M',
      C_17_SB: 'C_17_SB',
      C_17_B: 'C_17_B',

      C_15_R: 'C_15_R', // 일반 본문
      C_15_M: 'C_15_M',
      C_15_SB: 'C_15_SB',
      C_15_B: 'C_15_B',

      C_13_R: 'C_13_R', // 작은 본문
      C_13_M: 'C_13_M',
      C_13_SB: 'C_13_SB',
      C_13_B: 'C_13_B',

      C_11_R: 'C_11_R', // 정말 작은 본문
      C_11_M: 'C_11_M',
      C_11_SB: 'C_11_SB',
      C_11_B: 'C_11_B',

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

interface TextProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: ElementType;
  children: string | React.ReactNode;
}

export const UxText = ({ className, variant, size, as, children, ...props }: TextProps) => {
  const Component = as || 'span';
  return (
    <Component
      data-name="UxText"
      className={cn(textVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Component>
  );
};

// ----------------------------------------------------------------------------- UxText
