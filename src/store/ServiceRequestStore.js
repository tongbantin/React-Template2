import * as Constants from './constants'
import Axios from 'axios'
import * as common from './../components/CommonFunction/common-function'
export const ActionType = {
    CREATE: 'ServiceRequestReduer_CreateServiceRequest',
    READ: 'ServiceRequestReduer_ReadServiceRequest',
    UPDATE: 'ServiceRequestReduer_UpdateServiceRequest',
    DELETE: 'ServiceRequestReduer_DeleteServiceRequest',
    CLEAR: 'ServiceRequestReduer_ClearServiceRequest',
    GetDetail: 'ServiceRequestReduer_GetServiceRequestDetail',
    GetAttach: 'ServiceRequestReduer_GetAttach',
    ClearDetail: 'ServiceRequestReduer_ClearServiceRequestDetail',
    fChange: 'ServiceRequestReduer_FormChange',
    criteriaChange: 'ServiceRequestReduer_criteriaChange',
    GetMachine: 'ServiceRequestReduer_GetMachine',
    GetEngineer: 'ServiceRequestReduer_GetEngineer',
    GetRequestItem: 'ServiceRequestReduer_GetRequestItem'
}
const initial_state = {
    //State ของ reducer นี้ประกอบไปด้วย
    //1.
    ServiceRequestData: [],

    Form: {
        serviceRequestdata: {
            "ServiceRequestId": "",
            "PoNumber": "",
            "PoDate": "",
            "JobType": "",
            "RequestedDate": "",
            "DueDate": "",
            "CustomerId": "",
            "CustomerName": "",
            "ContactPerson": "",
            "ContactPhone": "",
            "ContactEmail": ""
        }
        , CanEdit: 0,
        FormInput: {},
        MachineData: [],
        EngineerData: [],
        RequestItemData: [],
        ServiceRequestAttachment: []
    },
    SearchCriteriaInitial: {
        FullText : "",
        RequestedDateFrom: "",
        DueDateFrom: "",
        JobTypes : "",
        JobStatus : "",

    },
    SearchCriteria: {
    }

}

