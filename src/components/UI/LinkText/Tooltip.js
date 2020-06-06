//Library
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Input, Tooltip } from 'reactstrap';


//Component
import * as constant from './../../CommonFunction/constant'
import * as common from './../../CommonFunction/common-function'
//Store

export const JobStatusToolTip = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [Desc, setDesc] = useState('Default');
    const [id, setId] = useState(common.uuidv4());
    const toggle = () => setTooltipOpen(!tooltipOpen);
    useEffect(() => {
        switch (props.JobStatus) {
            case constant.DRAFT:
                setDesc('แบบร่าง')
                break;
            case constant.COMMITED:
                setDesc('มอบหมายงาน')
                break;
            case constant.ONDUTY:
                setDesc('กำลังปฎิบัติหน้าที่')
                break;
            case constant.CLOSE:
                setDesc('ปิดงาน')
                break;
            case constant.PENDING:
                setDesc('ปฎิบัติหน้าที่ไม่สำเร็จ')
                break;
            default:
        }

           
    }, [])
    return (
        <React.Fragment>
            
            <span style={{color: "blue" }} href="#" id={`tooltip-${id}`}>{props.JobStatus||''}</span>
            <Tooltip placement="top" isOpen={tooltipOpen} target={`tooltip-${id}`} toggle={toggle}>
                {Desc}
            </Tooltip>
        </React.Fragment>
        )
}
export default JobStatusToolTip
//textDecoration: "underline"