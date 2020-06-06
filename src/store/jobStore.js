import * as Constants from './constants'
import Axios from 'axios'
import moment from 'moment';
import * as common from './../components/CommonFunction/common-function'
moment.locale('en-GB');

export const ActionType = {
    LoadDetail: 'JobReducer_LoadDetail',
    LoadMachine: 'JobReducer_LoadMachine',
    LoadEmployee: 'JobReducer_LoadEmployee',
    LoadTools: 'JobReducer_LoadTools',
    CLEAR_DETAIL: 'JobReducer_CLEARDETAIL',
    JobDetailChange: 'JobReducer_JobDetailChange',
    EngineerChange: 'JobReducer_EngineerChange',
    TaskJob: 'JobReducer_TaskJob',
    TaskJobDetail: 'JobReducer_TaskJobDetail',
    GetTaskJobForm: 'JobReducer_GetTaskJobForm',
}
const initial_state ={
    //State ของ reducer นี้ประกอบไปด้วย
    //1.
    Form: {
        Jobdata: {
            "JobId": "",
            "JobNumber": "",
            "JobType": "",
            "JobStatus": "",
            "DateFrom": "",
            "DateTo": "",
            "ServiceRequestId": "",
            "PoNumber": "",
            "Brief": "",
            "RefJobId": "",
            "CustomerId": "",
            "CustomerName": "",
            "MachineText": "",
            "Link": "",
            "Remark": "",
            "OnsiteBy": false,
            "CreatedDate": "",
            "CreatedBy": "",
            "UpdatedDate": "",
            "UpdatedBy": ""
        },
        JobdataInput: {},
        Machine: [],
        Engineer:[],
        Tools: [],

    },
    TaskJobData: [],
    TaskJobDetail: {
        "start": "",
        "end": "",
        "title": "",
        "remark": "",
        "status" : ""

    }
   
}


