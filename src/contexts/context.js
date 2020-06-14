import React, { useState, createContext } from 'react'
import {AccountContextProvider,useAccountContext} from './account'
import {useFoodContext} from './Food'
export const StoreContext = createContext({})

export const StoreContextProvider = ({ children }) => {

    const acc = useAccountContext()
    const acc2 = useAccountContext()
    const food = useFoodContext()
    const store = {
        acc,
        food
    }
    return <StoreContext.Provider value={store}>{children}
    </StoreContext.Provider>
}
export const Provider =({children})=>{

    return(
        <StoreContextProvider>
                {children}
        </StoreContextProvider>

    )
}