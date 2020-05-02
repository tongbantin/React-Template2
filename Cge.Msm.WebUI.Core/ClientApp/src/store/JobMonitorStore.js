import * as Constants from './constants'
import * as constant from './../components/CommonFunction/constant'
import * as common from './../components/CommonFunction/common-function'
import Axios from 'axios'

export const ActionType = {
    CREATE: 'CreateJobMointor',
    READ: 'JobMointor_Read',
    READ_Confilct: 'JobMointor_READ_Confilct',
    UPDATE: 'UpdateJobMointor',
    DELETE: 'DeleteJobMointor',
    CLEAR: 'ClearJobMointor',
    fADD: 'AddJobMointor',
    fView: 'ViewJobMointor',
    LoadDetail: 'JobMointor_LoadDetail',
    LoadEngineer: 'JobMointor_LoadEngineer',
    LoadMachine: 'JobMointor_LoadMachine',
    LoadTools: 'JobMointor_LoadTools',
    LoadActualList: 'JobMointor_LoadActualList',
    ActualListChange: 'JobMointor_ActualListChange',
    LoadAttachment: 'JobMointor_LoadAttachment',
    LoadInternalAttachment: 'JobMointor_LoadInternalAttachment',
    LoadInternal: 'JobMointor_LoadInternal',
    CLEAR_DETAIL: 'JobMointor_ClearDetail',
    fChange: 'JobMointor_FormChange',
    fActualyChange: 'JobMointor_fActualyChange',
    fInternalChange: 'JobMointor_fInternalChange',
    criteriaChange: 'JobMointor_criteriaChange',
    criteriaClear:'JobMointor_criteriaClear'
}
const initial_state = {
    //State ของ reducer นี้ประกอบไปด้วย
    //1.
    JobMointorData: [],
    JobConflictData: [],
    Form: {
        Jobdata: {

        },
        Machine: [],
        Engineer: [],
        Tools: [],
        JobActualList: [],
        JobActualInputList: [],
        JobActualData: {
            "JobActualId": "",
            "JobId": "",
            "JobStatus": "",
            "ActualWorkFromDate": "",
            "ActualWorkToDate": "",
            "AcceptedBy": "",
            "AcceptedDate": "",
            "SignatureId": "",
            "DocPicture1Id": "",
            "DocPicture2Id": "",
            "Remark1": "",
            "Remark2": "",
            "CreatedDate": "",
            "CreatedBy": "",
            "UpdatedDate": "",
            "UpdatedBy": ""
        }
        , FormActualInput: {}
        , Internal: {
            "JobId": "",
            "ActionShort": "",
            "Awareness": "",
            "FollowUp": "",
            "Opportunity": "",
            "Remark": "",
            "Link": "",
            "CreatedDate": "",
            "CreatedBy": "",
            "UpdatedDate": "",
            "UpdatedBy": ""
        }
        , InternalPhoto: []
        , InternalInput: {}

    },
    SearchCriteriaInitial: {
        FullText: "",
    },
    SearchCriteria: {
        FullText: "",
    }
}

