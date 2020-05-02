import * as Constants from './constants'
import Axios from 'axios'
import * as constant from './../components/CommonFunction/constant'
import * as common from './../components/CommonFunction/common-function'
export const ActionType = {
    //Employees
    GetEmployeeList: "ReportFilterReducer_GetEmployeeList",
    AddEmployeeFilterList: "ReportFilterReducer_AddEmployeeFilterList",
    RemoveEmployeeFilterList: "ReportFilterReducer_RemoveEmployeeFilterList",
    //JobTypes
    GetJobTypeList: "ReportFilterReducer_GetJobTypeList",
    AddJobTypeFilterList: "ReportFilterReducer_AddJobTypeFilterList",
    RemoveJobTypeFilterList: "ReportFilterReducer_RemoveJobTypeFilterList",
    //JobStatus
    GetJobStatusList: "ReportFilterReducer_GetJobStatusList",
    AddJobStatusFilterList: "ReportFilterReducer_AddJobStatusFilterList",
    RemoveJobStatusFilterList: "ReportFilterReducer_RemoveJobStatusFilterList",
    //Customers
    GetCustomersList: "ReportFilterReducer_GetCustomersList",
    AddCustomersFilterList: "ReportFilterReducer_AddCustomersFilterList",
    RemoveCustomersFilterList: "ReportFilterReducer_RemoveCustomersFilterList",
    //Machines
    GetMachineList: "ReportFilterReducer_GetMachineList",
    AddMachineFilterList: "ReportFilterReducer_AddMachineFilterList",
    RemoveMachineFilterList: "ReportFilterReducer_RemoveMachineFilterList",
    //Tools
    GetToolList: "ReportFilterReducer_GetToolList",
    AddToolFilterList: "ReportFilterReducer_AddToolFilterList",
    RemoveToolFilterList: "ReportFilterReducer_RemoveToolFilterList",
    //PO Number
    GetPONumberList: "ReportFilterReducer_GetPONumberList",
    AddPONumberFilterList: "ReportFilterReducer_AddPONumberFilterList",
    RemovePONumberFilterList: "ReportFilterReducer_RemovePONumberFilterList",
    //MCModel
    GetMCModelList: "ReportFilterReducer_GetMCModelList",
    AddMCModelFilterList: "ReportFilterReducer_AddMCModelFilterList",
    RemoveMCModelFilterList: "ReportFilterReducer_RemoveMCModelFilterList",

    criteriaChange:"ReportFilterReducer_criteriaChange",
    ClearFilter: "ReportFilterReducer_ClearFilter",


}
const initial_state = {
    FilterText:"",

    EmployeeList: [],
    EmployeeFilterList: [],

    JobTypeList: [],
    JobTypeFilterList: [],

    JobStatusList: [],
    JobStatusFilterList: [],

    CustomersList: [],
    CustomersFilterList: [],

    MachineList: [],
    MachineFilterList: [],

    MachineModelList: [],
    MachineModelFilterList: [],

    ToolList: [],
    ToolFilterList: [],
    
    SearchCriteriaInitial: {
        FullText: "",
        PoNumber: "",
        RequestDateFrom: "",
        RequestDateTo: "",
        DueDateFrom: "",
        DueDateTo: "",
        SerialNo: "",
    },
    SearchCriteria: {
    },

}

