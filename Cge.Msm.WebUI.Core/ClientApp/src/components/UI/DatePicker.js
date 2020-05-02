import React, { useState} from 'react';
import { Input } from 'reactstrap';
import DateTimePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const DatePicker = (props) => {
    return (
        <React.Fragment>
            <Input type="date" bsSize="sm"  {...props} />
           
        </React.Fragment>
        )
}
export const DatePicker2 = (props) => {
    return (
        <React.Fragment>
            <Input type="date" bsSize="sm"  {...props} value = {formatDate(props.value)} />
           
        </React.Fragment>
        )
}
export const DateTimePick = (props) => {

    return (
        <React.Fragment>
            <DateTimePicker
                selected={props.value == '' ? null : new Date(props.value)}
                onChange={props.onChange}
                dateFormat="yyyy-MM-dd"
            />
          
        </React.Fragment>
    )
}

export const formatDate = (date) => {
    if (date == null || date=='') {
        return ''
    }
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
export default DatePicker