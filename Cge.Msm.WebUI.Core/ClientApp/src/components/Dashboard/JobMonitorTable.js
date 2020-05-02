//Library
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
//Component
import CommonTable from '../UI/CommonTables'
import * as Tooltip from '../UI/LinkText/Tooltip'
import * as common from './../CommonFunction/common-function'
import * as LinkModal from './../UI/LinkText/LinkModal'
import { formatDate } from './../UI/DatePicker'
//Store
import * as JobMonitorStore from '../../store/JobMonitorStore'


const JobMonitorTable = (props) => {

    const [isOpen, setIsOpen] = useState(false)

    //const header = (
    //    <React.Fragment>
    //        <th className="th-table">Type</th>
    //        <th className="th-table">Company</th>
    //        <th className="th-table">Customer</th>
    //        <th className="th-table">Model</th>
    //        <th className="th-table">Machine</th>
    //        <th className="th-table">Engineer</th>
    //        <th className="th-table">PO No.</th>
    //        <th className="th-table">Status</th>
    //        <th className="th-table">Operation Date</th>
    //        <th className="th-table">FollowUp</th>
    //        {props.conflict ? <th className="th-table">ConflictReason</th> : null}
    //        <th className="th-table">{' '}</th>
    //    </React.Fragment>)
    const dispatch = useDispatch();
    const Iconmore = common.getIconTag(common.Icontype.ION, "IoIosMore")
    
    //const dr = props.dataTable && props.dataTable.map(item => (
    //    <tr key={item.JobId} className="tr-table">
    //        <td>{item.JobType}</td>
    //        <td>{item.Company}</td>
    //        <td><LinkModal.Customer Text={item.CustomerName} Value={item.CustomerId} /></td>
    //        <td>{item.MachineModelText}</td>
    //        <td>{item.MachineText}</td>
    //        <td>{item.EngineerText}</td>
    //        <td><LinkModal.ServiceRequest Text={item.PoNumber} Value={item.ServiceRequestId} /></td>
    //        <td><Tooltip.JobStatusToolTip JobStatus={item.JobStatus} /></td>
    //        <td>{item.DateFrom}</td>
    //        <td>{item.isFollow ? 'Yes' : 'No'}</td>
    //        {props.conflict ? <td>{item.ConflictReason}</td> : null}
    //        <td><button onClick={() => {
    //            JobMonitorStore.actionCreators.LoadDetail(dispatch, item.JobId)
    //            setTimeout(() => {
    //                setIsOpen(true)
    //            }, 1000);
                
    //            }} className="btn-transparent"><Iconmore /></button>
    //        </td>
    //    </tr>
    //))

    const onClickCol = {
        onClick: async (e, column, columnIndex, row, rowIndex) => {
            await JobMonitorStore.actionCreators.LoadDetail(dispatch, row.JobId)
            
                setIsOpen(true)
            
        }
    }


    const columns = [
        {
            dataField: 'JobType',
            text: 'Type',
            sort: true,
            events: onClickCol
        },
        {
            dataField: 'Company',
            text: 'Company',
            sort: true,
            events: onClickCol
        },
        {
            dataField: 'CustomerName',
            text: 'Customer',
            sort: true,
            formatter: (cell, row) => {
                return (
                    <LinkModal.Customer Text={row.CustomerName} Value={row.CustomerId} />
                );
            },
        },
        {
            dataField: 'MachineModelText',
            text: 'Model',
            sort: true,
            events: onClickCol
        },
        {
            dataField: 'MachineText',
            text: 'Machine',
            sort: true,
            events: onClickCol
        },
        {
            dataField: 'EngineerText',
            text: 'Engineer',
            sort: true,
            events: onClickCol
        },
        {
            dataField: 'PoNumber',
            text: 'Po No.',
            sort: true,
            formatter: (cell, row) => {
                return (
                    <LinkModal.ServiceRequest Text={row.PoNumber} Value={row.ServiceRequestId} />
                );
            },
        },
        {
            dataField: 'JobStatus',
            text: 'Status',
            sort: true,
            formatter: (cell, row) => {
                return (
                    <Tooltip.JobStatusToolTip JobStatus={row.JobStatus} />
                );
            },
        },
        {
            dataField: 'DateFrom',
            text: 'Operation Date',
            sort: true,
            events: onClickCol,
            formatter: (cell, row) => {
                return (
                    formatDate(row.DateFrom)
                );
            }
        },
        {
            dataField: 'isFollow',
            text: 'Follow Up',
            sort: true,
            formatter: (cell, row) => {
                return (
                    row.isFollow ? 'Yes' : 'No'
                );
            },
        },
        {
            dataField: 'isUploadCertificate',
            text: 'Certificate Upload',
            sort: true,
            formatter: (cell, row) => {
                return (
                    row.isUploadCertificate ? 'Yes' : 'No'
                );
            },
        },
        {
            dataField:  'ConflictReason' ,
            text: 'Conflict Reason',
            sort: true,
            formatter: (cell, row) => {
                return (
                    props.conflict ? row.ConflictReason : null
                );
            },
            hidden: props.conflict?false:true
        }
        //{
        //    dataField: 'a',
        //    text: '',
        //    formatter: (cell, row) => {
        //        return (
        //            <button onClick={async () => {
        //                await JobMonitorStore.actionCreators.LoadDetail(dispatch, row.JobId)
                        
        //                setIsOpen(true)
                        

        //            }} className="btn-transparent"><Iconmore /></button>
        //        );
        //    },

        //}

    ]
            

    return (
        <React.Fragment>
            {isOpen ? props.conflict ? <Redirect to=
                {{
                    pathname: '/JobMonitor',
                state: { BackLink: '/JobConflict' }
                }}
                 /> :
                <Redirect to='/JobMonitor' />
                : null}
            <CommonTable keyField="JobId" data={props.dataTable} columns={columns} />
        </React.Fragment>
    )
}
export default JobMonitorTable