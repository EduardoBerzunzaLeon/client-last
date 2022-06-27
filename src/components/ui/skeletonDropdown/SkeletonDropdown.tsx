import { Skeleton } from 'primereact/skeleton';
import { VirtualScrollerLoadingTemplateOptions } from 'primereact/virtualscroller';

export const SkeletonDropdown = ({ even }: VirtualScrollerLoadingTemplateOptions) => (
  <div className="flex align-items-center p-2" style={{ height: '38px' }}>
    <Skeleton width={even ? '60%' : '50%'} height="1rem" />
  </div>
);

export default SkeletonDropdown;
