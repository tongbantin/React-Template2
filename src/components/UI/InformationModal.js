import React from 'react';
import MainModal from './MainModal'
import {CoreModalProvider} from './../UI/context/Context'
export const InformationModal =(props)=>{
    return(
        <MainModal>
            {props.children}
        </MainModal>
    )
}
export default InformationModal