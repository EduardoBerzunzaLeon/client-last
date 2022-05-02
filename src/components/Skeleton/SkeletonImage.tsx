import React, { CSSProperties, useContext } from 'react';
import { SkeletonContext } from './context/SkeletonContext';

export interface SkeletonImageProps {
    src?: string,
    alt?: string,
    className?: string,
    imgError?: string,
    style?: CSSProperties,
    [x: string]: any
}

export const SkeletonImage = ({
  className, style, imgError, alt, src, ...props
}: SkeletonImageProps) => {
  const { isLoading, setIsLoading } = useContext(SkeletonContext);

  return (
    <figure>
      <img
        src={src}
        style={isLoading ? { display: 'none' } : style}
        className={className}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
          // eslint-disable-next-line no-param-reassign
          event.currentTarget.src = imgError || '/assets/images/profile.png';
          setIsLoading(false);
        }}
        {...props}
      />
    </figure>
  );
};

SkeletonImage.defaultProps = {
  className: '',
  style: {},
  imgError: '',
  alt: 'tutorApp',
  src: '',
};

export default SkeletonImage;
