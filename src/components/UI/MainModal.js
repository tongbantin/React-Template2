import React, { useState, useEffect, useContext, useRef } from 'react';
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm } from "availity-reactstrap-validation";
import * as common from './../CommonFunction/common-function'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { CoreModal } from './context/Context'
const MainModal = (props, context) => {
    const [isOpen, setIsOpen] = useState(false)
    const formEl = useRef()
    const MySwal = withReactContent(Swal)
    const Properties = useContext(CoreModal)
    const defaultProps = {
        isOpen: false,
        toggle: () => { setIsOpen(!isOpen) },
        onClosed: () => { },
        ModalHeaderText: "",
        onCancel: () => { defaultProps.toggle() },
        CancelText: "Cancel",
        CancelHidden: false,
        CancelClass: "btn-default btnDefault btn-Temp",
        onSave: () => { },
        SaveText: "Save",
        SaveHidden: false,
        SaveClass: "btn-default btnDefault btn-Temp",
        onDelete: () => {  },
        DeleteText: "Delete",
        DeleteHidden: true,
        DeleteClass: "btn-default btnDefault btn-Temp",
        onClear: () => { },
        ClearText: "Clear",
        ClearHidden: true,
        ClearClass: "btn-default btnDefault btn-Temp",
        onbutton1Click: () => { },
        button1txt: 'Edit Job',
        button1hidden: true,

    }
    const currentProps = {
        ...defaultProps, ...props
    }
    useEffect(() => {
        setIsOpen(currentProps.isOpen)
    }, [props.isOpen])
    const onSubmit = (event) => {
        event.preventDefault()
        //const { name, email } = this.state;

        currentProps.onSave()
    }
    return (
        <React.Fragment>
            <Modal isOpen={isOpen} toggle={currentProps.toggle} size='lg' backdrop='static' onClosed={currentProps.onClosed} className="modal-function-add">
                <Form onSubmit={onSubmit}>
                    <ModalHeader toggle={currentProps.onCancel}>
                            {currentProps.ModalHeaderText}
                          </ModalHeader>
                    <ModalBody>
                        {props.children}
                    </ModalBody>
                    <ModalFooter>
                        <input type="submit" className={`btn ${currentProps.SaveClass}`} value={currentProps.SaveText} hidden={currentProps.SaveHidden} />{' '}
                        <input type="button" className={`btn ${currentProps.ClearClass}`} onClick={currentProps.onClear} value={currentProps.ClearText} hidden={currentProps.ClearHidden} />
                        <input type="button" className={`btn ${currentProps.CancelClass}`} onClick={currentProps.onCancel} value={currentProps.CancelText} hidden={currentProps.CancelHidden} />                
                        <input type="button" className={`btn ${currentProps.DeleteClass}`} onClick={currentProps.onDelete} value={currentProps.DeleteText} hidden={currentProps.DeleteHidden} />
                        <input type="button" className="btn btn-default btnDefault btn-Temp" onClick={currentProps.onbutton1Click} value={currentProps.button1txt} hidden={currentProps.button1hidden} />{' '}

                    </ModalFooter>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

export default MainModal