import { Skeleton } from 'primereact/skeleton';
// import React, { DetailedReactHTMLElement, HTMLAttributes, useState } from 'react';

import React, { useState } from 'react';

interface Generic {
    classNameSkeleton?:string,
    children: JSX.Element,
    [x:string]: any
}

// React.ClassicElement<any>
// React.ComponentType<P> |  DetailedReactHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>,

export const WithSkeleton = <P extends Generic>(props: P) => {
  const [ isLoading, setIsLoading ] = useState(true);
  const {
    classNameSkeleton, className, children, ...newProps
  } = props;

  return (
    <>
      {
          isLoading && <Skeleton className={classNameSkeleton || className} />
        }
      {
            React.cloneElement(children, {
              ...newProps,
              className,
              style: isLoading ? { display: 'none' } : {},
              onLoad: () => setIsLoading(false),
            })
        }
      {/* <Component
          {...props}
          style={isLoading ? { display: 'none' } : {}}
          onLoad={() => setIsLoading(false)}
        /> */}
    </>
  );
};

// export const ImgWithSkeleton = WithSkeleton((props) => (<img alt="profile" {...props} />));

export default WithSkeleton;
