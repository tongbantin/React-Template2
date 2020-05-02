import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as Counter from './Counter';
import * as ServiceRequestStore from './ServiceRequestStore'
import * as customerStore from './customerStore'
import * as JobStore from './jobStore'
import * as JobActualyStore from './jobActualyStore'
import * as EmployeeLeaveStore from './EmployeeLeaveStore' 
import * as TaskStore from './TaskStore' 
import * as JobMonitorStore from './JobMonitorStore'
import * as AddComponentStore from './AddComponentStore'
import * as MasterStore from './MasterStore'
import * as ToolStore from './ToolStore'
import * as comboStore from './comboStore'
import * as MachineStore from './MachineStore' 
import * as ReportFilterStore from './ReportFilterStore'
import * as ServiceReportStore from './ServiceReportStore'
export default function configureStore (history, initialState) {
  const reducers = {
    counter: Counter.reducer
      , ServiceRequestReducer: ServiceRequestStore.ServiceRequestReducer
      , customerReducer: customerStore.customerReducer
      , jobReducer: JobStore.jobReducer
      , jobActualyReducer: JobActualyStore.jobActualyReducer
      , EmployeeLeaveReducer: EmployeeLeaveStore.EmployeeLeaveReducer
      , TaskReducer : TaskStore.TaskReducer
      , JobMointorReducer :JobMonitorStore.JobMointorReducer
      , AddComponentReducer: AddComponentStore.AddComponentReducer
      , MasterReducer: MasterStore.MasterReducer
      , ToolsReducer: ToolStore.ToolsReducer
      , ComboReducer: comboStore.ComboReducer
      , MachineReducer: MachineStore.MachineReducer
      , ReportFilterReducer: ReportFilterStore.ReportFilterReducer
      , ServiceReportReducer: ServiceReportStore.ServiceReportReducer
  };
    //middleware เอาไว้ debug
    const log = (store) => (next) => (action) => {
        next(action)
    };
  const middleware = [
    thunk,
      routerMiddleware(history),
    log
  ];
    
  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
      routing: routerReducer
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
