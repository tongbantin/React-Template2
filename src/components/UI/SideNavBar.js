//Library
import React, { useEffect, useState } from 'react';
import '../../assets/css/SideNavBar.css'
import { useDispatch, useSelector } from 'react-redux';
import * as common from '../CommonFunction/common-function'
import { Input, CustomInput, Button, FormGroup, Col, Form, Label } from 'reactstrap'
import Sidebar from "react-sidebar";
//Component
//Store
import * as ReportFilterStore from './../../store/ReportFilterStore'
import * as ServiceRequestStore from './../../store/ServiceRequestStore'

export const SideNavBar = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const Icon = common.getIconTag(common.Icontype.ION, "IoIosArrowRoundForward")
    const onSetSidebarOpen = () => {
        setSidebarOpen(!sidebarOpen)
    }
    return (

        <div className="sideNavbar-div">
            <Sidebar
                sidebar={<SideNavBarContent Search={props.Search}
                    Toggle={onSetSidebarOpen}
                    Employee={props.Employee}
                    Customer={props.Customer}
                    Machine={props.Machine}
                    MachineModels={props.MachineModels}
                    JobType={props.JobType}
                    JobStatus={props.JobStatus}
                    Tools={props.Tools}
                    PONumber={props.PONumber}
                    SerialNo={props.SerialNo}
                    RequestDate={props.RequestDate}
                    DueDate={props.DueDate}
                />

                }
                open={sidebarOpen}
                onSetOpen={onSetSidebarOpen}
                styles={{ sidebar: { background: "#ffffff", position: "fixed", zIndex: 10001, width: "30%", overflowY: "unset" } }}
            >
                <button className="btn-sidebar" onClick={onSetSidebarOpen}>
                    <Icon />
                </button>
            </Sidebar>
        </div>
    )
}

