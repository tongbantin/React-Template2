import React from 'react';
import { FormText } from 'reactstrap'
export const FormRowInput = (props) => {
    return (
        <div className="row detail-form-input">
            <div className="col-12 col-md-4">
                <label htmlFor={props.label} className="col-label-bold">{props.label}
                    {props.required ? <span className="ingredient" >  *</span> : null}                  
                </label>
            </div>
            <div className="col-12 col-md-8">
                {props.children}
                <FormText color="red">
                    {props.errors && props.errors.message}
                </FormText>
            </div>
        </div>
    )
}

export const FormRow = (props) => {
    return (
        <div className="row detail-form">
            <div className="col-12 col-md-4">
                <label htmlFor={props.label} className="col-label-bold">{props.label}</label>
            </div>
            <div className="col-12 col-md-8">
                {props.children}
                <FormText color="red">
                    {props.errors && props.errors.message}
                </FormText>
            </div>
        </div>
    )
}

export default FormRowInput