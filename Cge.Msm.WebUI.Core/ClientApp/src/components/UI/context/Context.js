import React ,{ createContext,useState} from 'react';
export const CoreModal = createContext({});
export const CoreModalProvider =(props)=>{
      const dataCoreModal={
            isOpen:false,
            toggle:()=>{},
            onClosed:()=>{},
            ModalHeaderText:"",
            onCancel:()=>{},
            CancelText:"Cancel",
            CancelHidden:false,
            onSave:()=>{},
            SaveText:"Save",
            SaveHidden:false,
            a:{b:"",c:""}
      }
      return(
            <CoreModal.Provider value={{...dataCoreModal,...props}}>
                  {props.children}
            </CoreModal.Provider>
      )

  }
  export default CoreModal

  export const TodoStore = createContext({});
  export const TodoStoreProvider = ({ children }) => {
      const [isOpen, setisOpen] = useState(false);
      const store = {
            isOpen,
        submitTodo: (isOpen) => {alert(isOpen)
              setisOpen(isOpen)}
      };
      return (
        <TodoStore.Provider value={store}>
          {children}
        </TodoStore.Provider>
      );
    };
    
    export const JobMonitorContext = createContext({});
export const JobMonitorProvider = ({ children }) => {
      const [isOpen, setisOpen] = useState(false);
      const store = {
            isOpen,
        setOpen: (isOpen) => {
              setisOpen(isOpen)}
      };
      return (
        <JobMonitorContext.Provider value={store}>
          {children}
        </JobMonitorContext.Provider>
      );
    };