import React, { createContext } from 'react';

interface SkeletonContextProps {
    isLoading: boolean,
    setIsLoading: (value: React.SetStateAction<boolean>) => void
}

export const SkeletonContext = createContext({} as SkeletonContextProps);

export default SkeletonContext;
