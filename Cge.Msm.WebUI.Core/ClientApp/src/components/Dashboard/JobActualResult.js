//Library
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Input, CustomInput, Container, Row, Col } from 'reactstrap'

//Component
import * as common from './../CommonFunction/common-function'
import FormRowInput from '../UI/FormDetail'
import * as LinkModal from '../UI/LinkText/LinkModal'
import { ReactTable } from '../UI/CommonTables';
import Modal from '../UI/MainModal'
import {DatePicker2} from '../UI/DatePicker'
import SignaturePad from 'react-signature-canvas';
//Store
import * as JobMonitorStore from '../../store/JobMonitorStore'
import * as jobActualyStore from '../../store/jobActualyStore'


export const JobActualResult = React.memo((props) => {
    //Redux
    const dispatch = useDispatch()
    //Props
    //Declare State
    const [dataItem, setDataItem] = useState({
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
    })
    const [ActualPhoto, setActualPhoto] = useState([])
    const [ActualCertificate, setActualCertificate] = useState([])
    const [ActualReport, setActualReport] = useState([])
    const attatchdataPhoto = {
        JobId: dataItem.JobId,
        Section: 'Actual',
        SerialNo: dataItem.SerialNo,
        DocumentType:'Photo'
    }
    const attatchdataCertificate = {
        JobId: dataItem.JobId,
        Section: 'Actual',
        SerialNo: dataItem.SerialNo,
        DocumentType: 'Certificate'
    }
    const attatchdataReport = {
        JobId: dataItem.JobId,
        Section: 'Actual',
        SerialNo: dataItem.SerialNo,
        DocumentType: 'Report'
    }
    //Effect
    useEffect(() => {
        setDataItem(props.Data)
        if (props.Data) {
            if (props.Data.JobId == "")
                return
            //LoadAttachment()
        }
        let didCancel = false
        async function fetchData() {
            if (!didCancel)
                try {
                    var criteria = {
                        JobId: props.Data.JobId,
                        Section: 'Actual',
                        SerialNo: props.Data.SerialNo
                    }

                    JobMonitorStore.actionCreators.LoadAttachmentList_Return({ ...criteria, DocumentType: "Photo" }, (data) => { !didCancel&&setActualPhoto(data) })
                    JobMonitorStore.actionCreators.LoadAttachmentList_Return({ ...criteria, DocumentType: "Certificate" }, (data) => { !didCancel &&setActualCertificate(data) })
                    JobMonitorStore.actionCreators.LoadAttachmentList_Return({ ...criteria, DocumentType: "Report" }, (data) => { !didCancel &&setActualReport(data) })
                } catch (error) {
                    // Do something with error
                } finally {

                }
        }
        fetchData()
        return () => { didCancel = true }
        
    }, [props.Data])
    //Event+function
    const LoadAttachment = () => {
        var criteria = {
            JobId: props.Data.JobId,
            Section: 'Actual',
            SerialNo: props.Data.SerialNo
        }

        JobMonitorStore.actionCreators.LoadAttachmentList_Return({ ...criteria, DocumentType: "Photo" }, (data) => { setActualPhoto(data) })
        JobMonitorStore.actionCreators.LoadAttachmentList_Return({ ...criteria, DocumentType: "Certificate" }, (data) => { setActualCertificate(data) })
        JobMonitorStore.actionCreators.LoadAttachmentList_Return({ ...criteria, DocumentType: "Report" }, (data) => { setActualReport(data) })

    }
    const handleInputChange = event => {
        const { name, value } = event.target
        setDataItem({ ...dataItem, [name]: value })
        dispatch({ type: JobMonitorStore.ActionType.ActualListChange, param: { ...dataItem, [name]: value } })
    }
    const onAddFile = async (event, attatchdata) => {
        if (event.target.value.length > 0) {
            let e = event
            var result = common.getFileNameWithExt(e)
            //#todo set null ไม่ผ่าน
            //event.target.value = null;
            var base = await common.uploadWithJSON(e.target.files[0] && e.target.files[0])
            var result = await JobMonitorStore.actionCreators.SaveFile64(dispatch, base, result, attatchdata)
            if (result) {
                LoadAttachment()
            }
            else {
                common.InformationOKDialog("Upload fail")
            }
         
        } else {
            event.target.value = null;
        }
    }
    
    
    //SubComponent
    return (

        <div>
            {//console.log("render ActualResult")
            }
            <FormRowInput label="Model">
                <label htmlFor="Model_Value">{dataItem.MachineModel}</label>
            </FormRowInput>
            <FormRowInput label="Type">
                <label htmlFor="Type_Value">{dataItem.MachineType}</label>
            </FormRowInput>
            <FormRowInput label="Name">
                <label htmlFor="Type_Value">{dataItem.MachineName}</label>
            </FormRowInput>
            <FormRowInput label="Working Time From">
                <DatePicker2 name="ActualWorkFromDate"  value={dataItem.ActualWorkFromDate || ''} onChange={handleInputChange} />
            </FormRowInput>
            <FormRowInput label="Working Time To">
                <DatePicker2 name="ActualWorkToDate"  value={dataItem.ActualWorkToDate || ''} onChange={handleInputChange} />
            </FormRowInput>
            <FormRowInput label="Customer In-charge">
                <input className="form-control" type="text" readOnly={true} name="CustomerIncharge"  value={dataItem.CustomerIncharge || ''} onChange={handleInputChange} />
            </FormRowInput>
            <FormRowInput label="Signed Date">
                <input className="form-control" type="text" readOnly={true} name="AcceptedDate" value={dataItem.AcceptedDate || ''} onChange={handleInputChange} />
            </FormRowInput>
            <FormRowInput label="Symtom">
                <Input type="textarea" name="Symtom" id="Symtom" style={{ height: 150 }}  value={dataItem.Symtom || ''} onChange={handleInputChange} />
            </FormRowInput>
            <FormRowInput label="Action Taken">
                <Input type="textarea" name="ActionTaken" id="ActionTaken" style={{ height: 150 }}  value={dataItem.ActionTaken || ''} onChange={handleInputChange} />
            </FormRowInput>
            <FormRowInput label="Cause">
                <Input type="textarea" name="Cause" id="Cause" style={{ height: 150 }} value={dataItem.Cause || ''} onChange={handleInputChange} />
            </FormRowInput>
            <FormRowInput label="Result">
                <Input type="textarea" name="Result" id="Result" style={{ height: 150 }} value={dataItem.Result || ''} onChange={handleInputChange} />
            </FormRowInput>
            <FormRowInput label="Comment">
                <Input type="textarea" name="Comment" id="Comment" style={{ height: 150 }} value={dataItem.Comment || ''} onChange={handleInputChange} />
            </FormRowInput>
            <FormRowInput label="Document">
            </FormRowInput>
            <div className="row detail-form-input">
                <div className="col-12 col-md-4">
                    <label htmlFor="photo" className="col-label-bold">Photo</label>
                </div>
                <div className="col-12 col-md-8 col-detailForm">
                    <div className="col-12 detail-form">
                        <Input type="file" name="file" onChange={(e) => onAddFile(e, attatchdataPhoto)} />
                    </div>
                    {ActualPhoto && ActualPhoto.map(item => (
                        <div key={common.uuidv4()}>
                            <LinkModal.MediaFileName Display={item.AttachmentName} FileNameLink={item.FileNameLink} Delete={() => { JobMonitorStore.actionCreators.DeleteAttachment(dispatch, item).then((res => { LoadAttachment() })) }} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="row detail-form-input">
                <div className="col-12 col-md-4">
                    <label htmlFor="photo" className="col-label-bold">Certificate</label>
                </div>
                <div className="col-12 col-md-8 col-detailForm">
                    <div className="col-12 detail-form">
                        <Input type="file" name="file" onChange={(e) => onAddFile(e, attatchdataCertificate)} />
                    </div>
                    {ActualCertificate && ActualCertificate.map(item => (
                        <div key={common.uuidv4()}>
                            <LinkModal.MediaFileName Display={item.AttachmentName} FileNameLink={item.FileNameLink} Delete={() => { JobMonitorStore.actionCreators.DeleteAttachment(dispatch, item).then((res => { LoadAttachment()})) }} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="row detail-form-input">
                <div className="col-12 col-md-4">
                    <label htmlFor="photo" className="col-label-bold">Report</label>
                </div>
                <div className="col-12 col-md-8 col-detailForm">
                    <div className="col-12 detail-form">
                        <Input type="file" name="file" onChange={(e) => onAddFile(e, attatchdataReport)} />
                    </div>
                    {ActualReport && ActualReport.map(item => (
                        <div key={common.uuidv4()}>
                            <LinkModal.MediaFileName Display={item.AttachmentName} FileNameLink={item.FileNameLink} Delete={() => { JobMonitorStore.actionCreators.DeleteAttachment(dispatch, item).then((res => { LoadAttachment() })) }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
})

export const Signature = (props) => {
    //Redux
    const JobActualList = useSelector(state => state.JobMointorReducer.Form.JobActualList)
    const jobdata = useSelector(state => state.JobMointorReducer.Form.Jobdata)
    //Props

    //Declare State
    const [isOpen, setIsOpen] = useState(false)
    const [image, setImage] = useState(null)
    const [SelectedSerial, setSelectedSerial] = useState([])
    const [dataItem, setDataItem] = useState({
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
    })
    const dispatch = useDispatch()
    
    //Effect
    //Event+function
    const getdata = (url) => {
        setImage(url)
    }
    const handleChange = (e, Serial) => {
        if (e.target.checked) {
            setSelectedSerial(SelectedSerial.concat(Serial))

        } else {
            setSelectedSerial(SelectedSerial.filter((id) => { return id != Serial }))
        }

    }
    const handleInputChange = event => {
        const { name, value } = event.target
        setDataItem({ ...dataItem, [name]: value })
    }
    const onUpload = () => {
        let doctype = 'Signature'
        let customer = dataItem.AcceptedBy
        if (props.isEngineer) {
            doctype = 'Signature_Engineer'
        }
        if (image == null || SelectedSerial.length==0) {
            return;
        }
        var attatchdata = {
            JobId: jobdata.JobId,
            Section: 'Actual',
            DocumentType: doctype,
            CustomerIncharge: customer,
            UpdatedBy: common.GetUserId()
        }

        common.SaveWithConfirm(() => {
            if (props.SaveActual) {
                props.SaveActual()
            }
            JobMonitorStore.actionCreators.SaveSignatureMedia(dispatch, image, SelectedSerial, attatchdata, props.isEngineer).then
                (
                    res => {
                        setImage(null)
                        setDataItem({ ...dataItem, AcceptedBy: "" })
                        setSelectedSerial([])
                    })
           
        })
        
    }
    const onReset = () => {
        setImage(null)
    }
    //SubComponent
    const header = (<React.Fragment>
        <th></th>
        <th>Type</th>
        <th>Model</th>
        <th>Serial</th>
    </React.Fragment>)

  
    const row = JobActualList && JobActualList
        .filter(x => {
            if (props.isEngineer) {
                if (x.EmployeeSigndate == null)
                    return true
            } else if (x.AcceptedDate == null)
                return true
            else return false
                })
        .map((item) => (
            <tr key={common.uuidv4()}>
                <td><CustomInput type="checkbox" className="table-checkbox" id={common.uuidv4()} checked={SelectedSerial.includes(item.SerialNo)} onChange={e => { handleChange(e, item.SerialNo) }} /></td>
            <td>{item.MachineType}</td>
            <td>{item.MachineModel}</td>
            <td>{item.SerialNo}</td>
        </tr>
    )
    )

    return (
        <div >
            <label className="col-label-bold">Select Machines</label>
            <ReactTable Header={header} Row={row} />
            {props.isEngineer ? null :
                <FormRowInput label="Customer In-charge">
                    <input className="form-control" type="text" name="AcceptedBy" value={dataItem.AcceptedBy} onChange={handleInputChange} />
                </FormRowInput>
                }
            <FormRowInput label="Signature">
                <input type="button" onClick={() => { setIsOpen(true) }} value="Sign Now" />
                <SignatureModal
                    GetData={getdata}
                    isOpen={isOpen}
                    onCancel={() => { setIsOpen(false) }}
                />
                {image ? <img
                    src={image}
                    alt="My picture"
                    style={{
                        display: "block",
                        marginTop: "5px",
                        border: "1px solid #ced4da",
                        width: "300px",
                        height: "170px"
                    }}
                /> : null}
               
            </FormRowInput>
            <input type="button" className="btn btn-default btnDefault btn-Temp" value="Upload" onClick={onUpload} />
            <input type="button" className="btn btn-default btnDefault btn-Temp" value="Reset" onClick={onReset} />
        </div>
        )
}

export const SignatureModal = (props) => {
    //Redux
    const dispatch = useDispatch()
    const sigCanvas = useRef({});
    const clear = () => sigCanvas.current.clear();
    const save = () => {
        props.GetData(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'))
        props.onCancel()
    }


    return (
        <Modal isOpen={props.isOpen}
            onSave={save}
            onCancel={() => {
                props.onCancel()
            }}
            ClearHidden={false}
            onClear={clear}
            ModalHeaderText="Signature"
        >
            <SignaturePad
                ref={sigCanvas}
                canvasProps={{ className: "SignatureCanvas" }}
            >
            </SignaturePad>
        </Modal>
    )

}


export default JobActualResult;
