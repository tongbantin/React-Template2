import React, { useState } from 'react';
import * as common from '../CommonFunction/common-function'
import '../../assets/css/SlideModal.css';
import { IoIosArrowBack } from "react-icons/io";
import { Container, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Redirect } from 'react-router-dom'
const SlideModal = (props) => {
    return (
        <>
            <div className="modal-fullScreen" >
                <NavHead {...props}/>
                <Content>
                    {props.children}
                </Content>
            </div>   
        </>
    )
}
const Content = (props)=>{
    return(<Container className="modal-Container">
    {props.children}
</Container>)
}
const NavHead = (props)=>{
    const [isOpen, setIsOpen] = useState(false)

    const defaultProps = {
        isOpen: false,
        toggle: () => { },
        onClosed: () => { },
        ModalHeaderText: "",
        onButton1Click: () => { },
        Button1Text: "Save",
        Button1Hidden: true,
        onButton2Click: () => { },
        Button2Text: "Save",
        Button2Hidden: true,
        onButton3Click: () => { },
        Button3Text: "Save",
        Button3Hidden: true,
        onButton4Click: () => { },
        Button4Text: "Save",
        Button4Hidden: true,
        ButtonJson: [],
        BackLink: "/dashboard"

    }
    const currentProps = {
        ...defaultProps, ...props
    }
    const goback = () => {
        if (isOpen)
            return (<Redirect to={currentProps.BackLink} />)
    }
    const AllbuttonDropDown = () => {
        const [btnDropright, setbtnDropright] = useState({ isOpen: false })
        return (
            currentProps.ButtonJson && currentProps.ButtonJson.length > 0 ? (
                <ButtonDropdown direction="right" isOpen={btnDropright.isOpen} toggle={() => { setbtnDropright({ ...btnDropright, isOpen: !btnDropright.isOpen }) }}>
                    <DropdownToggle color="success" style={{ padding: "0.45rem 0.75rem", height: "31px", lineHeight: "15px", marginTop: "3px" }} caret>Action</DropdownToggle>
                    <DropdownMenu>
                        {
                            currentProps.ButtonJson && currentProps.ButtonJson.map(item =>
                                (<DropdownItem key={common.uuidv4()} className="btn btn-default" onClick={item.function}>{item.text}</DropdownItem>))
                        }
                    </DropdownMenu>
                </ButtonDropdown>
            ) : null)
    }
    return (
            <>
            {goback()}
                <nav className="navbar navbar-light nav-action bg-btn">
                    <Container className="btn-Container">
                        <button className="btn-transparent" onClick={() => { setIsOpen(true) }}><IoIosArrowBack className="icon" /></button>
                        <input type="button" className="btn btn-default btn-Temp btn-TempCommonForm" value={currentProps.Button1Text} hidden={currentProps.Button1Hidden} onClick={currentProps.onButton1Click} />
                        <input type="button" className="btn btn-default btn-Temp btn-TempCommonForm" value={currentProps.Button2Text} hidden={currentProps.Button2Hidden} onClick={currentProps.onButton2Click} />
                        <input type="button" className="btn btn-default btn-Temp btn-TempCommonForm" value={currentProps.Button3Text} hidden={currentProps.Button3Hidden} onClick={currentProps.onButton3Click} />
                        <input type="button" className="btn btn-default btn-Temp btn-TempCommonForm" value={currentProps.Button4Text} hidden={currentProps.Button4Hidden} onClick={currentProps.onButton4Click} />
                        <AllbuttonDropDown />
                    </Container>
                </nav>
            </>
    )
}
export default SlideModal