export const actionCreators = {
    LoadDetail: async (dispatch, JobMointorID) => {
        let url = `${Constants.API_URL}/api/Job/GetJob`
        var promise1 = Axios.post(url, { id: JobMointorID })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.LoadDetail, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });

        url = `${Constants.API_URL}/api/Job/GetJobMachineList`
        Axios.post(url, { id: JobMointorID })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.LoadMachine, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
        url = `${Constants.API_URL}/api/Job/GetJobEmployeeAllocateList`
        Axios.post(url, { id: JobMointorID })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.LoadEngineer, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
        url = `${Constants.API_URL}/api/Job/GetJobToolsAllocateList`
        Axios.post(url, { id: JobMointorID })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.LoadTools, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });

        actionCreators.GetJobActualList(dispatch, JobMointorID)

        actionCreators.LoadInternalAttachmentList(dispatch, JobMointorID)
        url = `${Constants.API_URL}/api/Job/GetJobInternal`
        Axios.post(url, { id: JobMointorID })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.LoadInternal, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });

        return await promise1
    },
    GetJobActualList: (dispatch, JobMointorID) => {
        let url = `${Constants.API_URL}/api/Job/GetJobActualList`
        Axios.post(url, { id: JobMointorID })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.LoadActualList, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    },
    GetJob: (dispatch, JobMointorID) => {
        let url = `${Constants.API_URL}/api/Job/GetJob`
        Axios.post(url, { id: JobMointorID })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.LoadDetail, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    },
    GetJobActual: (JobId, SerialNo) => {
        let url = `${Constants.API_URL}/api/Job/GetJobActual`
        return Axios.post(url, { JobId, SerialNo })
            .then((response) => {
                if (response.data) {
                    return response.data;
                }
            }).catch((error) => { common.apiError(error) });
    },
    LoadInternalAttachmentList: (dispatch, JobId) => {
        let url = `${Constants.API_URL}/api/Job/GetJobAttachmentList`
        return Axios.post(url, { JobId: JobId, Section: 'Internal' })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.LoadInternalAttachment, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    },
    LoadAttachmentList_Return: (criteria, fn) => {
        let url = `${Constants.API_URL}/api/Job/GetJobAttachmentList`
        return Axios.post(url, criteria)
            .then((response) => {
                if (response.data) {
                    fn(response.data)
                }
            }).catch((error) => { common.apiError(error) });
    },
    Search: (dispatch, criteria) => {
        let url = `${Constants.API_URL}/api/Job/GetJobList`
        Axios.post(url, {
            ...criteria,
            JobStatus: [constant.CANCELED, constant.CLOSE, constant.COMMITED, constant.DRAFT, constant.ONDUTY, constant.PENDING],
            
        })
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.READ, param: resultsort })
                }
            }).catch((error) => { common.apiError(error) });
    },
    SearchConflict: (dispatch,criteria) => {
        let url = `${Constants.API_URL}/api/Job/GetJobConflictList`
        return Axios.post(url, {})
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.READ_Confilct, param: resultsort })
                }
            }).catch((error) => { common.apiError(error) });
    },
    SendEmailActual: async(dispatch, JobId, isSendMail) => {
        let url = `${Constants.API_URL}/api/Job/CreateServiceReport`
        if (isSendMail) {
            url = `${Constants.API_URL}/api/Job/CreateServiceReportEmail`
        }
        var {result,error} = await common.to(Axios.post(url, {id:JobId}))
        if(error){
            return
        }
        if(result.data && !isSendMail){
            common.DownloadReport(result.data,'ServiceReport.pdf')
        }  
    },
    CheckValidateSendEmail: (jobId) => {
        let url = `${Constants.API_URL}/api/Job/ValidateServiceReport`
        return common.to(Axios.post(url, { id: jobId }))
    },
    AddDeliveryReport: async(JobId) => {
        let url = `${Constants.API_URL}/api/Job/CreateDeliveryReport`    
        var {result,error} =  await common.to(Axios.post(url, { id: JobId }))  
        if(error){
            return
        }
        if(result.data){
            common.DownloadReport(result.data,'DeliveryReport.pdf')
        }  
    },
    SaveJob: (dispatch, Jobdata) => {
        let url = `${Constants.API_URL}/api/Job/UpdateJobInfo`
        Axios.post(url, Jobdata)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.LoadDetail, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });

    }, SaveActual: (dispatch, Actualdata) => {
        let url = `${Constants.API_URL}/api/Job/UpdateJobActual`
        Axios.post(url, Actualdata)
            .then((response) => {
                if (response.data) {

                }
            }).catch((error) => { common.apiError(error) })
    }, SaveActualList: (dispatch, ActualdataList) => {
        let url = `${Constants.API_URL}/api/Job/UpdateJobActualList`
        return Axios.post(url, ActualdataList)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.LoadActualList, param: response.data })
                }
            }).catch((error) => { common.apiError(error) })
    },
    SaveInternal: (dispatch, Internaldata) => {
        let url = `${Constants.API_URL}/api/Job/UpdateJobInternal`
        Axios.post(url, Internaldata)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.LoadInternal, param: response.data })
                }

            }).catch((error) => { common.apiError(error) });

    }, saveAttachMedia:  (dispatch, filedata, attatchdata) => {
        let url = `${Constants.API_URL_MEDIA}/api/Media/CreateMedia`
        return Axios.post(url, filedata).then(async(response) => {
            if (response.data) {
                attatchdata = { ...attatchdata, AttachmentName: response.data.Name, MediaId: response.data.Media_ID }
                await actionCreators.saveJobAttachment(dispatch, attatchdata)
                return true 
                //dispatch({ type: ActionType.GetFileDocumentData, param: response.data });
            }
            else {
                return false;
            }
        }).catch((error) => common.apiError(error));
    },
    saveJobAttachment: (dispatch, data) => {
        let url = `${Constants.API_URL}/api/Job/AddJobAttachment`
        return common.to(Axios.post(url, data))
    },
    saveJobAttachmentList: (dispatch, attachList) => {
        let url = `${Constants.API_URL}/api/Job/AddJobAttachmentList`
        return Axios.post(url, attachList).then(response => {
            if (response.data) {

            }
        }).catch((error) => common.apiError(error));
    },
    saveSignatureActualList: (dispatch, actualList,isEngineer =false) => {
        let url = `${Constants.API_URL}/api/Job/SaveActualSignatureList`
        if (isEngineer) {
            url = `${Constants.API_URL}/api/Job/SaveActualSignatureEngineerList`
        }
        return Axios.post(url, actualList).then(response => {
            if (response.data) {
                return response.data
            }
        }).catch((error) => common.apiError(error));
    },
    SaveSignatureMedia: (dispatch, signature, selected_serial, attatchdata,isEngineer) => {
        var convert = signature.replace("data:image/png;base64,", "");
        let url = `${Constants.API_URL_MEDIA}/api/Media/CreateBase64File`
        if(common.isEmptyStr(convert))
            return
        return Axios.post(url, { base64: convert,typeFile: ".png" }).then(response => {
            if (response.data) {
                attatchdata = { ...attatchdata, AttachmentName: response.data.Name, MediaId: response.data.Media_ID }

                if (selected_serial) {
                    var attach_list = selected_serial.map((item) => { return { ...attatchdata, SerialNo: item } })
                    
                    var actual_list = selected_serial.map((item) => { return { JobId: attatchdata.JobId, SerialNo: item, CustomerIncharge: attatchdata.CustomerIncharge, UpdatedBy: attatchdata.UpdatedBy } })
                    actionCreators.saveJobAttachmentList(dispatch, attach_list)
                    actionCreators.saveSignatureActualList(dispatch, actual_list, isEngineer).then(
                        res => {
                            actionCreators.GetJobActualList(dispatch, attatchdata.JobId)
                            actionCreators.GetJob(dispatch, attatchdata.JobId)
                        }
                    )
                }


                
                

            }
        }).catch((error) => common.apiError(error));
    },
    SaveFile64: async (dispatch, base64, file, attatchdata) => {
        let url = `${Constants.API_URL_MEDIA}/api/Media/CreateBase64File`
        if(common.isEmptyStr(base64))
            return
        if(file&&file.ext){
            var { result, error } = await common.to(Axios.post(url, { base64: base64, typeFile: `.${file.ext}` }))
            if (error) {
                return false
            }
            if (result) {
                attatchdata = { ...attatchdata, AttachmentName: `${file.fileName}.${file.ext}`, MediaId: result.data.Media_ID }
                var { result ,error } = await actionCreators.saveJobAttachment(dispatch, attatchdata)
                if (error) {
                    return false
                }
            }
            return true
        }
        
        

    },
    DeleteAttachment: (dispatch, criteria) => {
        let url = `${Constants.API_URL}/api/Job/DeleteJobAttachment`
        return Axios.post(url, criteria)
            .then((response) => {
                return response//actionCreators.SearchEmployee(dispatch, criteria)
            }).catch((error) => {
                common.apiError(error)
            });
    },
}

