import * as Constants from './constants'
import Axios from 'axios'
import * as common from './../components/CommonFunction/common-function'

export const ActionType = {
    CREATE: 'CreateCustomer',
    READ: 'ReadCustomer',
    UPDATE: 'UpdateCustomer',
    DELETE: 'DeleteCustomer',
    CLEAR: 'ClearCustomer',

}
const initial_state ={
    data: [],
  
}


//action
export const actionCreators = {
    addCustomer: (dispatch, data) => {
        let url = `${Constants.API_URL}/api/Customer/CreateCustomer`
        Axios.post(url, {
            CustomerName: data.CustomerName,
            CustomerAddress: data.CustomerAddress,
            CustomerTel: data.CustomerTel,
            CustomerContact: data.CustomerContact,
            Username: data.Username,
        }).then(response => { }).catch((error) => common.apiError(error));
        actionCreators.getCustomer(dispatch)
    },
    getCustomer: async (dispatch) => {
        let url = `${Constants.API_URL}/api/Customer/GetCustomer`
        Axios.post(url, {})
            .then((response) => {
                if (response.data.data) {
                    dispatch({ type: ActionType.READ, param: response.data.data })
                }
            }).catch((error) => { common.apiError(error) });
    },
    clearCustomer: (dispatch) => {
        dispatch({ type: ActionType.CLEAR })
    },
   
   
   
}

//reducer Name
export const customerReducer = (state = JSON.parse(JSON.stringify(initial_state)), action) => {
    switch(action.type){//Action type แยกไว้ในไฟล์เดียวกันกับฝั่งเรียกใช้
        case ActionType.READ :
                state.data = action.param
                break;
        case ActionType.CREATE:
                break;
        case ActionType.CLEAR : 
            state.data = []
            break;
       
        default:
            break;
            
    }
    return state
}