export const SideNavBarContent = (props) => {


    //Redux
    const dispatch = useDispatch()
    const EmployeeList = useSelector(state => state.ReportFilterReducer.EmployeeList)
    const EmployeeFilterList = useSelector(state => state.ReportFilterReducer.EmployeeFilterList)

    const JobTypeList = useSelector(state => state.ReportFilterReducer.JobTypeList)
    const JobTypeFilterList = useSelector(state => state.ReportFilterReducer.JobTypeFilterList)

    const JobStatusList = useSelector(state => state.ReportFilterReducer.JobStatusList)
    const JobStatusFilterList = useSelector(state => state.ReportFilterReducer.JobStatusFilterList)

    const CustomersList = useSelector(state => state.ReportFilterReducer.CustomersList)
    const CustomersFilterList = useSelector(state => state.ReportFilterReducer.CustomersFilterList)

    const MachineList = useSelector(state => state.ReportFilterReducer.MachineList)
    const MachineFilterList = useSelector(state => state.ReportFilterReducer.MachineFilterList)

    const MachineModelList = useSelector(state => state.ReportFilterReducer.MachineModelList)
    const MachineModelFilterList = useSelector(state => state.ReportFilterReducer.MachineModelFilterList)

    const ToolList = useSelector(state => state.ReportFilterReducer.ToolList)
    const ToolFilterList = useSelector(state => state.ReportFilterReducer.ToolFilterList)

    const initialCriteria = useSelector(state => state.ReportFilterReducer.SearchCriteriaInitial)
    const SearchCriteria = useSelector(state => state.ReportFilterReducer.SearchCriteria)
    //Props
    //Declare State
    
    const [dataItem, setDataItem] = useState(initialCriteria)
    const [dataItem2, setDataItem2] = useState({ FilterText:"" })
    //Effect
    useEffect(() => {
        ReportFilterStore.actionCreators.SearchEmployee(dispatch, {})
        ReportFilterStore.actionCreators.SearchCustomer(dispatch, {})
        ReportFilterStore.actionCreators.SearchMachine(dispatch, {})
        ReportFilterStore.actionCreators.SearchJobType(dispatch, {})
        ReportFilterStore.actionCreators.SearchJobStatus(dispatch, {})
        ReportFilterStore.actionCreators.SearchTool(dispatch, {})
        ReportFilterStore.actionCreators.SearchMachineModels(dispatch, {})
    }, [])
    useEffect(() => {
       
        setDataItem(initialCriteria)
    }, [initialCriteria])
    useEffect(() => {

        if (SearchCriteria === {}) {
            setDataItem(initialCriteria)
        }
    }, [SearchCriteria])
    //Event+function

    const handleChange = (e, data, add, remove) => {
        if (e.target.checked) {
            dispatch({ type: add, param: data })
        } else {
            dispatch({ type: remove, param: data })

        }

    }


    const handleInputChange = event => {

        const { name, value } = event.target
        setDataItem({ ...dataItem, [name]: value })
        dispatch({ type: ReportFilterStore.ActionType.criteriaChange, param: { ...dataItem, [name]: value } })
    }
    const handleInputChange2 = event => {

        const { name, value } = event.target
        setDataItem2({ ...dataItem, [name]: value })
        //dispatch({ type: ReportFilterStore.ActionType.criteriaChange, param: { ...dataItem, [name]: value } })
    }

    //SubComponent
    const Icondelete = common.getIconTag(common.Icontype.ION, "IoMdClose")
    const EmployeeCheckbox = EmployeeList && EmployeeList.filter(x => { return (x.FullNameEN_TH && x.FullNameEN_TH.toLowerCase().includes(dataItem2.FilterText.toLowerCase()) || dataItem2.FilterText=="") }).map(item => (
        <React.Fragment key={common.uuidv4()}>
            <li>
                <CustomInput type="checkbox" id={item.EmployeeId||common.uuidv4()} className="table-checkbox custom-control-label" label={item.FullNameEN_TH} checked={EmployeeFilterList.map(a => a.EmployeeId).includes(item.EmployeeId)} onChange={e => { handleChange(e, item, ReportFilterStore.ActionType.AddEmployeeFilterList, ReportFilterStore.ActionType.RemoveEmployeeFilterList) }} />
            </li>
        </React.Fragment>
    ))
    const CustomerCheckbox = CustomersList && CustomersList.filter(x => { return (x.FullNameEN_TH && x.FullNameEN_TH.toLowerCase().includes(dataItem2.FilterText.toLowerCase()) || dataItem2.FilterText == "") }).map(item => (
        <React.Fragment key={common.uuidv4()}>
            <li>
                <CustomInput type="checkbox" id={item.CustomerId||common.uuidv4()} className="table-checkbox custom-control-label" label={item.FullNameEN_TH} checked={CustomersFilterList.map(a => a.CustomerId).includes(item.CustomerId)} onChange={e => { handleChange(e, item, ReportFilterStore.ActionType.AddCustomersFilterList, ReportFilterStore.ActionType.RemoveCustomersFilterList) }} />
            </li>
        </React.Fragment>
    ))
    const MachineCheckbox = MachineList && MachineList.filter(x => { return (x.MachineName && x.MachineName.toLowerCase().includes(dataItem2.FilterText.toLowerCase()) || dataItem2.FilterText == "") })
        .map(item => (
        <React.Fragment key={common.uuidv4()}>
            <li>
                <CustomInput type="checkbox" id={item.MachineId||common.uuidv4()} className="table-checkbox custom-control-label" label={`${item.MachineName} (${item.MachineModel})`} checked={MachineFilterList.map(a => a.MachineId).includes(item.MachineId)} onChange={e => { handleChange(e, item, ReportFilterStore.ActionType.AddMachineFilterList, ReportFilterStore.ActionType.RemoveMachineFilterList) }} />
            </li>
        </React.Fragment>
        ))
    const MachineModelsCheckbox = MachineModelList && MachineModelList.filter(x => { return (x.Display && x.Display.toLowerCase().includes(dataItem2.FilterText.toLowerCase()) || dataItem2.FilterText == "") })
        .map(item => (
            <React.Fragment key={common.uuidv4()}>
                <li>
                    <CustomInput type="checkbox" id={item.Value ||common.uuidv4()} className="table-checkbox custom-control-label" label={`${item.Display}`} checked={MachineModelFilterList.map(a => a.Value).includes(item.Value)} onChange={e => { handleChange(e, item, ReportFilterStore.ActionType.AddMCModelFilterList, ReportFilterStore.ActionType.RemoveMCModelFilterList) }} />
                </li>
            </React.Fragment>
        ))
    const SerialNoTextBox = (
        <React.Fragment>
            <div className="row head-sideNavbar">
                <div className="col-12 col-md-12">
                    <Input type="text" name="SerialNo" id="SerialNo" bsSize="sm" value={dataItem.SerialNo} placeholder="Search Serial Number" onChange={(e) => {
                        handleInputChange(e)
                    }} />
                </div>
            </div>
        </React.Fragment>
    )
    const JobTypeCheckbox = JobTypeList && JobTypeList.filter(x => { return (x.JobType && x.JobType.toLowerCase().includes(dataItem2.FilterText.toLowerCase()) || dataItem2.FilterText == "") })
        .map(item => (
        <React.Fragment key={common.uuidv4()}>
            <li>
                <CustomInput type="checkbox" id={item.JobType ||common.uuidv4()} className="table-checkbox custom-control-label" label={item.JobType} checked={JobTypeFilterList.map(a => a.JobType).includes(item.JobType)} onChange={e => { handleChange(e, item, ReportFilterStore.ActionType.AddJobTypeFilterList, ReportFilterStore.ActionType.RemoveJobTypeFilterList) }} />
            </li>
        </React.Fragment>
    ))
    const JobStatusCheckbox = JobStatusList && JobStatusList.filter(x => { return (x.JobStatus && x.JobStatus.toLowerCase().includes(dataItem2.FilterText.toLowerCase()) || dataItem2.FilterText == "") })
        .map(item => (
        <React.Fragment key={common.uuidv4()}>
            <li>
                <CustomInput type="checkbox" id={item.JobStatus ||common.uuidv4()} className="table-checkbox custom-control-label" label={item.JobStatus} checked={JobStatusFilterList.map(a => a.JobStatus).includes(item.JobStatus)} onChange={e => { handleChange(e, item, ReportFilterStore.ActionType.AddJobStatusFilterList, ReportFilterStore.ActionType.RemoveJobStatusFilterList) }} />
            </li>
        </React.Fragment>
    ))
    const ToolCheckbox = ToolList && ToolList.filter(x => { return (x.ToolsName && x.ToolsName.toLowerCase().includes(dataItem2.FilterText.toLowerCase()) || dataItem2.FilterText == "") })
        .map(item => (
        <React.Fragment key={common.uuidv4()}>
            <li>
                <CustomInput type="checkbox" id={item.ToolsId ||common.uuidv4()} className="table-checkbox custom-control-label" label={item.ToolsName} checked={ToolFilterList.map(a => a.ToolsId).includes(item.ToolsId)} onChange={e => { handleChange(e, item, ReportFilterStore.ActionType.AddToolFilterList, ReportFilterStore.ActionType.RemoveToolFilterList) }} />
            </li>
        </React.Fragment>
    ))
    const PONumberTextBox = (
        <React.Fragment>
            <div className="row head-sideNavbar">
                <div className="col-12 col-md-12">
                    <Input type="text" name="PoNumber" id="PoNumber" bsSize="sm" value={dataItem.PoNumber} placeholder="Search PO Number" onChange={(e) => {
                        handleInputChange(e)
                    }} />
                </div>
            </div>
        </React.Fragment>
    )
   
    const RequestDateBox = (

        <React.Fragment>
            <div className="row head-sideNavbar">
                <div className="col-6 col-md-6">
                    <label>From</label>
                    <Input type="date" name="RequestDateFrom" id="RequestDateFrom" bsSize="sm" value={dataItem.RequestDateFrom}  onChange={(e) => {
                        handleInputChange(e)
                    }} />
                </div>
                <div className="col-6 col-md-6">
                    <label>To</label>
                    <Input type="date" name="RequestDateTo" id="RequestDateTo" bsSize="sm" value={dataItem.RequestDateTo} onChange={(e) => {
                        handleInputChange(e)
                    }} />
                </div>
            </div>
        </React.Fragment>
    )

    const DueDateBox = (

        <React.Fragment>
            <div className="row head-sideNavbar">
                <div className="col-6 col-md-6">
                    <label>From</label>
                    <Input type="date" name="DueDateFrom" id="DueDateFrom" bsSize="sm" value={dataItem.DueDateFrom} onChange={(e) => {
                        handleInputChange(e)
                    }} />
                </div>
                <div className="col-6 col-md-6">
                    <label>To</label>
                    <Input type="date" name="DueDateTo" id="DueDateTo" bsSize="sm" value={dataItem.DueDateTo} onChange={(e) => {
                        handleInputChange(e)
                    }} />
                </div>
            </div>
        </React.Fragment>
    )




    const ListEmployeeFilter = EmployeeFilterList && EmployeeFilterList.map(item => (<div key={item.EmployeeId}>{item.EmployeeName}
        <button className="btn-transparent" onClick={() => { dispatch({ type: ReportFilterStore.ActionType.RemoveEmployeeFilterList, param: item }) }}>
            <Icondelete />
        </button></div>))
    const ListCustomerFilter = CustomersFilterList && CustomersFilterList.map(item => (<div key={item.CustomerId}>{item.FullName}
        <button className="btn-transparent" onClick={() => { dispatch({ type: ReportFilterStore.ActionType.RemoveCustomersFilterList, param: item }) }}>
            <Icondelete />
        </button></div>))
    const ListMachineFilter = MachineFilterList && MachineFilterList.map(item => (<div key={item.MachineId}>{`${item.MachineName} (${item.MachineModel})`}
        <button className="btn-transparent" onClick={() => { dispatch({ type: ReportFilterStore.ActionType.RemoveMachineFilterList, param: item }) }}>
            <Icondelete />
        </button></div>))
    const ListMachineModelsFilter = MachineModelFilterList && MachineModelFilterList.map(item => (<div key={item.Value}>{`${item.Display}`}
        <button className="btn-transparent" onClick={() => { dispatch({ type: ReportFilterStore.ActionType.RemoveMCModelFilterList, param: item }) }}>
            <Icondelete />
        </button></div>))
    const ListJobTypeFilter = JobTypeFilterList && JobTypeFilterList.map(item => (<div key={item.JobType}>{item.JobType}
        <button className="btn-transparent" onClick={() => { dispatch({ type: ReportFilterStore.ActionType.RemoveJobTypeFilterList, param: item }) }}>
            <Icondelete />
        </button></div>))
    const ListJobStatusFilter = JobStatusFilterList && JobStatusFilterList.map(item => (<div key={item.JobStatus}>{item.JobStatus}
        <button className="btn-transparent" onClick={() => { dispatch({ type: ReportFilterStore.ActionType.RemoveJobStatusFilterList, param: item }) }}>
            <Icondelete />
        </button></div>))
    const ListToolFilter = ToolFilterList && ToolFilterList.map(item => (<div key={item.ToolsId}>{item.ToolsName}
        <button className="btn-transparent" onClick={() => { dispatch({ type: ReportFilterStore.ActionType.RemoveToolFilterList, param: item }) }}>
            <Icondelete />
        </button></div>))

    return (

        <div id="mySidepanel" className="sidepanel">
            <div className="row head-sideNavbar">
                <div className="col-12 col-md-12 search-sideNavbar">
                    <p className="close-button" onClick={props.Toggle}>×</p>
                    <Input type="text" name="FilterText" id="FilterText" value={dataItem2.FilterText} onChange={handleInputChange2} bsSize="sm" placeholder="Search For" />
                </div>
            </div>
            <div className="body-sideNarbarChkBox">
                {props.Employee ?
                    <BlockList Header="Engineer">
                        {EmployeeCheckbox}
                    </BlockList> : null
                }
                {props.Customer ? <BlockList Header="Customers">
                    {CustomerCheckbox}
                </BlockList> :null
                    
                }
                {props.Machine ? <BlockList Header="Machines">
                    {MachineCheckbox}
                </BlockList> : null
                    
                }
                {props.MachineModels ? <BlockList Header="Machine Models">
                    {MachineModelsCheckbox}
                </BlockList> : null

                }
                {props.JobType ? <BlockList Header="Job Type">
                    {JobTypeCheckbox}
                </BlockList>: null 
                    
                }
                {props.JobStatus ? <BlockList Header="Job Status">
                    {JobStatusCheckbox}
                </BlockList>: null 
                    
                }
                {props.Tools ? <BlockList Header="Tools">
                    {ToolCheckbox}
                </BlockList> :null 
                    
                }
                {props.PONumber ? <BlockList Header="PO Number">
                    {PONumberTextBox}
                </BlockList>: null 
                    
                }
                {props.SerialNo ? <BlockList Header="Serial Number">
                    {SerialNoTextBox}
                </BlockList> : null 
                    
                }
                {props.RequestDate ? <BlockList Header="Request date">
                    {RequestDateBox}
                </BlockList> : null 
                    
                }
                {props.DueDate ? <BlockList Header="Due date">
                    {DueDateBox}
                </BlockList> : null 
                    
                }
            </div>
            <div className="body-sideNarbarCriBox">
                <div className="border-solid criteria-SideNavbar">
                    Criteria
                    <button className="btn-transparent clear-all-button" onClick={() => {
                        dispatch({
                            type: ReportFilterStore.ActionType.ClearFilter
                        })
                        setDataItem2({ FilterText: "" })
                    }}>Clear All</button>
                    {ListEmployeeFilter}
                    {ListCustomerFilter}
                    {ListMachineFilter}
                    {ListMachineModelsFilter}
                    {ListJobTypeFilter}
                    {ListJobStatusFilter}
                    {ListToolFilter}
                </div>
            </div>
            <div className="foot-sideNavbar">
                <Button className="btn btn-default btnDefault btn-Temp" onClick={props.Search} >Search</Button>
            </div>
        </div>
    )
}
export const BlockList = (props) => {
    const [show, setShow] = useState(false);
    const [style, setStyle] = useState();
    const EnabledBox = () => {
        setShow(!show)
    }

    useEffect(() => {

        if (!show) {
            setStyle({ display: 'block' })
        } else {
            setStyle({ display: 'none' })
        }
    }, [show])

    return (
        <React.Fragment>
            <ul className="sidebar-navigation">
                <li className="header" onClick={EnabledBox}>{props.Header}</li>
                <FormGroup style={style}>
                    {props.children}
                </FormGroup>
            </ul>
        </React.Fragment>
    )

}
export default SideNavBar;