//reducer Name
export const JobMointorReducer = (state = JSON.parse(JSON.stringify(initial_state)), action) => {
    switch (action.type) {
        case ActionType.READ:
            state.JobMointorData = action.param
            break;
        case ActionType.READ_Confilct:
            state.JobConflictData = action.param
            break;
        case ActionType.CLEAR_DETAIL:
            state.Form.Jobdata = initial_state.Form.data
            break;
        case ActionType.CLEAR:
            state.SearchCriteria = initial_state.SearchCriteriaInitial;
            break;
        case ActionType.LoadDetail:
            state.Form.Jobdata = action.param
            break;
        case ActionType.LoadMachine:
            state.Form.Machine = action.param
            break;
        case ActionType.LoadEngineer:
            state.Form.Engineer = action.param
            break;
        case ActionType.LoadTools:
            state.Form.Tools = action.param
            break;
        case ActionType.LoadActualList:
            state.Form.JobActualList = action.param
            state.Form.JobActualInputList = action.param
            break;
        case ActionType.ActualListChange:
            state.Form.JobActualInputList = state.Form.JobActualInputList.map(el => (el.JobId == action.param.JobId && el.SerialNo == action.param.SerialNo ? { ...action.param } : el))
            break;
        case ActionType.LoadAttachment:
            state.Form.ActualAttachment = action.param
            break;
        case ActionType.LoadInternal:
            state.Form.Internal = action.param
            state.Form.InternalInput = action.param
            break;
        case ActionType.LoadInternalAttachment:
            state.Form.InternalPhoto = action.param
            break;
        case ActionType.fActualyChange:
            state.Form.FormActualInput = action.param
            break;
        case ActionType.fInternalChange:
            state.Form.InternalInput = action.param
            break;
        case ActionType.criteriaChange:
            state.SearchCriteria = action.param
            break;
        case ActionType.criteriaClear:
            state.SearchCriteria = initial_state.SearchCriteriaInitial
            state.SearchCriteriaInitial = { ...initial_state.SearchCriteriaInitial, Ran : common.uuidv4() }
            break;
        default:
            break;

    }
    return state
}