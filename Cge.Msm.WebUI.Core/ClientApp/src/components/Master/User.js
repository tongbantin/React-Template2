import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid,TextField,Checkbox,FormControlLabel,InputLabel,FormControl,Input} from '@material-ui/core/';
import {CommonTable} from './../UI/CommonTables'
import * as mock from './../../store/mockData'
export default  (props)=>{
    const onClickCol = {
        onClick: async (e, column, columnIndex, row, rowIndex) => {
           alert(row.id)
        }
    }
    const col =  [
        {
            dataField: 'id',
            text: 'id',
            sort: true,
            events: onClickCol
        },
        {
            dataField: '#1',
            text: 'Fullname',
            sort: true,
            formatter: (cell, row) => {
                return (<>
                    {row.first_name} {row.last_name}
                    </>
                );
            },
        },
        {
            dataField: 'first_name',
            text: 'first_name',
            sort: true,
        },
        {
            dataField: 'email',
            text: 'email',
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
            dataField: 'gender',
            text: 'gender',
            sort: true,
            events: onClickCol
        },
        {
            dataField: 'ip_address',
            text: 'ip_address',
            sort: true,
        },

        {
           dataField: 'a',
           text: '',
           formatter: (cell, row) => {
               return (
                <Button variant="contained" color="primary" onClick={()=>props.history.push('/form')} disableElevation>
                Show more
              </Button>
               );
           },

        },
        {
            dataField: 'b',
            text: '',
            formatter: (cell, row) => {
                return (
                 <Button variant="contained" color="secondary" >
                 Clear
               </Button>
                );
            },
 
         }

    ]
    return(<>
        <CommonTable keyField = "id" data = {mock.getUserlist()} columns={col} />
    </>)

}