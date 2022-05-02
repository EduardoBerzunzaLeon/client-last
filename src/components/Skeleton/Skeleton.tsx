import {
  CSSProperties,
  ReactElement,
  useRef,
  useState,
  useMemo,
} from 'react';

import { Skeleton as PrimeSkeleton } from 'primereact/skeleton';

import { SkeletonContext } from './context/SkeletonContext';
import { SkeletonImage } from './SkeletonImage';

export interface SkeletonProps {
    children?: ReactElement | ReactElement[],
    skeletonTemplate?: () => ReactElement,
    className?: string,
    style?: CSSProperties,
    isExternalLoading?: boolean,
}

const { Provider } = SkeletonContext;

export const Skeleton = ({
  children,
  skeletonTemplate,
  className,
  style,
  isExternalLoading,
}: SkeletonProps) => {
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

Skeleton.defaultProps = {
  children: undefined,
  skeletonTemplate: undefined,
  className: '',
  style: {},
  isExternalLoading: undefined,
};

export default {
  Skeleton,
  SkeletonImage,
};
