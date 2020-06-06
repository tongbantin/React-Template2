//Library
import React,{useState,createContext} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
//Component
import CommonTable from '../UI/CommonTables'
import * as common from '../CommonFunction/common-function'
import { formatDate } from '../UI/DatePicker'
import * as LinkModal from '../UI/LinkText/LinkModal'
import Modal from '../UI/CommonForm'
import DetailBox from '../UI/DetailBox'
import FormRowInput, { FormRow } from '../UI/FormDetail'
//Store
import * as TaskStore from '../../store/TaskStore'
import * as JobStore from '../../store/jobStore'


const UpcomingTable = () => {
    const dispatch = useDispatch();
    const Iconmore = common.getIconTag(common.Icontype.ION, "IoIosMore")
    const Icondelete = common.getIconTag(common.Icontype.ION, "IoMdClose")
    const onDelete=(id)=>{
        common.ConfirmDelete(id, ()=>{JobStore.actionCreators.DeleteJob(dispatch,id,()=>{TaskStore.actionCreators.Search(dispatch, {})}) 
         
    })
    }
    const [isOpenModal,setIsOpenModal] = useState()
    const dataTable =useSelector(state=>state.TaskReducer.TaskData)
    const onClickCol = {
        onClick: async (e, column, columnIndex, row, rowIndex) => {
            await TaskStore.actionCreators.dataToTaskform(dispatch, row.JobId)
            setIsOpenModal(true)
             
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
            dataField: 'JobStatus',
            text: 'Status',
            sort: true,
            events: onClickCol
        },

        {
            dataField: 'DateFrom',
            text: 'Due Date',
            sort: true,
            events: onClickCol,
            formatter: (cell, row) => {
                return (
                    formatDate(row.DateFrom)
                );
            }
        }
        //{
        //    dataField: 'b',
        //    text: '',
        //    formatter: (cell, row) => {
        //        return (
        //            <button onClick={async () => {
        //                var res = await TaskStore.actionCreators.dataToTaskform(dispatch, row.JobId)
        //                setIsOpenModal(true)
        //            }} className="btn-transparent"><Iconmore /></button>
        //        );
        //    }
        //}
        
    ]


    return (
        <React.Fragment>
            {isOpenModal ? <Redirect to='/upcoming' /> : null}
            <CommonTable keyField="JobId" data={dataTable} columns={columns} />
        </React.Fragment>
    )
}
export const UpcomingScreen =(props)=>{

    const dispatch = useDispatch()
    const data = useSelector(state=>state.TaskReducer.Form.data) 
    
    const onClickMarkasCall = () => {
        common.SaveWithConfirm(() => { TaskStore.actionCreators.MarkAsCall(dispatch, { ...data, UpdatedBy: common.GetUserId() }) })
        
    }
    return(
    <Modal isOpen={UpComingContext.isOpen}
    toggle={()=>{UpComingContext.setOpen(!UpComingContext.isOpen)}}
    Button1Text="Mark as call"
    onButton1Click={onClickMarkasCall}
    Button1Hidden={!data.MarkasCall}
            BackLink="/dashboard">
            {data.JobId ? null : <Redirect to='/dashboard' />}
        <DetailBox HeaderText="Task Detail">
            <TaskDataForm/>
        </DetailBox>
    </Modal>)
}


export const TaskDataForm = ()=>{
    const data = useSelector(state=>state.TaskReducer.Form.data) 
    const IconP = common.getIconTag(common.Icontype.ION, "IoIosPerson")
    const Machine = useSelector(state => state.TaskReducer.Form.Machine)
    const Contact = useSelector(state => state.TaskReducer.Form.Contact)
    const Engineer = useSelector(state => state.TaskReducer.Form.Engineer)
    return (
        <div>
            <FormRow label="Job Type">
                <label htmlFor="Job_Number_Value">{data.JobType}</label>
            </FormRow>
            <FormRow label="Due Date">
                <label htmlFor="Job_Number_Value">{data.DateFrom}</label>
            </FormRow>
            <FormRow label="Customer">
                <LinkModal.Customer Text={data && data.CustomerName} Value={data && data.CustomerId} />
            </FormRow>
            <div className="row detail-form">
                <div className="col-12 col-md-4">
                    <label htmlFor="Machine" className="col-label-bold">Machine</label>
                </div>
                <div className="col-12 col-md-8 col-detailForm">
                    {
                        Machine && Machine.map(item => (
                            <div className="col-12 detail-form" key={common.uuidv4()}>
                                <label >{item.MachineName}</label><br />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="row detail-form">
                <div className="col-12 col-md-4">
                    <label htmlFor="Machine" className="col-label-bold">Contact</label>
                </div>
                <div className="col-12 col-md-8 col-detailForm">
                    {
                        Contact && Contact.map(item => (
                            <div className="col-12 detail-form" key={common.uuidv4()}>
                                <IconP/>
                                <label >{item.ContactPerson}</label><br />
                                <label >{item.Telephone}</label><br />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="row detail-form">
                <div className="col-12 col-md-4">
                    <label htmlFor="Engineers" className="col-label-bold">Planed Engineers</label>
                </div>
                <div className="col-12 col-md-8 col-detailForm">
                    {
                        Engineer && Engineer.map(item => (
                            <div className="col-12 detail-form" key={common.uuidv4()}>
                                <LinkModal.Engineer Value={item} />
                                <br />
                                <label htmlFor="Engineers_Value">{item.Telephone}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div> 
    )

}
export const UpComingContext = createContext({});
export const UpComingProvider = ({ children }) => {
      const [isOpen, setisOpen] = useState(false);
      const store = {
            isOpen,
        setOpen: (isOpen) => {
              setisOpen(isOpen)}
      };
      return (
        <UpComingContext.Provider value={store}>
          {children}
        </UpComingContext.Provider>
      );
    };
export default UpcomingTable