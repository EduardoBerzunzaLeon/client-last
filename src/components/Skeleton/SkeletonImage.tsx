import React, { useContext } from 'react';

import { SkeletonContext } from './context/SkeletonContext';
import { SkeletonImageProps } from './interfaces';

export const SkeletonImage = ({
  className, style, imgError, alt, src, ...props
}: SkeletonImageProps) => {
  const { isLoading, setIsLoading } = useContext(SkeletonContext);

  return (
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
