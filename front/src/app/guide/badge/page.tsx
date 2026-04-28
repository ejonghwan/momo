import { UxBadge, UxBadgeWrap } from '@/components/style-ui/common/UxBadge';

const Badge = () => {
  return (
    <>
      <div>
        <h1>Badge type1</h1>
        <UxBadgeWrap>
          <UxBadge size="xsmall" bgColor="bg_grey_100" txtColor="blue" variant="default">
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
        </UxBadgeWrap>
      </div>
    </>
  );
};

export default Badge;
