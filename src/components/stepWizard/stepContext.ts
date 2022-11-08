import React, { createContext } from 'react';

import { Generic } from '../../interfaces';

interface StepContextProps extends Generic{
    canAdvance: boolean;
    setCanAdvance: (value: React.SetStateAction<boolean>) => void,
}

export const StepContext = createContext({} as StepContextProps);

export default StepContext;
