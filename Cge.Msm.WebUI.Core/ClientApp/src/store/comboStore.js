import * as Constants from './constants'
import Axios from 'axios'
import * as common from './../components/CommonFunction/common-function'
export const ActionType = {
    //Employee
    READ_EMP: "ComboReducer_READEMP",
    READ_INS: "ComboReducer_READINS",
    READ_TOOLS: "ComboReducer_READ_TOOLS",
    READ_TASK: "ComboReducer_READ_TASK",
    READ_CUS: "ComboReducer_READCUS",
    READ_CUS_CONTACT: "ComboReducer_READ_CUS_CONTACT",
    //Tools
    READ_ToolsType: "ComboReducer_READ_ToolsType",
    READ_ToolsName: "ComboReducer_READ_ToolsName",
    READ_ToolsSerial: "ComboReducer_READ_ToolsSerial",
    //Machine
    READ_MachineName: "ComboReducer_READ_MachineName",
    //JobType
    READ_JobType: "ComboReducer_READ_JobType",
    //WI
    READ_WI: "ComboReducer_READ_WI", 
    //Emp type
    READ_EMPTYPE: "ComboReducer_EMPTYPE",
    READ_CUSTOMERTYPE: "ComboReducer_CUSTOMERTYPE",
    READ_MACHINETYPE: "ComboReducer_MACHINETYPE",
    READ_TOOLLEAVETYPE: "ComboReducer_TOOLLEAVETYPE",
    READ_EMPLEAVETYPE: "ComboReducer_EMPLEAVETYPE",
    READ_MACHINEMODEL: "ComboReducer_MACHINEMODEL",
    READ_MACHINBRAND: "ComboReducer_MACHINBRAND",
    //ONSITE_BY
    READ_ONSITE_BY: "ComboReducer_ONSITE_BY",
    //Company
    READ_COMPANY: "ComboReducer_COMPANY",
}
const initial_state = {
    //Customer
    CustomerList: [],
    CustomerContactList: [],
    //Employee
    EmployeeList: [],
    //Tools
    ToolsTypeList: [],
    ToolsNameList: [],
    ToolsSerialList: [],
    //Machine
    MachineNameList: [],
    //JobType
    JobTypeList: [],
    //WI
    WIList: [],
    EmployeeTypeList: [],
    CustomerTypeList: [],
    MachineTypeList: [],
    ToolsLeaveTypeList: [],
    EmpLeaveTypeList: [],
    MachineModelList: [],
    MachineBrandList: [],
    //ONSITE_BY
    ONSITE_BYList: [],
    //Company
    CompanyList: [],
}






