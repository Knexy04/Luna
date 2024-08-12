"use client";

import React, { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode } from "react";
import { UserDataType } from "@/app/dataTypes/Interfaces";

interface ContextProps {
    userData: UserDataType;
    setUserData: Dispatch<SetStateAction<UserDataType>>;
}

const GlobalContext = createContext<ContextProps>({
    userData: {} as UserDataType,
    setUserData: () => { }
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<UserDataType>({} as UserDataType);

    return (
        <GlobalContext.Provider value={{ userData, setUserData }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
