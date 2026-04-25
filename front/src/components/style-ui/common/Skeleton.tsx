import React from 'react';
import styles from '@/styles/common/skeleton.module.scss';

interface SkeletonProps {
   width?: string | number;
   height?: string | number;
   borderRadius?: string;
   style?: React.CSSProperties; // 추가적인 스타일 확장을 위해
}

const Skeleton = ({ width, height, borderRadius, style }: SkeletonProps) => {
   return (
      <div
         className={styles.skeleton}
         style={{
            width: width || '100%',
            height: height || '20px',
            borderRadius: borderRadius || '4px',
            ...style
         }}
      />
   );
};

export default Skeleton;