//action
export const actionCreators = {
    UpdateJob: (dispatch, data) => {
        let url = `${Constants.API_URL}/api/Job/UpdateJobInfo`
        Axios.post(url, data)
            .then((response) => {
                if (response.data) {
                    
                    actionCreators.dataToJobform(dispatch, data.JobId)
                }
                    
        }).catch((error) => { common.apiError(error) });
    },
    dataToJobform:  (dispatch, JobId) => {
        let url = `${Constants.API_URL}/api/Job/GetJob`
        //return
        return new Promise(async (resolve, reject) => {
            Axios.post(url, { id: JobId })
                .then((response) => {
                    if (response.data) {
                        dispatch({ type: ActionType.LoadDetail, param: response.data })
                    }
                }).catch((error) => {
                    common.apiError(error)
                    reject(error)
                });

            var res1 = await actionCreators.GetJobMachineList(dispatch, JobId)
            var res2 = await actionCreators.GetJobEmployeeAllocateList(dispatch, JobId)
            var res3 = await actionCreators.GetJobToolsAllocateList(dispatch, JobId)
            resolve()
        })
        
        
    },
    //Machine
    GetJobMachineList: (dispatch, JobId) => {

        return Axios.post(`${Constants.API_URL}/api/Job/GetJobMachineList`, { id: JobId })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.LoadMachine, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    },
    UpdateMachineList: (dispatch, JobId,data) => {
        let url = `${Constants.API_URL}/api/Job/UpdateJobMachine`
        Axios.post(url, data)
            .then((response) => {
                actionCreators.GetJobMachineList(dispatch, JobId)
            }).catch((error) => { common.apiError(error) });
    },
    UpdateMachineDetail: (dispatch, JobId, data) => {
        let url = `${Constants.API_URL}/api/Job/UpdateJobMachineDetail`
        Axios.post(url, data)
            .then((response) => {
                actionCreators.GetJobMachineList(dispatch, JobId)
            }).catch((error) => { common.apiError(error) });
    },
    RemoveMachine: async(dispatch,data) => {
        let url = `${Constants.API_URL}/api/Job/ValidateDeleteJobMachine`

        let { result, error } = await common.to(Axios.post(url, data))
        if (error) {
            return 
        }
        if (result && result.data) {
            if (!result.data.isValid) {
                common.InformationOKDialog(result.data.Messages && common.ArrayTextReduce(result.data.Messages))
                return
            }      
        }
        url = `${Constants.API_URL}/api/Job/DeleteJobMachine`
        Axios.post(url,data)
            .then((response) => {
                actionCreators.GetJobMachineList(dispatch, data.JobId)
            }).catch((error) => { common.apiError(error) });
    },
    RemoveAllMachine: (dispatch,JobId) => {
        let url = `${Constants.API_URL}/api/Job/DeleteAllJobMachine`
        Axios.post(url, { JobId: JobId})
            .then((response) => {
                actionCreators.GetJobMachineList(dispatch, JobId)
            }).catch((error) => { common.apiError(error) });
    },
    //Employee
    GetJobEmployeeAllocateList: (dispatch, JobId) => {

        return Axios.post(`${Constants.API_URL}/api/Job/GetJobEmployeeAllocateList`, { id: JobId })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.LoadEmployee, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    },
    AddEmployee: (data) => {
        let url = `${Constants.API_URL}/api/Job/AddJobEmployeeAllocate`
        Axios.post(url, data)
            .then((response) => {
            }).catch((error) => { common.apiError(error) });
    },
    UpdateJobEmployeList: (dispatch, JobId, data) => {
        let url = `${Constants.API_URL}/api/Job/UpdateJobEmployeeAllocate`
        Axios.post(url, data)
            .then((response) => {
                actionCreators.GetJobEmployeeAllocateList(dispatch, JobId)
            }).catch((error) => { common.apiError(error) });
    },
    RemoveEmployee: (EmployeeAllocate) => {
        let url = `${Constants.API_URL}/api/Job/DeleteJobEmployeeAllocate`
        return Axios.post(url, EmployeeAllocate)
            .then((response) => {
            }).catch((error) => { common.apiError(error) });
    },
    RemoveAllEmployee: (dispatch, JobId) => {
        let url = `${Constants.API_URL}/api/Job/DeleteAllEmployeeAllocateList`
        Axios.post(url, { JobId: JobId })
            .then((response) => {
                actionCreators.GetJobEmployeeAllocateList(dispatch, JobId)
            }).catch((error) => { common.apiError(error) });
    },
    //Tools
    GetJobToolsAllocateList: (dispatch, JobId) => {

        return Axios.post(`${Constants.API_URL}/api/Job/GetJobToolsAllocateList`, { id: JobId })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.LoadTools, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    },
    UpdateJobToolsAllocate: (dispatch, JobId, data) => {
        let url = `${Constants.API_URL}/api/Job/UpdateJobToolsAllocate`
        Axios.post(url, data)
            .then((response) => {
                actionCreators.GetJobToolsAllocateList(dispatch, JobId)
            }).catch((error) => { common.apiError(error) });
    },
    AddTools: (data) => {
        let url = `${Constants.API_URL}/api/Job/AddJobToolsAllocate`
        Axios.post(url, data)
            .then((response) => {
            }).catch((error) => { common.apiError(error) });
    },
    RemoveTools: (ToolsAllocate) => {
        let url = `${Constants.API_URL}/api/Job/DeleteJobToolsAllocate`
        return Axios.post(url, ToolsAllocate)
            .then((response) => {
            }).catch((error) => { common.apiError(error) });
    },
    RemoveAllTools: (dispatch, JobId) => {
        let url = `${Constants.API_URL}/api/Job/DeleteAllToolsAllocateList`
        Axios.post(url, { JobId: JobId })
            .then((response) => {
                actionCreators.GetJobToolsAllocateList(dispatch, JobId)
            }).catch((error) => { common.apiError(error) });
    },
    getTaskJob: (dispatch, criteria) => {
        let url = `${Constants.API_URL}/api/Job/GetTaskJobList`
        Axios.post(url, criteria ).then(response => {
            if (response.data) {
                var eventlist = response.data;
                for (let i = 0; i < eventlist.length; i++) {                   
                    eventlist[i].start = moment.utc(eventlist[i].start).toDate();
                    eventlist[i].end = moment.utc(eventlist[i].end).toDate();
                }
                dispatch({ type: ActionType.TaskJob, param: eventlist })        
            }
        }).catch((error) => common.apiError(error));
    },
   

    
}
//reducer Name
export const jobReducer = (state =  JSON.parse(JSON.stringify(initial_state)),action)=>{
    switch(action.type){//Action type แยกไว้ในไฟล์เดียวกันกับฝั่งเรียกใช้
        case ActionType.CLEAR_DETAIL:
            state.Form.data = initial_state.Form.data
            break;      
        case ActionType.LoadDetail:
            state.Form.Jobdata = action.param
            state.Form.JobdataInput = action.param
            break;
        case ActionType.LoadMachine:
            state.Form.Machine = action.param
            state.Form.MachineInput = action.param
            break;
        case ActionType.LoadEmployee:
            
            state.Form.Engineer = action.param
            state.Form.EngineerInput = action.param
            break;
        case ActionType.LoadTools:
            state.Form.Tools = action.param
            state.Form.ToolsInput = action.param
            break;
        case ActionType.JobDetailChange:
            state.Form.JobdataInput = action.param
            break;
        case ActionType.EngineerChange:
            state.Form.EngineerInput = action.param
            break;
        case ActionType.TaskJob:
            state.TaskJobData = action.param
            break
        case ActionType.TaskJobDetail:
            state.TaskJobDetail = action.param
            break
        default:
            break;
            
    }
    return state
}