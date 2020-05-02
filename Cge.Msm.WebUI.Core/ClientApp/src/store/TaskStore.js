import * as Constants from './constants'
import Axios from 'axios'
import * as constant from './../components/CommonFunction/constant'
import * as common from './../components/CommonFunction/common-function'
export const ActionType = {
    CREATE: 'CreateTask',
    READ: 'ReadTask',
    UPDATE: 'UpdateTask',
    DELETE: 'DeleteTask',
    CLEAR: 'ClearTask',
    GetDetail: 'TaskReducer_GetDetail',
    GetMachine: 'TaskReduer_GetMachine',
    GetContact: 'TaskReduer_GetContact',
    GetEngineer: 'TaskReduer_GetEngineer',
    ClearDetail: 'TaskReducer_ClearDetail',
    fChange: 'Task_FormChange',
    criteriaChange:'Task_criteriaChange'
}
const initial_state ={
    //State ของ reducer นี้ประกอบไปด้วย
    //1.
    TaskData:[],
    Form:{
        mode:"Idle",//Add Edit View Idle
        data:{
            
        }
        , CanEdit: 0,
        Machine: [],
        Contact: [],
        Engineer: [],
        FormInput: {}
        
    },
    SearchCriteriaInitial: {
        FullText: "",
    },
    SearchCriteria: {
    }
    

}






export const actionCreators = {
    dataToTaskform: async (dispatch, jobId) => {

        let url = `${Constants.API_URL}/api/Job/GetJob`
        var promise = Axios.post(url, { id: jobId})
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetDetail, param: response.data })
                     
                    let url2 = `${Constants.API_URL}/api/Customer/GetCustomerContactList`
                    Axios.post(url2, { id: response.data.CustomerId })
                        .then((response) => {
                            if (response.data) {
                                dispatch({ type: ActionType.GetContact, param: response.data })
                            }
                        }).catch((error) => { common.apiError(error) });
                }
            }).catch((error) => { common.apiError(error) });
        url = `${Constants.API_URL}/api/Job/GetJobMachineList`
        Axios.post(url, { id: jobId })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetMachine, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });

        url = `${Constants.API_URL}/api/Job/GetJobEmployeeAllocateList`
        Axios.post(url, { id: jobId })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetEngineer, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
        return await promise
    },
    Search:(dispatch,criteria)=>{
        let url = `${Constants.API_URL}/api/Job/GetJobList`
        Axios.post(url, { ...criteria, JobStatus: [constant.PREPLAN, constant.CALLED] })
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.READ, param: resultsort })
                }
            }).catch((error) => { common.apiError(error) });
    },
    MarkAsCall: (dispatch,data) => {
        let url = ""
        url = `${Constants.API_URL}/api/Job/UpdateJobInfo`
        Axios.post(url, { ...data, JobStatus: constant.CALLED }).then(response => {
            if (response.data) {
                dispatch({ type: ActionType.GetDetail, param: response.data })
            }
        }).catch((error) => common.apiError(error));
    }
}

//reducer Name
export const TaskReducer = (state = JSON.parse(JSON.stringify(initial_state)),action)=>{
    switch(action.type){
        case ActionType.READ:
        state.TaskData= action.param
        break;
        case ActionType.ClearDetail : 
            state.Form.data = initial_state.Form.data
            break;
        case ActionType.CLEAR:
            state.SearchCriteriaInitial = {
                FullText: ""
            }
            break;
        case ActionType.GetDetail:
            state.Form.data = action.param
            break;
        case ActionType.GetMachine:
            state.Form.Machine = action.param
            break;
        case ActionType.GetContact:
            state.Form.Contact = action.param
            break;
        case ActionType.GetEngineer:
            state.Form.Engineer = action.param
            break;
        default:
            break;
            
    }
    return state
}