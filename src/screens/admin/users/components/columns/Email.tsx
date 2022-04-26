import React from 'react';

import { Avatar } from 'primereact/avatar';

import { User } from '../../../../../interfaces/api';

export const EmailBodyTemplate = ({ email, avatar }: User) => (
  <div className="flex align-items-center">
    <Avatar
      imageAlt={email}
      image={avatar}
      shape="circle"
      size="large"
      onImageError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        // eslint-disable-next-line no-param-reassign
        event.currentTarget.src = '/assets/images/profile.png';
      }}
    />
    <span className="ml-2">{email}</span>
  </div>
);

export default { EmailBodyTemplate };