export const actionCreators = {
    //Enginees
    SearchEmployee: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Employee/GetEmployeeList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.GetEmployeeList, param: resultsort })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    //JobType
    SearchJobType: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetJobTypeList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetJobTypeList, param: response.data })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    //JobStatus
    SearchJobStatus: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetJobStatusList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetJobStatusList, param: response.data })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    //Customers
    SearchCustomer: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Customer/GetCustomerList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.GetCustomersList, param: resultsort })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    //Machine
    SearchMachine: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetMachineList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.GetMachineList, param: resultsort })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    SearchTool: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetToolsList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.GetToolList, param: resultsort })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    SearchMachineModels: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetMiscList`
        Axios.post(url, { FullText: 'MACHINE_MODEL' })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetMCModelList, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    }

}

//reducer Name
export const ReportFilterReducer = (state = JSON.parse(JSON.stringify(initial_state)), action) => {
    switch (action.type) {
        //Employees
        case ActionType.GetEmployeeList:
            state.EmployeeList = action.param
            break;
        case ActionType.AddEmployeeFilterList:
            state.EmployeeFilterList = [...state.EmployeeFilterList, action.param]
            break;
        case ActionType.RemoveEmployeeFilterList:
            state.EmployeeFilterList = state.EmployeeFilterList.filter(el => el.EmployeeId !== action.param.EmployeeId)
            break;
        //JobTypes
        case ActionType.GetJobTypeList:
            state.JobTypeList = action.param
            break;
        case ActionType.AddJobTypeFilterList:
            state.JobTypeFilterList = [...state.JobTypeFilterList, action.param]
            break;
        case ActionType.RemoveJobTypeFilterList:
            state.JobTypeFilterList = state.JobTypeFilterList.filter(el => el.JobType !== action.param.JobType)
            break;
        //JobStatuss
        case ActionType.GetJobStatusList:
            state.JobStatusList = action.param
            break;
        case ActionType.AddJobStatusFilterList:
            state.JobStatusFilterList = [...state.JobStatusFilterList, action.param]
            break;
        case ActionType.RemoveJobStatusFilterList:
            state.JobStatusFilterList = state.JobStatusFilterList.filter(el => el.JobStatus !== action.param.JobStatus)
            break;
        //Customerss
        case ActionType.GetCustomersList:
            state.CustomersList = action.param
            break;
        case ActionType.AddCustomersFilterList:
            state.CustomersFilterList = [...state.CustomersFilterList, action.param]
            break;
        case ActionType.RemoveCustomersFilterList:
            state.CustomersFilterList = state.CustomersFilterList.filter(el => el.CustomerId !== action.param.CustomerId)
            break;
        //Machines
        case ActionType.GetMachineList:
            state.MachineList = action.param
            break;
        case ActionType.AddMachineFilterList:
            state.MachineFilterList = [...state.MachineFilterList, action.param]
            break;
        case ActionType.RemoveMachineFilterList:
            state.MachineFilterList = state.MachineFilterList.filter(el => el.MachineId !== action.param.MachineId)
            break;
        //MC Models
        case ActionType.GetMCModelList:
            state.MachineModelList = action.param
            break;
        case ActionType.AddMCModelFilterList:
            state.MachineModelFilterList = [...state.MachineModelFilterList, action.param]
            break;
        case ActionType.RemoveMCModelFilterList:
            state.MachineModelFilterList = state.MachineModelFilterList.filter(el => el.Value !== action.param.Value)
            break;
        //Tools
        case ActionType.GetToolList:
            state.ToolList = action.param;
            break;
        case ActionType.AddToolFilterList:
            state.ToolFilterList = [...state.ToolFilterList, action.param]
            break;
        case ActionType.RemoveToolFilterList:
            state.ToolFilterList = state.ToolFilterList.filter(el => el.ToolsId !== action.param.ToolsId)
            break;
        //Clear
        case ActionType.ClearFilter:
            state.EmployeeFilterList = []
            state.JobTypeFilterList = []
            state.JobStatusFilterList = []
            state.CustomersFilterList = []
            state.MachineFilterList = []
            state.MachineModelFilterList = []
            state.ToolFilterList = []
            state.SearchCriteria = initial_state.SearchCriteriaInitial
            state.SearchCriteriaInitial = initial_state.SearchCriteriaInitial
            break;
        //FullText , Single
        case ActionType.criteriaChange:
            state.SearchCriteria = action.param
        default:
            break;

    }
    return state
}