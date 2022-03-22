import React, { useState } from 'react';

import { Skeleton as PrimeSkeleton } from 'primereact/skeleton';
import { Generic } from '../../interfaces/generic';

interface Props extends Generic {
    classNameSkeleton?:string,
    children: JSX.Element,
}

export const Skeleton = <P extends Props>(props: P) => {
  const [ isLoading, setIsLoading ] = useState(true);
  const {
    classNameSkeleton, children, ...newProps
  } = props;

  return (
    <>
      {
          isLoading && <PrimeSkeleton className={classNameSkeleton || children.props.className} />
        }
      {
            React.cloneElement(children, {
              ...newProps,
              style: isLoading ? { display: 'none' } : {},
              onLoad: () => setIsLoading(false),
            })
        }
    </>
  );
};

export default Skeleton;
