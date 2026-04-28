import React from 'react';

import UxBadge from '@/components/style-ui/common/UxBadge';

const Badge = () => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <UxBadge size="xsmall" color="blue" variant="fill">
          xsmall
        </UxBadge>
        <UxBadge size="small" color="blue" variant="fill">
          small
        </UxBadge>
        <UxBadge size="medium" color="blue" variant="fill">
          medium
        </UxBadge>
        <UxBadge size="large" color="blue" variant="fill">
          large
        </UxBadge>
      </div>
    </>
  );
};

export default Badge;
