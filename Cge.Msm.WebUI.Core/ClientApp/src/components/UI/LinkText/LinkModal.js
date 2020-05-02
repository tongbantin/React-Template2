//Library
import React, {  useState } from 'react';
import { useDispatch } from 'react-redux'
//Component
import * as common from './../../CommonFunction/common-function'
//Store
import * as customerStore from '../../../store/MasterStore'
import * as ServiceRequestStore from '../../../store/ServiceRequestStore'
import * as Constants from '../../../store/constants'
export const Customer = (props) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <React.Fragment>
            <label className="textlink-detail" onClick={() => {
                setIsOpen(true)
                customerStore.actionCreators.GetCustomerData(dispatch, props.Value)
            }}>{props.Text}</label>
        
        </React.Fragment>
        )
}
export const ServiceRequest = (props) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <React.Fragment>
            <label className="textlink-detail" onClick={() => {
                setIsOpen(true)
                ServiceRequestStore.actionCreators.getDataServiceRequest(dispatch, props.Value)
            }}>{props.Text}</label>
            
        </React.Fragment>
    )
}
export const Engineer = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <React.Fragment>
            <label className="textlink-detail" onClick={() => {
                setIsOpen(true)
            }}>{props.Value&&props.Value.EmployeeName}</label>
        
        </React.Fragment>
    )
}
export const MediaFileName = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const Icondelete = common.getIconTag(common.Icontype.ION, "IoMdClose")
    return (
        <React.Fragment>
            <a href={`${Constants.API_URL_MEDIA}/MediaFiles/${props.FileNameLink}`} target="_blank">
            <label className="textlink-detail" onClick={() => {
                    setIsOpen(true)
                }}>{props.Display}</label></a>
            <button onClick={() => {
                if (props.Delete) {
                    props.Delete()
                }              
            }} className="btn-transparent" hidden={props.hidden}><Icondelete /></button>
        </React.Fragment>
    )
}