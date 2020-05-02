import * as Constants from './constants'
import Axios from 'axios'
import * as common from './../components/CommonFunction/common-function'
export const ActionType = {
    CREATE: 'CreateJobActualy',
    READ: 'ReadJobActualy',
    UPDATE: 'UpdateJobActualy',
    DELETE: 'DeleteJobActualy',
    CLEAR: 'ClearJobActualy',
    fADD: 'AddJobActualy',
    fView: 'ViewJobActualy',
    fEdit: 'EditJobActualy',
    fIdle: 'IdleJobActualy'
}
const initial_state = {
    //State ของ reducer นี้ประกอบไปด้วย
    //1.
    JobActualydata: [],
    Form: {
        mode: "Idle",//Add Edit View Idle
        data: {
            "JOB_ACTUAL_ID": "",
            "JOB_ID": "",
            "JOB_STATUS": "",
            "ACTUAL_WORK_FROM_DATE": "",
            "ACTUAL_WORK_TO_DATE": "",
            "ACCEPTED_BY": null,
            "ACCEPTED_DATE": "",
            "SIGNATURE_ID": null,
            "DOC_PICTURE1_ID": null,
            "DOC_PICTURE2_ID": "",
            "REMARK1": "",
            "REMARK2": null,
            "CREATED_DATE": "",
            "CREATED_BY": "Tae",
            "UPDATED_DATE": "",
            "UPDATED_BY": "Event"
        },
        fileData: []
    }

}


//action
export const actionCreators = {
    saveJobActualy: (dispatch, data, mode) => {
        let url = ""
        if (mode == "Add")
            url = `${Constants.API_URL}/api/JobActual/CreateJobActual`
        else if (mode == "Edit")
            url = `${Constants.API_URL}/api/JobActual/UpdateJobActual`
        Axios.post(url, data).then(response => {
            actionCreators.SearchJobActualy(dispatch, data.JOB_ID)
        }).catch((error) => common.apiError(error));
    },
    
    SearchJobActualy: (dispatch, JobId) => {
        let url = `${Constants.API_URL}/api/JobActual/GetJobActual`
        Axios.post(url, { JobId: JobId })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.READ, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    },

    dataToJobActualyForm: (dispatch, JobId, JobActualId, actiontype) => {
        let url = `${Constants.API_URL}/api/JobActual/GetJobActual`
        return Axios.post(url, { JobId: JobId, JobActualId: JobActualId })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: actiontype, param: response.data[0] })
                }
            }).catch((error) => { common.apiError(error) });
    },
    


}
//reducer Name
export const jobActualyReducer = (state = JSON.parse(JSON.stringify(initial_state)), action) => {
    switch (action.type) {//Action type แยกไว้ในไฟล์เดียวกันกับฝั่งเรียกใช้
        case ActionType.READ:
            state.JobActualydata = action.param
            break;
        case ActionType.CREATE:
            break;
        case ActionType.CLEAR:
            state.JobActualydata = []
            break;
        case ActionType.fADD:
            state.Form.data = initial_state.Form.data
            state.Form.mode = "Add"
            break;
        case ActionType.fIdle:
            state.Form.data = initial_state.Form.data
            state.Form.mode = "Idle"
            break;
        case ActionType.fView:
            state.Form.data = action.param
            state.Form.mode = "View"
            break;
        case ActionType.fEdit:
            state.Form.data = action.param
            state.Form.mode = "Edit"
            break;
        case ActionType.GetFileDocumentData:
            state.Form.fileData = action.param;
            break;
        default:
            break;

    }
    return state
}