import React, {
  createContext, CSSProperties, ReactElement, useContext, useRef, useState,
  useMemo,
} from 'react';
import { Skeleton as PrimeSkeleton } from 'primereact/skeleton';

interface Props {
    children?: ReactElement | ReactElement[],
    skeletonTemplate?: () => ReactElement,
    className?: string,
    style?: CSSProperties,
    isExternalLoading?: boolean,
}

interface ImageProps {
    src?: string,
    alt?: string,
    className?: string,
    imgError?: string,
    style?: CSSProperties,
    [x: string]: any
}

interface SkeletonContextProps {
    isLoading: boolean,
    setIsLoading: (value: React.SetStateAction<boolean>) => void
}

export const SkeletonContext = createContext({} as SkeletonContextProps);

export const SkeletonImage = ({
  className, style, imgError, alt, src, ...props
}: ImageProps) => {
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

const { Provider } = SkeletonContext;

export const SkeletonCompound = ({
  children,
  skeletonTemplate,
  className,
  style,
  isExternalLoading,
}: Props) => {
  const isSkeletonCustomized = useRef(!!skeletonTemplate);
  const hasExternalLoading = useRef(typeof isExternalLoading !== 'undefined');

  const [ isLoading, setIsLoading ] = useState<boolean>(
    hasExternalLoading.current
      ? isExternalLoading!
      : true,
  );

  const renderSkeleton = () => ((isSkeletonCustomized.current)
    ? skeletonTemplate!()
    : <PrimeSkeleton className={className} style={style} />);

  const renderChildren = () => ((
    hasExternalLoading.current && !isExternalLoading
  ) || !hasExternalLoading.current) && children;

  const value = useMemo(() => ({
    isLoading, setIsLoading,
  }), [ isLoading, setIsLoading ]);

  return (
    <Provider value={value}>
      { isLoading && renderSkeleton() }
      { renderChildren() }
    </Provider>
  );
};

SkeletonCompound.defaultProps = {
  children: undefined,
  skeletonTemplate: undefined,
  className: '',
  style: {},
  isExternalLoading: undefined,
};

export default SkeletonCompound;
