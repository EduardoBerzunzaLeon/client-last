import { Skeleton, SkeletonImage } from '../../../../../components/skeleton';
import { Professor } from '../../../../../interfaces/api';

export const EmailBodyTemplate = ({ email, avatar }: Professor) => (
  <div className="flex align-items-center">
    <Skeleton
      className="border-circle w-3rem h-3rem"
    >
      <SkeletonImage
        src={avatar}
        alt="Profile"
        className="border-circle  w-3rem h-3rem"
        referrerPolicy="no-referrer"
      />
    </Skeleton>
    <span className="ml-2">{email}</span>
  </div>
);

export default EmailBodyTemplate;
