import * as Constants from './constants'
import Axios from 'axios'
import * as constant from './../components/CommonFunction/constant'
import * as common from './../components/CommonFunction/common-function'

export const ActionType = {
    //Employee Leave
    GetEmployeeLeaveList: "EmployeeReducer_GetEmployeeLeaveList",
    GetEmployeeLeaveData: "EmployeeReducer_GetEmployeeLeaveData",
    ClearEmployeeLeaveData: "EmployeeReducer_ClearEmployeeLeaveData",
    GetEmployeeLeaveCriteria: "EmployeeReducer_GetEmployeeLeaveCriteria",
    GetEmployeeLeaveForm: "EmployeeReducer_GetEmployeeLeaveForm",
}
const initial_state = {
    //Tools Maintenances Leave
    EmployeeLeaveCriteriaForm: {},
    EmployeeLeaveCriteria: {},
    EmployeeLeaveList: [],
    EmployeeLeaveData: {
        "HolidayLeaveId": "",
        "EmployeeId": "",
        "EmployeeName": "",
        "LeaveStartDate": "",
        "LeaveEndDate": "",
        "LeaveType": "",
        "LeaveRemark": "",
        "CreatedDate": "",
        "CreatedBy": "",
        "UpdatedDate": "",
        "UpdatedBy": ""
    },
    EmployeeLeaveInput: {},

}


export const actionCreators = {
    SearchEmployeeLeave: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Employee/GetEmployeeLeaveList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.GetEmployeeLeaveList, param: resultsort })
                }
            }).catch((error) => { common.apiError(error) });
    },

    GetEmployeeLeaveData: (dispatch, id) => {
        let url = `${Constants.API_URL}/api/Employee/GetEmployeeLeave`
        return Axios.post(url, { id: id })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetEmployeeLeaveData, param: response.data })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },

    SaveEmployeeLeave: (dispatch, param, criteria) => {
        let url
        if (param.HolidayLeaveId != "") {
            url = `${Constants.API_URL}/api/Employee/UpdateEmployeeLeave`
        } else {
            url = `${Constants.API_URL}/api/Employee/CreateEmployeeLeave`
        }
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetEmployeeLeaveData, param: response.data })
                    actionCreators.SearchEmployeeLeave(dispatch, criteria)
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    DeleteEmployeeLeave: (dispatch, id, criteria) => {
        let url = `${Constants.API_URL}/api/Employee/DeleteEmployeeLeave`
        Axios.post(url, { id: id })
            .then((response) => {
                actionCreators.SearchEmployeeLeave(dispatch, criteria)
            }).catch((error) => {
                common.apiError(error)
            });
    },
    CheckJobAssignEmployee: (criteria) => {
        let url = `${Constants.API_URL}/api/Job/GetJobList`
        return Axios.post(url, criteria)
            .then((response) => {
                return response.data
            }).catch((error) => { common.apiError(error) });
    },

}

//reducer Name
export const EmployeeLeaveReducer = (state = JSON.parse(JSON.stringify(initial_state)), action) => {
    switch (action.type) {//Action type แยกไว้ในไฟล์เดียวกันกับฝั่งเรียกใช้
        case ActionType.GetEmployeeLeaveList:
            state.EmployeeLeaveList = action.param
            break;
        case ActionType.GetEmployeeLeaveData:
            state.EmployeeLeaveData = action.param
            state.EmployeeLeaveInput = action.param
            break;
        case ActionType.ClearEmployeeLeaveData:
            state.EmployeeLeaveData = initial_state.EmployeeLeaveData
            state.EmployeeLeaveInput = initial_state.EmployeeLeaveInput
            break;
        case ActionType.GetEmployeeLeaveCriteria:
            state.EmployeeLeaveCriteria = action.param
            break;
        case ActionType.GetEmployeeLeaveForm:
            state.EmployeeLeaveInput = action.param
            break;
        default:
            break;

    }
    return state
}