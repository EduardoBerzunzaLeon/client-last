import React, { createContext } from 'react';

import { User } from '../../../interfaces';

interface UserContextProps {
    displayModal: boolean,
    lazyParams: any,
    userAuth: User | null,
    userSelected: User | undefined,
    setDisplayModal: (value: React.SetStateAction<boolean>) => void,
    setLazyParams: (value: React.SetStateAction<any>) => void,
    setFilterValue: (fieldName: string, value: any) => void,
    setUserSelected: (value: React.SetStateAction<User | undefined>) => void,
  }

export const UserContext = createContext({} as UserContextProps);

export default UserContext;
