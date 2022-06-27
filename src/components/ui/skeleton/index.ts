import { Skeleton as SkeletonHOC } from './Skeleton';
import { SkeletonHOCProps } from './interfaces';
import { SkeletonImage } from './SkeletonImage';

export { SkeletonImage } from './SkeletonImage';

export const Skeleton: SkeletonHOCProps = Object.assign(SkeletonHOC, {
  Image: SkeletonImage,
});

export default Skeleton;
