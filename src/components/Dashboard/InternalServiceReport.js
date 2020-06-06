import React, { useEffect, useState } from 'react';
//Component
import * as common from './../CommonFunction/common-function'
import { Input } from 'reactstrap';
import FormRowInput from '../UI/FormDetail'
import * as LinkModal from '../UI/LinkText/LinkModal'
//Redux
import { useDispatch, useSelector } from 'react-redux'
import * as JobMonitorStore from '../../store/JobMonitorStore'

function InternalServiceReport() {
    const initialFormState = useSelector(state => state.JobMointorReducer.Form.Internal)
    const [dataItem, setDataItem] = useState(initialFormState)
    const InternalPhoto = useSelector(state => state.JobMointorReducer.Form.InternalPhoto)
    const dispatch = useDispatch()
    const handleInputChange = event => {
        const { name, value } = event.target
        setDataItem({ ...dataItem, [name]: value })
    }
    const attatchdataPhoto = {
        JobId: dataItem.JobId,
        Section: 'Internal',
        DocumentType: 'Photo'
    }
    const onAddFile = async (event, attatchdata) => {
        event.preventDefault()
        if (event.target.value.length > 0) {
            let e = event
            var result = common.getFileNameWithExt(e)
            var base = await common.uploadWithJSON(e.target.files[0] && e.target.files[0])
            var result = await JobMonitorStore.actionCreators.SaveFile64(dispatch, base, result, attatchdata)
            if(result)
                JobMonitorStore.actionCreators.LoadInternalAttachmentList(dispatch, dataItem.JobId)
            else
                common.InformationOKDialog('Upload fail')
        }
    }
    useEffect(() => {
        setDataItem(initialFormState)
    }, [initialFormState])
    useEffect(() => {
        dispatch({ type: JobMonitorStore.ActionType.fInternalChange, param: dataItem })
    }, [dataItem])

    return (
        <div>
            <FormRowInput label="Action (Short)">
                <Input type="textarea" name="ActionShort" id="ActionShort" style={{ height: 150 }}  value={dataItem.ActionShort || ''} onChange={handleInputChange} />
            </FormRowInput>
            <FormRowInput label="ข้อควรระวัง">
                <Input type="textarea" name="Awareness" id="Awareness" style={{ height: 150 }} value={dataItem.Awareness || ''} onChange={handleInputChange} />
            </FormRowInput>
            <FormRowInput label="Follow up">
                <Input type="textarea" name="FollowUp" id="FollowUp" style={{ height: 150 }} value={dataItem.FollowUp || ''} onChange={handleInputChange} />
            </FormRowInput>
            <FormRowInput label="โอกาสทางการขาย">
                <Input type="textarea" name="Opportunity" id="Opportunity" style={{ height: 150 }} value={dataItem.Opportunity || ''} onChange={handleInputChange} />
            </FormRowInput>
            <FormRowInput label="Link">
                <Input type="text" name="Link" id="Link" value={dataItem.Link || ''} onChange={handleInputChange} />
                <a target='_blank' href={dataItem.Link}>{dataItem.Link}</a>
            </FormRowInput>
            <FormRowInput label="Remark">
                <Input type="textarea" name="Remark" id="Remark" style={{ height: 150 }} value={dataItem.Remark || ''} onChange={handleInputChange} />
            </FormRowInput>
            <FormRowInput label="Document">
            </FormRowInput>
            <div className="row detail-form-input">
                <div className="col-12 col-md-4">
                    <label htmlFor="photo" className="col-label-bold">Photo</label>
                </div>
                <div className="col-12 col-md-8 col-detailForm">
                    <div className="col-12 detail-form">
                        <Input type="file" name="file" value ="" onChange={(e) => onAddFile(e, attatchdataPhoto)} />
                    </div>
                    {InternalPhoto && InternalPhoto.map(item => (
                        <div key={common.uuidv4()}>
                            <LinkModal.MediaFileName Display={item.AttachmentName} FileNameLink={item.FileNameLink} Delete={async () => {
                                await JobMonitorStore.actionCreators.DeleteAttachment(dispatch, item)
                                JobMonitorStore.actionCreators.LoadInternalAttachmentList(dispatch, dataItem.JobId)
                            }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default InternalServiceReport;