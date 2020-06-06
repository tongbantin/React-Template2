import * as Constants from './constants'
import Axios from 'axios'
import * as common from './../components/CommonFunction/common-function'
export const ActionType = {
    READ_EMP: "AddComponentReducer_READEMP",
    READ_INS: "AddComponentReducer_READINS",
    READ_TOOLS: "AddComponentReducer_READ_TOOLS",
    READ_TASK: "AddComponentReducer_READ_TASK",
}
const initial_state ={
   EmployeeList:[],
    MachineList: [],
    Tools: [],
    TaskList:[],
}






export const actionCreators = {
    //GetEmployee  :(dispatch,param)=>{
        
    //    let url = `${Constants.API_URL}/api/Employee/GetEmployeeList`
    //    Axios.post(url, param)
    //        .then((response) => {
    //            if (response.data) {
    //                dispatch({ type: ActionType.READ_EMP, param: response.data })
    //            }
    //        }).catch((error) => { common.apiError(error) });
       
    //},
    GetEmployeeWithAssignList: (dispatch, param) => {

        let url = `${Constants.API_URL}/api/Employee/GetEmployeeWithAssignList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.READ_EMP, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetMachine: (dispatch, param) => {

        let url = `${Constants.API_URL}/api/Master/GetActiveMachineList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.READ_INS, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    },
    GetTools: (dispatch, param) => {

        let url = `${Constants.API_URL}/api/Master/GetActiveToolsList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    
                    dispatch({ type: ActionType.READ_TOOLS, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    },
    GetActiveToolsWithAssignList: (dispatch, param) => {

        let url = `${Constants.API_URL}/api/Master/GetActiveToolsWithAssignList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {

                    dispatch({ type: ActionType.READ_TOOLS, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    },
    GetTask: (dispatch, param) => {

        let url = `${Constants.API_URL}/api/Job/GetJobList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.READ_TASK, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    }
}

//reducer Name
export const AddComponentReducer = (state = JSON.parse(JSON.stringify(initial_state)),action)=>{
    switch(action.type){
        case ActionType.READ_EMP:
        state.EmployeeList = action.param
            break;
        case ActionType.READ_INS:
            state.MachineList = action.param
            break;
        case ActionType.READ_TOOLS:
            state.Tools = action.param
            break;
        case ActionType.READ_TASK:
            state.TaskList = action.param
            break;
        default:
            break;
            
    }
    return state
}