import * as Constants from './constants'
import Axios from 'axios'
import * as constant from './../components/CommonFunction/constant'
import * as common from './../components/CommonFunction/common-function'
export const ActionType = {
    //Employees
    GetEmployeeList: "MasterReducer_GetEmployeeList",
    GetEmployeeData: "MasterReducer_GetEmployeeData",
    ClearEmployeeData: "MasterReducer_ClearEmployeeData",
    GetEmployeeCriteria: "MasterReducer_GetEmployeeCriteria",
    GetEmployeeForm: "MasterReducer_GetEmployeeForm",
    //Machine
    GetMachineList: "MasterReducer_GetMachineList",
    ClearMachineData: "MasterReducer_ClearMachineData",
    GetMachineData: "MasterReducer_GetMachineData",
    GetMachineForm: "MasterReducer_GetMachineForm",
    //Customer
    GetCustomerList: "MasterReducer_GetCustomerList",
    ClearCustomerData: "MasterReducer_ClearCustomerData",
    GetCustomerData: "MasterReducer_GetCustomerData",
    GetCustomerForm: "MasterReducer_GetCustomerForm",
    //Tools
    GetToolList: "MasterReducer_GetToolList",
    ClearToolData: "MasterReducer_ClearToolData",
    GetToolData: "MasterReducer_GetToolData",
    GetToolForm: "MasterReducer_GetToolForm",
    //Skills
    GetSkillList: "MasterReducer_GetSkillList",
    ClearSkillData: "MasterReducer_ClearSkillData",
    GetSkillData: "MasterReducer_GetSkillData",
    GetSkillForm: "MasterReducer_GetSkillForm",
    //WI
    GetWIList: "MasterReducer_GetWIList",
    ClearWIData: "MasterReducer_ClearWIData",
    GetWIData: "MasterReducer_GetWIData",
    GetWIForm: "MasterReducer_GetWIForm",
    //Search
    criteriaChange: 'MasterReducer_criteriaChange',
    criteriaClear: 'MasterReducer_criteriaClear'
}
const initial_state = {
    //Engineers
    EmployeeCriteriaForm: {},
    EmployeeCriteria: {},
    EmployeeList: [],
    EmployeeData: {
        "EmployeeId": "",
        "EmployeeCode": "",
        "EmployeeName": "",
        "EmployeeNameTh": "",
        "EmployeeType": "",
        "Telephone": "",
        "Email": "",
        "Tags": "",
        "Active": "",
        "Remark": "",
        "CreatedDate": "",
        "CreatedBy": "",
        "UpdatedDate": "",
        "UpdatedBy": ""},
    EmployeeInput: {},
    //Machine
    MachineCriteriaForm: {},
    MachineCriteria: {},
    MachineList: [],
    MachineData: {
        "MachineId" : "",
        "MachineName" : "", 
        "MachineType": "",
        "MachineBrand" : "",
        "MachineModel" : "", 
        "Remark": "",
        "CreatedDate" : "",
        "CreatedBy" : "", 
        "UpdatedDate" : "", 
        "UpdatedBy": "" 
    },
    MachineInput: {},
    //Customer
    CustomerCriteriaForm: {},
    CustomerCriteria: {},
    CustomerList: [],
    CustomerData: {
        "CustomerId": "",
        "CustomerType" : "",
        "FullName": "",
        "ShortName": "",
        "FullNameTh": "",
        "ShortNameTh": "",
        "BillAddress": "",
        "CertificateAddress" : "",
        "ContactName1": "",
        "ContactTel1": "",
        "Department1": "",
        "ContactEmail1": "",
        "ContactName2": "",
        "ContactTel2": "",
        "Department2": "",
        "ContactEmail2": "",
        "Remark" : "",
        "CreatedDate": "",
        "CreatedBy": "",
        "UpdatedDate": "",
        "UpdatedBy": ""
    },
    CustomerInput: {},
    //Tools
    ToolCriteriaForm: {},
    ToolCriteria: {},
    ToolList: [],
    ToolData: {
        "ToolsId": "",
        "ToolsName": "",
        "ToolsType": "",
        "ServiceMonths": "",
        "ServiceStartdate" : "",
        "Tags": "",
        "Remarks": "",
        "CreatedDate": "",
        "CreatedBy": "",
        "UpdatedDate": "",
        "UpdatedBy": ""
    },
    ToolInput: {},
    //Skills
    SkillCriteriaForm: {},
    SkillCriteria: {},
    SkillList: [],
    SkillData: {
        "SkillId" : "",
        "Skill": "",
        "Remark": ""
    },
    SkillInput: {},
    //WI
    WICriteriaForm: {},
    WICriteria: {},
    WIList: [],
    WIData: {
        "WICode": "",
        "WIName": "",
        "InstrumentGroup": "",
        "Temperature": "",
        "Humidity": "",
        "Voltage": "",
        "Other1": "",
        "Other2" : "",
        "Remark": "",
        "CreatedDate": "",
        "CreatedBy": "",
        "UpdatedDate": "",
        "UpdatedBy": ""
    },
    WIInput: {},
    SearchCriteriaInitial: {
        FullText: "",
    },
    SearchCriteria: {
        FullText: "",
    }
    
}

