import React, { useEffect,useState} from 'react';
import ResultBox from '../UI/ResultBox'
import MainScreen from '../UI/MainScreen'
import UpcomingTable from './Upcoming'
import JobMonitorTable from './JobMonitorTable'
import { useDispatch, useSelector } from 'react-redux'
import * as TaskStore from '../../store/TaskStore'
import * as JobMonitorStore from '../../store/JobMonitorStore'
import '../../assets/css/common-style.css';
import CriteriaBox from '../UI/CriteriaBox'
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';

const Dashboard = () => {
    
    return (
        <>
        A
        </>
    )
}
export const CriteriaDashboard = (props) => {
    const SearchCriteria = useSelector(state => state.JobMointorReducer.SearchCriteria)
    const [dataItem, setDataItem] = useState(SearchCriteria)
    const dispatch = useDispatch()

    useEffect(() => {
        setDataItem(SearchCriteria)
    }, [SearchCriteria])
    useEffect(() => {
        //dispatch({ type: JobMonitorStore.ActionType.criteriaChange, param: dataItem })
    }, [dataItem])

    const handleInputChange = event => {

        const { name, value } = event.target
        setDataItem({ ...dataItem, [name]: value })
        dispatch({ type: JobMonitorStore.ActionType.criteriaChange, param: { ...dataItem, [name]: value } })
        
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            props.search()
        }
    }
    return (
        <React.Fragment>
            <Form className="criteria-div" onSubmit={(e) => { e.preventDefault() }}>
                <FormGroup row>
                    <Label className="Label-font" for="SearchFor"  size="sm">Search For</Label>
                    <Col md={4}>
                        <Input type="text" bsSize="sm" name="FullText" id="FullText" value={dataItem.FullText} onKeyPress={handleKeyPress} onChange={handleInputChange} />
                    </Col>
                   
                </FormGroup>
                
            </Form>
        </React.Fragment>
    )
}

export default Dashboard