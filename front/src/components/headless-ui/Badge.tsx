import React, { ElementType } from 'react';

interface BadgePropsType {
  content: string | React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  as?: ElementType;
}

const Badge = ({ content, onClick, as }: BadgePropsType) => {
  const Component = as || 'div';

  if (onClick) {
    return (
      <button type="button" onClick={(e) => onClick(e)}>
        {content}
      </button>
    );
  }

  return <Component>Badge</Component>;
};

export default Badge;
