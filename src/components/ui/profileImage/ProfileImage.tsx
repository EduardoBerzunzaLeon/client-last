import { Skeleton } from '../skeleton';

interface Props {
    imageURL: string,
    className?: string,
}

export const ProfileImage = ({ imageURL, className }: Props) => (
  <Skeleton
    className={className}
  >
    <Skeleton.Image
      src={imageURL}
      alt="Profile"
      className={className}
      referrerPolicy="no-referrer"
    />
  </Skeleton>
);

ProfileImage.defaultProps = {
  className: 'border-circle w-3rem h-3rem',
};

export default ProfileImage;
