import React, { useState, createContext } from 'react'
import {AccountContextProvider} from './account'
export const StoreContext = createContext({})

export const StoreContextProvider = ({ children }) => {

    const [information, setInformation] = useState({ firstName: undefined, lastName: undefined, nickname: undefined })
    const [account, setAccount] = useState({ email: undefined, password: undefined, confirmPassword: undefined })

    const store1 = {
        information: [information, setInformation],
        account: [account, setAccount],
        LoadAccountList:()=>{

        }
    }
    const store2 = {
        information: [information, setInformation],
        account: [account, setAccount],
        LoadAccountList:()=>{

        }
    }
    return <StoreContext.Provider value={{store1,store2}}>{children}</StoreContext.Provider>
}
export const Provider =({children})=>{

    return(
        <StoreContextProvider>
            <AccountContextProvider>
                {children}
            </AccountContextProvider>
        </StoreContextProvider>

    )
}