import { Skeleton, SkeletonImage } from '../../skeleton';

interface Props {
    text: string,
    imageURL?: string,
}

export const TextImageBody = ({ text, imageURL }: Props) => (
  <div className="flex align-items-center">
    <Skeleton
      className="border-circle w-3rem h-3rem"
    >
      <SkeletonImage
        src={imageURL}
        alt="Profile"
        className="border-circle  w-3rem h-3rem"
        referrerPolicy="no-referrer"
      />
    </Skeleton>
    <span className="ml-2">{text}</span>
  </div>
);

TextImageBody.defaultProps = {
  imageURL: '',
};

export default TextImageBody;