export const actionCreators = {
    saveServiceRequest: (dispatch, data) => {
        let url = ""
        let serviceID = data.ServiceRequestId;
        if (serviceID) {
            url = `${Constants.API_URL}/api/ServiceRequest/UpdateServiceRequest`
        } else {
            url = `${Constants.API_URL}/api/ServiceRequest/CreateServiceRequest`
        }
        Axios.post(url, data).then(response => {
            //dispatch({ type: ActionType.GetDetail, param: response.data })
            actionCreators.getDataServiceRequest(dispatch, response.data.ServiceRequestId)
        }).catch((error) => { common.apiError(error) });
    },
    SearchServiceRequest: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/ServiceRequest/GetServiceRequestList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.READ, param: resultsort })
                }
            }).catch((error) => { common.apiError(error) });
    },

    SearchPONumberServiceRequest: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/ServiceRequest/GetServiceRequestList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.READ, param: resultsort })
                }
            }).catch((error) => { common.apiError(error) });
    },

    getDataServiceRequest: async (dispatch, param) => {
        let url = `${Constants.API_URL}/api/ServiceRequest/GetServiceRequest`
        let CurrentJobID
        var res = Axios.post(url, { id: param })
            .then((response) => {
                if (response.data) {
                    CurrentJobID = response.data.CurrentJobId
                    dispatch({ type: ActionType.GetDetail, param: response.data })

                    url = `${Constants.API_URL}/api/Job/GetJobMachineList`
                    Axios.post(url, {
                        id: CurrentJobID
                    })
                        .then((response) => {
                            if (response.data) {
                                dispatch({ type: ActionType.GetMachine, param: response.data })
                            }
                        }).catch((error) => { common.apiError(error) });
                    url = `${Constants.API_URL}/api/Job/GetJobEmployeeAllocateList`

                    Axios.post(url, {
                        id: CurrentJobID
                    })
                        .then((response) => {
                            if (response.data) {
                                dispatch({ type: ActionType.GetEngineer, param: response.data })
                            }
                        }).catch((error) => { common.apiError(error) });
                }
            }).catch((error) => { common.apiError(error) });
        actionCreators.LoadServiceAttachmentList(dispatch, param)
        actionCreators.getServiceRequestItem(dispatch, param)

    },
    getServiceRequestItem: (dispatch,param) => {
        let url = `${Constants.API_URL}/api/ServiceRequest/GetServiceRequestItems`
        return Axios.post(url, { id: param })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetRequestItem, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    },
    deleteServiceRequest: (param) => {
        let url = `${Constants.API_URL}/api/ServiceRequest/DeleteServiceRequest`
        return Axios.post(url, { id: param })
            .then((response) => {
            }).catch((error) => { common.apiError(error) });
    },
    deleteServiceRequestItem: (param) => {
        let url = `${Constants.API_URL}/api/ServiceRequest/DeleteServiceRequestItem`
        return Axios.post(url,  param )
            .then((response) => {
            }).catch((error) => { common.apiError(error) });
    },
    AddServiceRequestItem: (data) => {
        let url = `${Constants.API_URL}/api/ServiceRequest/AddServiceRequestItem`
        return Axios.post(url, data)
            .then((response) => {
            }).catch((error) => { common.apiError(error) });
    },
    CheckPoDupplicate: (id,po) => {
        let url = `${Constants.API_URL}/api/ServiceRequest/CheckDupplicatePO`
        return Axios.post(url, { ServiceRequestId: id, PoNumber: po })
            .then((response) => {
                return response.data
            }).catch((error) => { common.apiError(error) });
    },
    CheckDupplicateServiceRequest: (service) => {
        let url = `${Constants.API_URL}/api/ServiceRequest/CheckDupplicateServiceRequest`
        return common.to(Axios.post(url, service))
    }, saveAttachMedia: async (dispatch, base64,file, attatchdata) => {
        let url = `${Constants.API_URL_MEDIA}/api/Media/CreateBase64File`
        if(common.isEmptyStr(base64))
            return
        if(file&&file.ext){
            var { result, error } = await common.to(Axios.post(url, { base64: base64, typeFile: `.${file.ext}` }))
            if(error)
                return 
            if(result.data){
                attatchdata = { ...attatchdata, AttachmentName: `${file.fileName}.${file.ext}`, MediaId: result.data.Media_ID }
                actionCreators.saveJobAttachment(dispatch, attatchdata)
            }    
        }
           
    },
    saveJobAttachment: (dispatch, data) => {
        let url = `${Constants.API_URL}/api/ServiceRequest/AddServiceAttachment`
        Axios.post(url, data).then(response => {
            if (response.data) {
                actionCreators.LoadServiceAttachmentList(dispatch, data.ServiceRequestId)
            }
        }).catch((error) => common.apiError(error));
    },
    LoadServiceAttachmentList: (dispatch, ServiceRequestId) => {
        let url = `${Constants.API_URL}/api/ServiceRequest/GetServiceAttachmentList`
        return Axios.post(url, { ServiceRequestId: ServiceRequestId })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetAttach, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    },
    DeleteAttachment: (dispatch, attachment) => {
        let url = `${Constants.API_URL}/api/ServiceRequest/DeleteServiceRequestAttachment`
        Axios.post(url, attachment)
            .then((response) => {
                actionCreators.LoadServiceAttachmentList(dispatch, attachment.ServiceRequestId)
            }).catch((error) => {
                common.apiError(error)
            });
    },



}

//reducer Name
export const ServiceRequestReducer = (state = JSON.parse(JSON.stringify(initial_state)), action) => {
    switch (action.type) {
        case ActionType.READ:
            state.ServiceRequestData = action.param
            break;
        case ActionType.CREATE:
            state.ServiceRequestData = []
            break;
        case ActionType.DELETE:
            state.ServiceRequestData = action.param
            break;
        case ActionType.CLEAR:
            state.ServiceRequestData = []
            state.SearchCriteriaInitial = {
                SERVICE_REQUEST_ID: ""
            }
            break;
        case ActionType.ClearDetail:
            state.Form.serviceRequestdata = initial_state.Form.serviceRequestdata
            state.Form.RequestItemData = []
            state.Form.ServiceRequestAttachment =[]
            break;
        case ActionType.GetDetail:
            state.Form.serviceRequestdata = action.param;
            break;
        case ActionType.GetAttach:
            state.Form.ServiceRequestAttachment = action.param;
            break;
        case ActionType.GetMachine:           
            state.Form.MachineData = action.param;
            break;
        case ActionType.GetEngineer:
            state.Form.EngineerData = action.param;
            break;
        case ActionType.fChange:
            state.Form.FormInput = action.param;
            break;
        case ActionType.criteriaChange:
            state.SearchCriteria = action.param;
            break;
        case ActionType.GetRequestItem:
            state.Form.RequestItemData = action.param;
            break;

        default:
            break;

    }
    return state
}