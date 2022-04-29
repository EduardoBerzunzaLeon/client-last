import React from 'react';

import { User } from '../../../../../interfaces/api';
import { SkeletonCompound, SkeletonImage } from '../../../../../components/Skeleton/SkeletonCompound';

export const EmailBodyTemplate = ({ email, avatar }: User) => (
  <div className="flex align-items-center">
    <SkeletonCompound
      className="border-circle w-3rem h-3rem"
    >
      <SkeletonImage
        src={avatar}
        alt="Profile"
        className="border-circle  w-3rem h-3rem"
        referrerPolicy="no-referrer"
      />
    </SkeletonCompound>
    <span className="ml-2">{email}</span>
  </div>
);

export default { EmailBodyTemplate };
