import React, { useState } from 'react';

import { Skeleton as PrimeSkeleton } from 'primereact/skeleton';

import { Generic } from '../../interfaces/generic';

interface Props extends Generic {
    imgError?: string,
    classNameSkeleton?:string,
    children: JSX.Element,
}

export const Skeleton = <P extends Props>(props: P) => {
  const [ isLoading, setIsLoading ] = useState(true);
  const {
    classNameSkeleton, imgError, children, ...newProps
  } = props;

  return (
    <>
      {
        isLoading && <PrimeSkeleton className={classNameSkeleton || children.props.className} />
      }
      {
        children?.type === 'img'
          ? React.cloneElement(children, {
            ...newProps,
            style: isLoading ? { display: 'none' } : {},
            onLoad: () => setIsLoading(false),
            onError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
              setIsLoading(false);
              // eslint-disable-next-line no-param-reassign
              event.currentTarget.src = imgError || '/assets/images/profile.png';
            },
          })
          : React.cloneElement(children, {
            ...newProps,
            style: isLoading ? { display: 'none' } : {},
            onLoad: () => setIsLoading(false),
          })
      }
    </>
  );
};

export default Skeleton;