export const actionCreators = {
    //Enginees
    SearchEmployee: (dispatch,param) => {
        let url = `${Constants.API_URL}/api/Employee/GetEmployeeList`
        Axios.post(url, param )
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.GetEmployeeList, param: resultsort })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    GetEmployeeData: (dispatch, id) => {
        let url = `${Constants.API_URL}/api/Employee/GetEmployee`
        return Axios.post(url, {id:id})
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetEmployeeData, param: response.data })
                }
            }).catch((error) => {
                common.apiError(error) });
    },
    SaveEmployee: (dispatch, param, criteria) => {
        let url 
        if (param.EmployeeId != "") {
            url = `${Constants.API_URL}/api/Employee/UpdateEmployee`
        } else {
            url = `${Constants.API_URL}/api/Employee/CreateEmployee`
        }
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetEmployeeData, param: response.data })
                    actionCreators.SearchEmployee(dispatch,criteria)
                }
            }).catch((error) => {
                common.apiError(error) });
    },
    DeleteEmployee: (dispatch,id, criteria) => {
        let url = `${Constants.API_URL}/api/Employee/DeleteEmployee`
        Axios.post(url, { id: id })
            .then((response) => {
                actionCreators.SearchEmployee(dispatch, criteria)
            }).catch((error) => {
                common.apiError(error) });
    },
    CheckValidateDeleteEmployee: (employee) => {
        let url = `${Constants.API_URL}/api/Employee/ValidateDeleteEmployee`
        return Axios.post(url, employee)
            .then((response) => {
                if (response.data)
                    return response.data
            }).catch((error) => { common.apiError(error) });
    },
    CheckDupplicateEmployee: (emp) => {
        let url = `${Constants.API_URL}/api/Employee/ValidateSaveEmployee`
        return Axios.post(url, emp)
            .then((response) => {
                if (response.data)
                    return response.data
            }).catch((error) => { common.apiError(error) });
    },
    //Machine
    SearchMachine: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetMachineList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.GetMachineList , param: resultsort })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    GetMachineData: (dispatch, id) => {
        let url = `${Constants.API_URL}/api/Master/GetMachine`
        return Axios.post(url, { id: id })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetMachineData, param: response.data })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    SaveMachine: (dispatch, param, criteria) => {
        let url
        if (param.MachineId != "") {
            url = `${Constants.API_URL}/api/Master/UpdateMachine`
        } else {
            url = `${Constants.API_URL}/api/Master/CreateMachine`
        }
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetMachineData, param: response.data })
                    actionCreators.SearchMachine(dispatch, criteria)
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    DeleteMachine: (dispatch, id, criteria) => {
        let url = `${Constants.API_URL}/api/Master/DeleteMachine`
        Axios.post(url, { id: id })
            .then((response) => {
                actionCreators.SearchMachine(dispatch, criteria)
            }).catch((error) => {
                common.apiError(error)
            });
    },
    CheckValidateDeleteMachine: (machine) => {
        let url = `${Constants.API_URL}/api/Master/ValidateDeleteMachine`
        return Axios.post(url, machine)
            .then((response) => {
                if (response.data)
                    return response.data
            }).catch((error) => { common.apiError(error) });
    },
    CheckDupplicateMachine: (machine) => {
        let url = `${Constants.API_URL}/api/Master/ValidateSaveMachine`
        return Axios.post(url, machine)
            .then((response) => {
                if (response.data)
                    return response.data
            }).catch((error) => { common.apiError(error) });
    },
    //Customer
    SearchCustomer: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Customer/GetCustomerList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.GetCustomerList, param: resultsort })
                }
            }).catch((error) => {
                common.apiError()
                common.apiError(error)
            });
    },
    GetCustomerData: (dispatch, id) => {
        let url = `${Constants.API_URL}/api/Customer/GetCustomer`
        return Axios.post(url, { id: id })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetCustomerData, param: response.data })
                }
            }).catch((error) => {
                common.apiError()
                common.apiError(error)
            });
    },
    SaveCustomer: (dispatch, param, criteria) => {
        let url
        if (param.CustomerId != "") {
            url = `${Constants.API_URL}/api/Customer/UpdateCustomer`
        } else {
            url = `${Constants.API_URL}/api/Customer/CreateCustomer`
        }
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetCustomerData, param: response.data })
                    actionCreators.SearchCustomer(dispatch, criteria)
                }
            }).catch((error) => {
                common.apiError()
                common.apiError(error)
            });
    },
    DeleteCustomer: (dispatch, id, criteria) => {
        let url = `${Constants.API_URL}/api/Customer/DeleteCustomer`
        Axios.post(url, { id: id })
            .then((response) => {
                actionCreators.SearchCustomer(dispatch, criteria)
            }).catch((error) => {
                common.apiError()
                common.apiError(error)
            });
    },
    CheckValidateDeleteCustomer: (customer) => {
        let url = `${Constants.API_URL}/api/Customer/ValidateDeleteCustomer`
        return Axios.post(url, customer)
            .then((response) => {
                if (response.data)
                    return response.data
            }).catch((error) => { common.apiError(error) });
    },
    CheckDupplicateCustomer: (customer) => {
        let url = `${Constants.API_URL}/api/Customer/ValidateSaveCustomer`
        return Axios.post(url, customer)
            .then((response) => {
                if (response.data)
                    return response.data
            }).catch((error) => { common.apiError(error) });
    },
    //Tool
    SearchTool: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetToolsList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.GetToolList, param: resultsort })
                }
            }).catch((error) => {
                common.apiError()
                common.apiError(error)
            });
    },
    GetToolData: (dispatch, id) => {
        let url = `${Constants.API_URL}/api/Master/GetTools`
        return Axios.post(url, { id: id })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetToolData, param: response.data })

                }
            }).catch((error) => {
                common.apiError()
                common.apiError(error)
            });
    },
    SaveTool: (dispatch, param, criteria) => {
        let url
        if (param.ToolsId != "") {
            url = `${Constants.API_URL}/api/Master/UpdateTools`
        } else {
            url = `${Constants.API_URL}/api/Master/CreateTools`
        }
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetToolData, param: response.data })
                    actionCreators.SearchTool(dispatch, criteria)
                }
            }).catch((error) => {
                common.apiError()
                common.apiError(error)
            });
    },
    DeleteTool: (dispatch, id, criteria) => {
        let url = `${Constants.API_URL}/api/Master/DeleteTools`
        Axios.post(url, { id: id })
            .then((response) => {
                actionCreators.SearchTool(dispatch, criteria)
            }).catch((error) => {
                common.apiError()
                common.apiError(error)
            });
    },
    CheckValidateDeleteTool: (tool) => {
        let url = `${Constants.API_URL}/api/Master/ValidateDeleteTool`
        return Axios.post(url, tool)
            .then((response) => {
                if (response.data)
                    return response.data
            }).catch((error) => { common.apiError(error) });
    },
    //Skill
    SearchSkill: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetSkillList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.GetSkillList, param: resultsort })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    GetSkillData: (dispatch, id) => {
        let url = `${Constants.API_URL}/api/Master/GetSkill`
        return Axios.post(url, { id: id })
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetSkillData, param: response.data })
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    SaveSkill: (dispatch, param, criteria) => {
        let url
        if (param.SkillId != "") {
            url = `${Constants.API_URL}/api/Master/UpdateSkill`
        } else {
            url = `${Constants.API_URL}/api/Master/CreateSkill`
        }
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.GetSkillData, param: response.data })
                    actionCreators.SearchSkill(dispatch, criteria)
                }
            }).catch((error) => {
                common.apiError(error)
            });
    },
    DeleteSkill: (dispatch, id, criteria) => {
        let url = `${Constants.API_URL}/api/Master/DeleteSkill`
        Axios.post(url, { id: id })
            .then((response) => {
                actionCreators.SearchSkill(dispatch, criteria)
            }).catch((error) => {
                common.apiError(error)
            });
    },
    CheckValidateDeleteSkill: (skill) => {
        let url = `${Constants.API_URL}/api/Master/ValidateDeleteSkill`
        return Axios.post(url, skill)
            .then((response) => {
                if (response.data)
                    return response.data
            }).catch((error) => { common.apiError(error) });
    },

}

