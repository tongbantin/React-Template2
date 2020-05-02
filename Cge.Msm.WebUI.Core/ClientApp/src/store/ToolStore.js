import * as Constants from './constants'
import Axios from 'axios'
import * as constant from './../components/CommonFunction/constant'
import * as common from './../components/CommonFunction/common-function'
export const ActionType = {
    //Tools Maintenances Leave
    GetToolsMaintenanceList: "ToolsReducer_GetToolsMaintenanceList",
    GetToolsMaintenanceData: "ToolsReducer_GetToolsMaintenanceData",
    ClearToolsMaintenanceData: "ToolsReducer_ClearToolsMaintenanceData",
    GetToolsMaintenanceCriteria: "ToolsReducer_GetToolsMaintenanceCriteria",
    GetToolsMaintenanceForm: "ToolsReducer_GetToolsMaintenanceForm",
    //ActiveTools
    GetActiveToolsList: "ToolsReducer_GetActiveToolsList",
    GetActiveToolsData: "ToolsReducer_GetActiveToolsData",
    ClearActiveToolsData: "ToolsReducer_ClearActiveToolsData",
    GetActiveToolsCriteria: "ToolsReducer_ActiveToolsCriteria",
    GetActiveToolsForm: "ToolsReducer_GetActiveToolsForm",
    
}
const initial_state = {
     //Tools Maintenances Leave
    ToolMaintenanceCriteriaForm: {},
    ToolsMaintenanceCriteria: {},
    ToolsMaintenanceList: [],
    ToolsMaintenanceData: {
        "ToolsLeaveId": "",
        "SerialNo": "",
        "LeaveFromDate": "",
        "LeaveToDate": "",
        "LeaveCount": "",
        "LeaveType": "",
        "LeaveRemark": "",
        "CreatedDate": "",
        "CreatedBy": "",
        "UpdatedDate": "",
        "UpdatedBy": ""
    },
    ToolsMaintenanceInput: {},
    //Active Tool
    ActiveToolCriteriaForm: {},
    ActiveToolCriteria: {},
    ActiveToolList: [],
    ActiveToolData: {
        "ActiveToolsId": "",
        "ToolsId": "",
        "SerialNo": "",
        "ToolsType": "",
        "ToolsName": "",
        "IsActive": true,
        "CreatedDate": "",
        "CreatedBy": "",
        "UpdatedDate": "",
        "UpdatedBy": ""
    },
    ActiveToolInput: {},

}

export const actionCreators = {
    //Tools Maintenances
    SearchToolsMaintenance: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetToolsLeaveList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.GetToolsMaintenanceList, param: resultsort })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    GetToolsMaintenanceData: (dispatch, id) => {
        let url = `${Constants.API_URL}/api/Master/GetToolsLeave`
        return Axios.post(url, { id: id })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetToolsMaintenanceData, param: response.data })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    SaveToolsMaintenance: (dispatch, param, criteria) => {
        let url
        if (param.ToolsLeaveId != "") {
            url = `${Constants.API_URL}/api/Master/UpdateToolsLeave`
        } else {
            url = `${Constants.API_URL}/api/Master/CreateToolsLeave`
        }
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetToolsMaintenanceData, param: response.data })
                    actionCreators.SearchToolsMaintenance(dispatch, criteria)
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    DeleteToolsMaintenance: (dispatch, id, criteria) => {
        let url = `${Constants.API_URL}/api/Master/DeleteToolsLeave`
        Axios.post(url, { id: id })
            .then((response) => {
                actionCreators.SearchToolsMaintenance(dispatch, criteria)
            }).catch((error) => {
                common.apiError(error)
            });
    },
    //Active Tools 
    SearchActiveTools: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetActiveToolsList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.GetActiveToolsList, param: resultsort })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    GetActiveToolData: (dispatch, id) => {
        let url = `${Constants.API_URL}/api/Master/GetActiveTools`
        return Axios.post(url, { id: id })
            .then((response) => {
                if (response.data) {
                   
                    dispatch({ type: ActionType.GetActiveToolsData, param: response.data })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    SaveActiveTool: (dispatch, param, criteria) => {
        let url
        if (param.ActiveToolsId != "") {
            url = `${Constants.API_URL}/api/Master/UpdateActiveTools`
        } else {
            url = `${Constants.API_URL}/api/Master/CreateActiveTools`
        }
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetActiveToolsData, param: response.data })
                    actionCreators.SearchActiveTools(dispatch, criteria)
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    DeleteActiveTool: (dispatch, id, criteria) => {
        let url = `${Constants.API_URL}/api/Master/DeleteActiveTools`
        Axios.post(url, { id: id })
            .then((response) => {
                actionCreators.SearchActiveTools(dispatch, criteria)
            }).catch((error) => {
                common.apiError(error)
            });
    }, CheckDupplicateSerial: async (activeMachine) => {
        let url = `${Constants.API_URL}/api/Master/ValidateSaveActiveTools`
        var {result,error} = await common.to(Axios.post(url, activeMachine))
        if(result)
            return result.data
    },
    CheckJobAssignTool: (criteria) => {
        let url = `${Constants.API_URL}/api/Job/GetJobList`
         return Axios.post(url, criteria )
            .then((response) => {
                return response.data
            }).catch((error) => { common.apiError(error) });
    },
    CheckValidateDeleteActiveTool: (tool) => {
        let url = `${Constants.API_URL}/api/Master/ValidateDeleteActiveTools`
        return Axios.post(url, tool)
            .then((response) => {
                if (response.data)
                    return response.data
            }).catch((error) => { common.apiError(error) });
    },
}

//reducer Name
export const ToolsReducer = (state = JSON.parse(JSON.stringify(initial_state)), action) => {
    switch (action.type) {
        //ToolsMaintenances
        case ActionType.GetToolsMaintenanceList:
            state.ToolsMaintenanceList = action.param
            break;
        case ActionType.GetToolsMaintenanceData:
            state.ToolsMaintenanceData = action.param
            state.ToolsMaintenanceInput = action.param
            break;
        case ActionType.ClearToolsMaintenanceData:
            state.ToolsMaintenanceData = initial_state.ToolsMaintenanceData
            state.ToolsMaintenanceInput = initial_state.ToolsMaintenanceInput
            break;
        case ActionType.GetToolsMaintenanceCriteria:
            state.ToolsMaintenanceCriteria = action.param
            break;
        case ActionType.GetToolsMaintenanceForm:
            state.ToolsMaintenanceInput = action.param
            break;
        //Active Tools
        case ActionType.GetActiveToolsList:
            state.ActiveToolList = action.param
            break;
        case ActionType.GetActiveToolsData:
            state.ActiveToolData = action.param
            state.ActiveToolInput = action.param
            break;
        case ActionType.ClearActiveToolsData:
            state.ActiveToolData = initial_state.ActiveToolData
            state.ActiveToolInput = initial_state.ActiveToolInput
            break;
        case ActionType.GetActiveToolsForm:
            state.ActiveToolInput = action.param
            break;
        default:
            break;

    }
    return state
}