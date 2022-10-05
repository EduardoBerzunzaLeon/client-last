import { ProfileImage } from '../../ui';

interface Props {
    text: string,
    imageURL: string,
    className?: string,
}

export const TextImageBody = ({
  text,
  imageURL,
  className,
}: Props) => (
  <div className="flex align-items-center">
    <ProfileImage imageURL={imageURL} className={className} />
    <span className="ml-2">{text}</span>
  </div>
);

TextImageBody.defaultProps = {
  className: 'border-circle w-3rem h-3rem',
};

export default TextImageBody;
