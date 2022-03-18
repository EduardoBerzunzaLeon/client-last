import React, { useState } from 'react';

import { Skeleton as PrimeSkeleton } from 'primereact/skeleton';

interface Generic {
    classNameSkeleton?:string,
    children: JSX.Element,
    [x:string]: any
}

export const Skeleton = <P extends Generic>(props: P) => {
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
