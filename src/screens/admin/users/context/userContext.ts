import React, { createContext } from 'react';
import { User } from '../../../../interfaces/api';

interface UserContextProps {
    displayModal: boolean,
    lazyParams: any,
    userAuth: User | null,
    userSelected: User | null,
    setDisplayModal: (value: React.SetStateAction<boolean>) => void,
    setLazyParams: (value: React.SetStateAction<any>) => void
    setUserSelected: (value: React.SetStateAction<User | null>) => void,
  }

export const UserContext = createContext({} as UserContextProps);

export default UserContext;
