import React, { useEffect} from 'react';
import ResultBox from '../UI/ResultBox'
import MainScreen from '../UI/MainScreen'
import JobMonitorTable from './JobMonitorTable'
import { useDispatch, useSelector } from 'react-redux'
import * as JobMonitorStore from '../../store/JobMonitorStore'
import '../../assets/css/common-style.css';

const JobConflict = () => {
    const dispatch = useDispatch()
    const JobConflictData = useSelector(state => state.JobMointorReducer.JobConflictData)
    const criteria = useSelector(state => state.JobMointorReducer.SearchCriteria)
    useEffect(() => {

            search()
        
    }, [])


    const search = () => {
        JobMonitorStore.actionCreators.SearchConflict(dispatch, criteria)
    } 
    return (
        <MainScreen>           
            <ResultBox HeaderText="Job Conflict">
                <JobMonitorTable conflict dataTable={JobConflictData} />
            </ResultBox>
            
           
        </MainScreen>
    )
}


export default JobConflict