import { Skeleton as SkeletonHOC, SkeletonProps } from './Skeleton';
import { SkeletonImage, SkeletonImageProps } from './SkeletonImage';

export { SkeletonImage } from './SkeletonImage';

interface SkeletonHOCProps {
    ({
      children,
      skeletonTemplate,
      className,
      style,
      isExternalLoading,
    }: SkeletonProps): JSX.Element,
    Image: ({
      className, style, imgError, alt, src, ...props
    }: SkeletonImageProps) => JSX.Element
}

export const Skeleton: SkeletonHOCProps = Object.assign(SkeletonHOC, {
  Image: SkeletonImage,
});

export default Skeleton;