export const actionCreators = {
    GetCustomer: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Customer/GetCustomerList`
        return Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ FullName: name, CustomerId: id }) => ({ name, id }));
                    const cbo2= response.data.map(({ FullName: label, CustomerId: value }) =>({ label, value }));
                    dispatch({ type: ActionType.READ_CUS, param: cbo2 })
                     
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetCustomerContact: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Customer/GetCustomerContactList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    var data = response.data.map(item => {
                        if (item.ContactPerson==null) {
                            return { ...item, ContactPerson:"" }
                        } else return { ...item }
                    })
                    dispatch({ type: ActionType.READ_CUS_CONTACT, param: data })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetEmployee: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Employee/GetEmployeeList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ EmployeeName: name, EmployeeId: id }) => ({ name, id }));
                    dispatch({ type: ActionType.READ_EMP, param: cbo })
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
    GetTask: (dispatch, param) => {

        let url = `${Constants.API_URL}/api/Job/GetJobList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: ActionType.READ_TASK, param: response.data })
                }
            }).catch((error) => { common.apiError(error) });
    },
    GetToolsType: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetMiscList`
        Axios.post(url, { FullText: 'TOOL_TYPE'})
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ Value: name, Value: id }) => ({ name, id }));
                    dispatch({ type: ActionType.READ_ToolsType, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetCustomerType: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetMiscList`
        Axios.post(url, { FullText: 'CUSTOMER_TYPE' })
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ Value: name, Value: id }) => ({ name, id }));
                    dispatch({ type: ActionType.READ_CUSTOMERTYPE, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetEmpType: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetMiscList`
        Axios.post(url, { FullText: 'EMPLOYEE_TYPE' })
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ Value: name, Value: id }) => ({ name, id }));
                    dispatch({ type: ActionType.READ_EMPTYPE, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetMachineType: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetMiscList`
        Axios.post(url, { FullText: 'MACHINE_TYPE' })
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ Value: name, Value: id }) => ({ name, id }));
                    dispatch({ type: ActionType.READ_MACHINETYPE, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetToolLeaveType: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetMiscList`
        Axios.post(url, { FullText: 'TOOL_LEAVE_TYPE' })
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ Value: name, Value: id }) => ({ name, id }));
                    dispatch({ type: ActionType.READ_TOOLLEAVETYPE, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetMachineModel: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetMiscList`
        Axios.post(url, { FullText: 'MACHINE_MODEL' })
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ Value: name, Value: id }) => ({ name, id }));
                    dispatch({ type: ActionType.READ_MACHINEMODEL, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetMachineBrand: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetMiscList`
        Axios.post(url, { FullText: 'MACHINE_BRAND' })
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ Value: name, Value: id }) => ({ name, id }));
                    dispatch({ type: ActionType.READ_MACHINBRAND, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetEmpLeaveType: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetMiscList`
        Axios.post(url, { FullText: 'EMP_LEAVE_TYPE' })
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ Value: name, Value: id }) => ({ name, id }));
                    dispatch({ type: ActionType.READ_EMPLEAVETYPE, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetToolsName: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetToolsList`

        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let result = response.data && response.data.filter(item => item.ToolsType === param.ToolsType )
                    const cbo = result.map(({ ToolsName: name, ToolsId: id }) => ({ name, id }));
                    dispatch({ type: ActionType.READ_ToolsName, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetToolsSerialNo: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetActiveToolsList`

        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    let result = response.data && response.data.filter(item => item.ToolsId === param.ToolsId)
                    const cbo = result.map(({ SerialNo: name, SerialNo: id }) => ({ name, id }));
                    dispatch({ type: ActionType.READ_ToolsSerial, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetMachineName: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetMachineList`
        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ MachineName: name, MachineId: id, MachineBrand, MachineModel }) => ({ name, id,MachineBrand, MachineModel }));
                    dispatch({ type: ActionType.READ_MachineName, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetJobType: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetJobTypeList`

        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ JobType: name, JobType: id}) => ({ name, id }));
                    dispatch({ type: ActionType.READ_JobType, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetWIList: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetWIList`

        Axios.post(url, param)
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ ShowText: name, WiId: id }) => ({ name, id }));
                    dispatch({ type: ActionType.READ_WI, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetOnsiteBy: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetMiscList`
        Axios.post(url, { FullText: 'ONSITE_BY' })
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ Value: name, Value: id }) => ({ name, id }));
                    dispatch({ type: ActionType.READ_ONSITE_BY, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    },
    GetCompany: (dispatch, param) => {
        let url = `${Constants.API_URL}/api/Master/GetMiscList`
        Axios.post(url, { FullText: 'COMPANY' })
            .then((response) => {
                if (response.data) {
                    const cbo = response.data.map(({ Value: name, Value: id }) => ({ name, id }));
                    dispatch({ type: ActionType.READ_COMPANY, param: cbo })
                }
            }).catch((error) => { common.apiError(error) });

    }
  
}

//reducer Name
export const ComboReducer = (state = JSON.parse(JSON.stringify(initial_state)), action) => {
    switch (action.type) {
        case ActionType.READ_CUS:
            state.CustomerList = action.param
            break;
        case ActionType.READ_CUS_CONTACT:
            state.CustomerContactList = action.param
            break;
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
        case ActionType.READ_ToolsType:
            state.ToolsTypeList = action.param
            break;
        case ActionType.READ_ToolsName:
            state.ToolsNameList = action.param
            break;
        case ActionType.READ_ToolsSerial:
            state.ToolsSerialList = action.param
            break;
        case ActionType.READ_MachineName:
            state.MachineNameList = action.param
            break;
        case ActionType.READ_JobType:
            state.JobTypeList = action.param
            break;
        case ActionType.READ_WI:
            state.WIList = action.param
            break;
        case ActionType.READ_EMPTYPE:
            state.EmployeeTypeList = action.param
            break;
        case ActionType.READ_CUSTOMERTYPE:
            state.CustomerTypeList = action.param
            break;
        case ActionType.READ_MACHINETYPE:
            state.MachineTypeList = action.param
            break;
        case ActionType.READ_TOOLLEAVETYPE:
            state.ToolsLeaveTypeList = action.param
            break;
        case ActionType.READ_EMPLEAVETYPE:
            state.EmpLeaveTypeList = action.param
            break;
        case ActionType.READ_MACHINEMODEL:
            state.MachineModelList = action.param
            break;
        case ActionType.READ_MACHINBRAND:
            state.MachineBrandList = action.param
            break;
        case ActionType.READ_ONSITE_BY:
            state.ONSITE_BYList = action.param
            break;
        case ActionType.READ_COMPANY:
            state.CompanyList = action.param
            break;
        default:
            break;

    }
    return state
}