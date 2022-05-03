import { CSSProperties, ReactElement } from 'react';

export interface SkeletonProps {
    children?: ReactElement | ReactElement[],
    skeletonTemplate?: () => ReactElement,
    className?: string,
    style?: CSSProperties,
    isExternalLoading?: boolean,
}

export interface SkeletonImageProps {
    src?: string,
    alt?: string,
    className?: string,
    imgError?: string,
    style?: CSSProperties,
    [x: string]: any
}

export interface SkeletonHOCProps {
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
