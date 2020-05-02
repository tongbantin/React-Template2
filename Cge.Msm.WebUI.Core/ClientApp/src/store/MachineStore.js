import * as Constants from './constants'
import Axios from 'axios'
import * as constant from './../components/CommonFunction/constant'
import * as common from './../components/CommonFunction/common-function'
export const ActionType = {

    //ActiveMachine
    GetActiveMachineList: "MachineReducer_GetActiveMachineList",
    GetActiveMachineData: "MachineReducer_GetActiveMachineData",
    ClearActiveMachineData: "MachineReducer_ClearActiveMachineData",
    GetActiveMachineCriteria: "MachineReducer_ActiveMachineCriteria",
    GetActiveMachineForm: "MachineReducer_GetActiveMachineForm",

}
const initial_state = {
    //Active Tool
    ActiveMachineCriteriaForm: {},
    ActiveMachineCriteria: {},
    ActiveMachineList: [],
    ActiveMachineData: {
        "ActiveMachineId": "",
        "MachineId": "",
        "SerialNo": "",
        "CustomerId": "",
        "SetupDate": "",
        "IsServiceCalibrate": "",
        "ServiceActiveFromDate": "",
        "ServiceActiveToDate": "",
        "IsEndMonthService": "",
        "CalibrateActiveFromDate": "",
        "CalibrateActiveToDate": "",
        "IsEndMonthCalibrate": "",
        "ServiceMonths": "",
        "CalibrateMonths": "",
        "CreatedDate": "",
        "CreatedBy": "",
        "UpdatedDate": "",
        "UpdatedBy": "",

        MachineBrand: "",
        MachineModel: ""

    },
    ActiveMachineInput: {},



}

export const actionCreators = {
    //Tools Maintenances
    SearchActiveMachine: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetActiveMachineList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.GetActiveMachineList, param: resultsort })
                }
                
            }).catch((error) => {
                common.apiError(error)
            });
    },
    GetActiveMachineData: (dispatch, id) => {
        let url = `${Constants.API_URL}/api/Master/GetActiveMachine`
        return Axios.post(url, { id: id })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetActiveMachineData, param: response.data })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    SaveActiveMachine: (dispatch, param, criteria) => {
        let url
        if (param.ActiveMachineId != "") {
            url = `${Constants.API_URL}/api/Master/UpdateActiveMachine`
        } else {
            url = `${Constants.API_URL}/api/Master/CreateActiveMachine`
        }
        return Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetActiveMachineData, param: response.data })
                    actionCreators.SearchActiveMachine(dispatch, criteria)
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    DeleteActiveMachine: (dispatch, id, criteria) => {
        let url = `${Constants.API_URL}/api/Master/DeleteActiveMachine`
        Axios.post(url, { id: id })
            .then((response) => {
                actionCreators.SearchActiveMachine(dispatch, criteria)
            }).catch((error) => {
                common.apiError(error)
            });
    },
    ReSchedule: (dispatch,activeMachine) => {
        let url = `${Constants.API_URL}/api/Job/CreateJobSchedule`
        Axios.post(url, activeMachine)
            .then((response) => {
            }).catch((error) => {
                common.apiError(error)
            });
    },
    ReSchedule2: (dispatch, activeMachine,jobtype) => {
        let url = `${Constants.API_URL}/api/Job/CreateJobScheduleServiceCalibrate`
        if (jobtype == common.Constants.SERVICE_PM) {
            url = `${Constants.API_URL}/api/Job/CreateJobScheduleService`
        } else if (jobtype == common.Constants.CALIBRATE){
            url = `${Constants.API_URL}/api/Job/CreateJobScheduleCalibrate`
        }
        return common.to(Axios.post(url, activeMachine))
    },
    CheckDupplicateSerial: (activeMachine) => {
        let url = `${Constants.API_URL}/api/Master/ValidateSaveActiveMachine`
        return Axios.post(url, activeMachine)
            .then((response) => {
                if (response.data)
                    return response.data
            }).catch((error) => { common.apiError(error) });
    },
    CheckValidateDeleteActiveMachine: (activeMachine) => {
         let url = `${Constants.API_URL}/api/Master/ValidateDeleteActiveMachine`
         return Axios.post(url, activeMachine)
            .then((response) => {
                if (response.data)
                    return response.data
            }).catch((error) => { common.apiError(error) });
    },

}

//reducer Name
export const MachineReducer = (state = JSON.parse(JSON.stringify(initial_state)), action) => {
    switch (action.type) {
        //ToolsMaintenances
        case ActionType.GetActiveMachineList:
            state.ActiveMachineList = action.param
            break;
        case ActionType.GetActiveMachineData:
            state.ActiveMachineData = action.param
            state.ActiveMachineInput = action.param
            break;
        case ActionType.ClearActiveMachineData:
            state.ActiveMachineData = initial_state.ActiveMachineData
            state.ActiveMachineInput = initial_state.ActiveMachineInput
            break;
        case ActionType.GetActiveMachineCriteria:
            state.ActiveMachineCriteria = action.param
            break;
        case ActionType.GetActiveMachineForm:
            state.ActiveMachineInput = action.param
            break;
        default:
            break;

    }
    return state
}