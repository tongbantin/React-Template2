import * as Constants from './constants'
import Axios from 'axios'
import * as constant from './../components/CommonFunction/constant'
import * as common from './../components/CommonFunction/common-function'

export const ActionType = {
    GetServiceReportCriteria: "ServiceReportReducer_ServiceReportCriteria",
    GetServiceReportList: "ServiceReportReducer_ServiceReportList",
}

const initial_state = {
    JobList:[],
    ServiceReportCriteria: {

    }
}

export const actionCreators = {
    Search: (dispatch, criteria) => {
        let url = `${Constants.API_URL}/api/Job/GetJobList`
        Axios.post(url, criteria)
            .then((response) => {
                if (response.data) {
                    let resultsort = response.data.sort((a, b) => (a.CreatedDate < b.CreatedDate) ? 1 : -1)
                    dispatch({ type: ActionType.GetServiceReportList, param: resultsort })
                }
            }).catch((error) => { common.apiError(error) });
    },
}

export const ServiceReportReducer = (state = JSON.parse(JSON.stringify(initial_state)), action) => {
    switch (action.type) {
        case ActionType.GetServiceReportList:
            state.JobList = action.param
            break;
        default:
            break;
    }
    return state
}