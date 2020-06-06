//Library
import React ,{ useState,useEffect,createContext} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'
//Component
import * as common from '../CommonFunction/common-function'
import SlideModal from '../UI/CommonForm'
import * as constant from '../CommonFunction/constant'
import  { FormRow } from '../UI/FormDetail'
import * as LinkModal from './../UI/LinkText/LinkModal'
import DetailBox from "../UI/DetailBox";
import JobActualResult, { Signature} from './JobActualResult';
import InternalServiceReport from './InternalServiceReport';
//Store
import * as JobMonitorStore from '../../store/JobMonitorStore'
import * as JobStore from '../../store/jobStore'
export const JobMonitorScreen = (props)=>{

    const dispatch = useDispatch()
    const Jobdata = useSelector(state => state.JobMointorReducer.Form.Jobdata)
    const Data = useSelector(state => state.JobMointorReducer.Form)
    const [buttons,setButtons ] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [isPrint] = useState(false)
    const [isPreview] = useState(false)
    
    const save = () => {
        common.SaveWithConfirm(saveActualInternal)
    }
    const saveActualInternal = async () => {
        var res1 = saveActual()
        var res2 = saveInternal()
        var res3= Promise.allSettled([
            res1, res2
        ])
        await res3
        JobMonitorStore.actionCreators.GetJob(dispatch, Jobdata.JobId)
    }
    const saveActual = () => {
        
        return JobMonitorStore.actionCreators.SaveActualList(dispatch, Data.JobActualInputList.map(item => { return { ...item, UpdatedBy: common.GetUserId() } })) 
       
        
    }
    const saveInternal = () => {
        return JobMonitorStore.actionCreators.SaveInternal(dispatch, { ...Data.InternalInput, UpdatedBy: common.GetUserId() })
    }
    const edit=async ()=>{
        await JobStore.actionCreators.dataToJobform(dispatch, Data.Jobdata.JobId)
        
        setIsOpen(true)
        
    }
    const closeJob = () => {
        if (!Data.Jobdata.CanClose) {
            common.InformationOKDialog("Cannot Close.Please upload report or signature")
        } else {
            common.SaveWithConfirm(() => {
                JobMonitorStore.actionCreators.SaveJob(dispatch, {
                    ...Data.Jobdata, JobStatus: constant.CLOSE
                    , UpdatedBy: common.GetUserId()
                })
                saveActualInternal()
            })
        }
        
    }
    const startJob = () => {
        common.SaveWithConfirm(() => { JobMonitorStore.actionCreators.SaveJob(dispatch, { ...Data.Jobdata, JobStatus: constant.ONDUTY, UpdatedBy: common.GetUserId() }) })
    }
    const previewDelivery = async() => {
         JobMonitorStore.actionCreators.AddDeliveryReport(Data.Jobdata.JobId)
    }
    const PendingJob = () => {
        common.SaveWithConfirm(() => {
            JobMonitorStore.actionCreators.SaveJob(dispatch, { ...Data.Jobdata, JobStatus: constant.PENDING, UpdatedBy: common.GetUserId()})
            saveActualInternal()
        })
    }
    const Renew = () => {
        common.SaveWithConfirm(() => {
            JobMonitorStore.actionCreators.SaveJob(dispatch, { ...Data.Jobdata, JobStatus: constant.CARRIED, UpdatedBy: common.GetUserId() })
            saveActualInternal()
        })
    }
    const savebutton = { text: "Save", function: () => { save() } }
    const saveInternalbutton = {
        text: "Save(Internal)", function: () => {
            saveInternal()
            common.DoneDialog()
        }
    }
    const previewReport = async() => {
         JobMonitorStore.actionCreators.SendEmailActual(dispatch, Data.Jobdata.JobId, false)
    }
    const SendReport = async() => {
        var {result,error} = await JobMonitorStore.actionCreators.CheckValidateSendEmail(Data.Jobdata.JobId)
        if(error){
            return
        }
        if(result.data){
            if (result.data.isValid) {
                await common.ConfirmSendEmail(async () => { return await JobMonitorStore.actionCreators.SendEmailActual(dispatch, Data.Jobdata.JobId, true)},common.ArrayTextReduce(result.data.Messages))
            } else {
                common.InformationOKDialog(result.data.Messages && common.ArrayTextReduce(result.data.Messages))
            }
        }
    }
    const closeJobbutton = {text:"Close Job",function:()=>{closeJob()}}
    const PendingJobbutton ={text:"Pending Job",function:()=>{PendingJob()}}
    const StartButton = { text: "Start", function: () => { startJob() } }
    const PreviewDelivery = { text: "Preview Delivery Report", function: () => { previewDelivery() } }
    const renewButton = { text: "Re-New Job", function: () => { Renew()}}
    const editbutton = { text: "Edit Job", function: () => { edit() } }
    const PreviewService = { text: "Preview Service Report", function: () => { previewReport() } }
    const sendEmailbutton = { text: "Send Email", function: () => { SendReport() } }
    useEffect(() => {
        let status = ""
        if (Data.Jobdata){
            status = Data.Jobdata.JobStatus
        }
        else
            return
     
        switch (status) {
            case constant.DRAFT:
                setButtons([editbutton])
                break;
            case constant.COMMITED:
                setButtons([StartButton, PreviewDelivery, editbutton])
                break;
            case constant.ONDUTY:
                setButtons([savebutton, closeJobbutton, PendingJobbutton, PreviewDelivery, PreviewService, sendEmailbutton, editbutton])
                break;
            case constant.PENDING:
                setButtons([savebutton, renewButton, PreviewService, sendEmailbutton])
                break;
            case constant.CARRIED:
                setButtons([savebutton, PreviewService, sendEmailbutton])
                break;
            case constant.CLOSE:
                setButtons([saveInternalbutton, PreviewService, sendEmailbutton])
                    break;
            default:setButtons([])
                    break;
        }
    }, [Jobdata])

    useEffect(() => {
        if (Data.Jobdata.JobId) {
            JobMonitorStore.actionCreators.LoadDetail(dispatch, Data.Jobdata.JobId)
        }
    },[])
    return(
        <React.Fragment>
            {//console.log('render Monitor')
                //2Times data,button
            }
            {isOpen ? <Redirect to={{
                pathname: '/Job',
                state: {
                    BackLink: {
                        pathname: '/JobMonitor',
                        state: {
                            BackLink: props.location.state && props.location.state.BackLink }
                    } }
            }}/> : null}
            {Data.Jobdata.JobId ? null : <Redirect to='/dashboard' />}
            <SlideModal 
                BackLink={props.BackLink || (props.location.state&& props.location.state.BackLink)||"/dashboard"}
                ButtonJson={buttons}>
                <JobMonitorForm SaveActual={saveActual} />
            </SlideModal>
            {isPrint ? <Redirect to='/report/delivery-certificate' /> : null}
            {isPreview?<Redirect to={{
                pathname: '/report/actual-report',
                state: { Data: Data }
            }}
            />:null}
        </React.Fragment>
    )
}
const JobMonitorForm = React.memo((props)=> {
    //Redux
    const CanEdit = useSelector(state => state.JobMointorReducer.Form.Jobdata && state.JobMointorReducer.Form.Jobdata.canEdit || false)
    const Data = useSelector(state => state.JobMointorReducer.Form.JobActualList)
    //Props
    //Declare State

    //Effect
    //Event+function
    
    //SubComponent
    const Actual = (Data && Data.map(item =>

        (
            <DetailBox key={common.uuidv4()} HeaderText={`Job Actual Result : ${item.SerialNo}`} button2hidden={false}>
                <JobActualResult Data={item}  />
            </DetailBox>
        )
    )) 
    const compEdit = (
        <React.Fragment>
            {Actual}
            <DetailBox HeaderText="Customer Signature">
                <Signature SaveActual={props.SaveActual} />
            </DetailBox>
            <DetailBox HeaderText="Engineer Signature">
                <Signature SaveActual={props.SaveActual} isEngineer/>
            </DetailBox>
            <DetailBox HeaderText="Internal Service Report">
                <InternalServiceReport />
            </DetailBox>
        </React.Fragment>
    )
     

    return (
        <React.Fragment>
            <Container className="modal-Container">
            <DetailBox HeaderText="Job Detail">
                        <JobDetail />
                    </DetailBox>
                    {
                        CanEdit? compEdit :null
                    }
                    
            </Container>
                </React.Fragment>

    );
})
export function JobDetail() {
    //Redux
    const jobdata = useSelector(state => state.JobMointorReducer.Form.Jobdata)
    const Form = useSelector(state => state.JobMointorReducer.Form)
    //const Machine = useSelector(state => state.JobMointorReducer.Form.Machine)
    //const engineer = useSelector(state => state.JobMointorReducer.Form.Engineer)
    //const Tools = useSelector(state => state.JobMointorReducer.Form.Tools)
    //Props
    //Declare State

    //Effect
    //Event+function
    //SubComponent


    return (
        <div>
            <FormRow label="Job Number">
                <label htmlFor="Job_Number_Value">{jobdata.JobNumber}</label>
            </FormRow>
            <FormRow label="Job Type">
                <label htmlFor="Job_Type_Value">{jobdata && jobdata.JobType}</label>
            </FormRow>
            <FormRow label="Status">
                <label htmlFor="Status_Value">{jobdata && jobdata.JobStatus}</label>
            </FormRow>
            <FormRow label="Customer">
                <LinkModal.Customer Text={jobdata && jobdata.CustomerName} Value={ jobdata && jobdata.CustomerId} />
            </FormRow>
            <FormRow label="PO No.">
                <LinkModal.ServiceRequest Text={jobdata && jobdata.PoNumber} Value={jobdata && jobdata.ServiceRequestId} />
            </FormRow>
            <FormRow label="Brief">
                <label htmlFor="Brief_Value">{jobdata && jobdata.Brief}</label>
            </FormRow>
            <FormRow label="Planned Date">
                <label htmlFor="Planned_Date_Value">{jobdata && jobdata.DateFrom}</label>
            </FormRow>
            <FormRow label="To Date">
                <label htmlFor="To_Value">{jobdata && jobdata.DateTo}</label>
            </FormRow>
            <div className="row detail-form">
                <div className="col-12 col-md-4">
                    <label htmlFor="Machine" className="col-label-bold">Machine</label>
                </div>
                <div className="col-12 col-md-8 col-detailForm">
                    {
                        Form.Machine && Form.Machine.map(item => (
                            <div className="col-12 detail-form" key={common.uuidv4()}>
                                <label >{item.MachineName}</label>{`(${item.SerialNo})`}<br />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="row detail-form">
                <div className="col-12 col-md-4">
                    <label htmlFor="Engineers" className="col-label-bold">Engineers</label>
                </div>
                <div className="col-12 col-md-8 col-detailForm">
                    {
                        Form.Engineer && Form.Engineer.map(item => (
                            <div className="col-12 detail-form" key={common.uuidv4()}>
                                <LinkModal.Engineer Value={item} />
                                <br />
                                <label htmlFor="Engineers_Value">{item.Telephone}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="row detail-form">
                <div className="col-12 col-md-4">
                    <label htmlFor="Tools" className="col-label-bold">Tools</label>
                </div>
                <div className="col-12 col-md-8 col-detailForm">
                    {
                        Form.Tools && Form.Tools.map(item => (
                            <div className="col-12 detail-form" key={common.uuidv4()}>
                                <label htmlFor="Tools_Value">{item.ToolsName}</label><br />
                                <label className="text-detail" htmlFor="Tools_Value">{`${item.SerialNo}`}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
            </div>
            <FormRow label="Link">
                <a target='_blank' href={jobdata.Link}>{jobdata.Link}</a>
            </FormRow>
            <FormRow label="Onsite By">
                <label htmlFor="OnsiteBy_Value">{jobdata && jobdata.OnsiteBy}</label>
            </FormRow>
        </div>
    );
}
export default JobMonitorScreen