import React, { useState, createContext } from 'react'

export const AccountContext = createContext({})


export const AccountContextProvider = ({ children }) => {

    const [account, setAccount] = useState({ email: "a", password: undefined, confirmPassword: undefined })

    const accountStore = {
        account: [account, setAccount],
        LoadAccountList:()=>{
            setAccount({...account,password:"A"})
        }
    }
    return <AccountContext.Provider value={accountStore}>{children}</AccountContext.Provider>
}