//reducer Name
export const MasterReducer = (state = JSON.parse(JSON.stringify(initial_state)), action) => {
    switch (action.type) {
        //Employees
        case ActionType.GetEmployeeList:
            state.EmployeeList = action.param
            break;
        case ActionType.GetEmployeeData:
            state.EmployeeData = action.param
            state.EmployeeInput = action.param
            break;
        case ActionType.ClearEmployeeData:
            state.EmployeeData = initial_state.EmployeeData
            state.EmployeeInput = initial_state.EmployeeInput
            break;
        case ActionType.GetEmployeeCriteria:
            state.EmployeeCriteria = action.param
            break;
        case ActionType.GetEmployeeForm:
            state.EmployeeInput = action.param
            break;
        //Machine
        case ActionType.GetMachineList:
            state.MachineList = action.param
            break;
        case ActionType.ClearMachineData:
            state.MachineData = initial_state.MachineData
            state.MachineInput = initial_state.MachineInput
            break;
        case ActionType.GetMachineData:
            state.MachineData = action.param
            state.MachineInput = action.param
            break;
        case ActionType.GetMachineForm:
            state.MachineInput = action.param
            break;
        //Customer
        case ActionType.GetCustomerList:
            state.CustomerList = action.param
            break;
        case ActionType.ClearCustomerData:
            state.CustomerData = initial_state.CustomerData
            state.CustomerInput = initial_state.CustomerInput
            break;
        case ActionType.GetCustomerData:
            state.CustomerData = action.param
            state.CustomerInput = action.param
            break;
        case ActionType.GetCustomerForm:
            state.CustomerInput = action.param
            break;
        //Tool
        case ActionType.GetToolList:
            state.ToolList = action.param
            break;
        case ActionType.ClearToolData:
            state.ToolData = initial_state.ToolData
            state.ToolInput = initial_state.ToolInput
            break;
        case ActionType.GetToolData:
            state.ToolData = action.param
            state.ToolInput = action.param
            break;
        case ActionType.GetToolForm:
            state.ToolInput = action.param
            break;
        //Skill
        case ActionType.GetSkillList:
            state.SkillList = action.param
            break;
        case ActionType.ClearSkillData:
            state.SkillData = initial_state.SkillData
            state.SkillInput = initial_state.SkillInput
            break;
        case ActionType.GetSkillData:
            state.SkillData = action.param
            state.SkillInput = action.param
            break;
        case ActionType.GetSkillForm:
            state.SkillInput = action.param
            break;
        //Search
        case ActionType.criteriaChange:
            state.SearchCriteria = action.param
            break;
        case ActionType.criteriaClear:
            state.SearchCriteria = initial_state.SearchCriteriaInitial
            state.SearchCriteriaInitial = { ...initial_state.SearchCriteriaInitial, Ran: common.uuidv4() }
            break;
        default:
            break;

    }
    return state
}