import * as IonIcon from "react-icons/io";
import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Axios from 'axios'
import * as Constants from './constant'

//Library
//Component
//Store

    //Redux
    //Props
    //Declare State
    //Effect
    //Event+function
    //SubComponent

export {Constants};
export const Icontype = {
    ION:"ion"
}

export const MySwal = withReactContent(Swal)
export const MySwalLoading = withReactContent(Swal)
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    showClass: {
        popup: 'animated fadeInDown faster swal2-width-popup',
        backdrop: 'swal-overlay',
        //icon: '',
    },
    hideClass: {
        popup: 'animated fadeOutUp faster swal2-width-popup'
    }
})

export const apiError = (err) => {
    Toast.fire({
        icon: 'error',
        title: 'Api Error'
    })
    console.error(err)
}

export const setIsEditfromMode = (mode) => {
    if (mode == "Idle" || mode == "View")
        return false
    else
        return true
}
export const setModaltoggle = (mode) => {
    return mode !== "Idle"
}
export const handleInputChange = (event, setDataItem, dataItem) => {
    const { name, value } = event.target
    setDataItem({ ...dataItem, [name]: value })
}

export const EnableButton = {
    submit: (mode) => {
        return mode=="Add"||mode=="Edit"
    },
    cancel: (mode) => {
        return mode == "Add" || mode == "Edit"
    },
    clear: (mode) => {
        return  mode != "Edit"
    },
    add: (mode) => {
        return mode != "Add"
    },
}
export const HiddenButton = {
    editjob: (mode) => {
        return mode != "View"
    }
}

export const getIconTag = (icon, name) => {
    try {
        if (icon == undefined || name == undefined)
            return (null)
        var Allcomponents = {
            "ion": IonIcon,
        };
        const TagName = Allcomponents[icon][name];
        return TagName
    } catch (e) {
        
        return (null)
    }

}
export const loading = (isloading) => {
    if (isloading) {
        MySwal.showLoading()
    }else
        MySwal.hideLoading()
}
export const SaveWithConfirm = async (functionname,isdone = true)=>{
    var result = await MySwal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "",
        cancelButtonColor: "",
        confirmButtonText: 'Save',
        showClass: {
            popup: 'animated fadeInDown faster',
            backdrop: 'swal-overlay',
            //icon: '',
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        }
        
    })
    if(result.value){
        if (isFunction(functionname)) {
            await functionname()
            if (isdone)
                DoneDialog()
        }
    }
    
}
export const ConfirmBox = async (text)=>{
    var result = await MySwal.fire({
        title: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "",
        cancelButtonColor: "",
        cancelButtonText: "No",
        confirmButtonText: 'Yes',
        showClass: {
            popup: 'animated fadeInDown faster',
            backdrop: 'swal-overlay',
            //icon: '',
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        }
        
    })
    return result.value
    
    
}
export const DoneDialog = (title) => {
    if (title == null || title == undefined) {
        title = "Save Complate"
    }
    MySwal.fire({
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 1500,
        showClass: {
            popup: 'animated fadeInDown faster',
            backdrop: 'swal-overlay'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        }
    })
}
export const ConfirmDelete=(functionname)=>{
    if(!functionname)
        return
    MySwal.fire({
        title: 'Do you want to delete item ?',
        
        //text: "To delete: "+txt,
        //type: 'warning',
        showCancelButton: true,
        confirmButtonColor: "",
        cancelButtonColor: "",
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCloseButton: true,
        showClass: {
            popup: 'animated fadeInDown faster',
            backdrop: 'swal-overlay',
            //icon: '',
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        }
    }).then((result) => {
        if (result.value) {
            let res =   functionname()
            MySwal.fire({
               icon: 'success',
               title: 'Deleted!',
               showConfirmButton: false,
               timer: 1500
            })
        }
    })
}

export const ConfirmSendEmail = async (functionname,Email) => {
    if (!functionname)
        return
    MySwal.fire({
        html: `Please Confirm to Send Report to ${Email||'Specify Email'}.`,

        //text: "To delete: "+txt,
        //type: 'warning',
        showCancelButton: true,
        confirmButtonColor: "",
        cancelButtonColor: "",
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCloseButton: true,
        showClass: {
            popup: 'animated fadeInDown faster',
            backdrop: 'swal-overlay',
            //icon: '',
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        }
    }).then(async (result) => {
        if (result.value) {
            let res = await functionname()
            MySwal.fire({
                icon: 'success',
                title: 'Send Email is Completed',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
}

export const InformationOKDialog = (text, function_name) => {
    
    return MySwal.fire({
        icon: 'warning',
        html: text,
        showConfirmButton: true,
        showClass: {
            popup: 'animated fadeInDown faster',
            backdrop: 'swal-overlay',
            //icon: '',
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        }
    }).then((result) => {
        if (result.value) {
            if (function_name)
                function_name()
        }
    })
}
export const CancelWithConfirm=(functionname)=>{
    MySwal.fire({
        title: 'Are you sure?',
        showCancelButton: true,
        confirmButtonColor: "",
        cancelButtonColor: "",
        confirmButtonText: 'Yes, Cancel it!',
        cancelButtonText: 'No',
        showClass: {
            popup: 'animated fadeInDown faster',
            backdrop: 'swal-overlay',
            //icon: '',
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        }

    }).then((result) => {
        if (result.value) {
            functionname()
        }
    })
}
export const ArrayTextReduce = (array) => {
    let li = array && array.reduce((acc, item) => { return `${acc}<li>${item}</li> ` }, "")
    return li
}
export const uuidv4=()=> {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
export function getFileNameWithExt(event) {

    if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
        return;
    }

    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf('.');

    const fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);

    return { fileName: fileName, ext: ext }

}
export async function uploadWithJSON(f) {
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    try {
        var res = await toBase64(f)
        res = res.substr(res.indexOf(',') + 1)
        return res
    } catch (e) {
        return ""
    }

}
export function isFunction(functionToCheck) {
    //return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    return functionToCheck instanceof Function
}
export function isEmptyStr(str) {
    return (!str || 0 === str.length || str.match(/^ *$/) !== null);
}
export const showapiError = (error) => {
    apiError()
}
export function to(promise) {
    return promise.then(data => {
        return {
            error: null,
            result: data
        }
    })
    .catch(err => {
        apiError(err)
        return {
            error: err
        }
    })
}
export function toNoApi(promise) {
    return promise.then(data => {
        return {
            error: null,
            result: data
        }
    })
        .catch(err => {
        return {
            error: err
        }
    })
}
export function merge(...schemas) {
    const [first, ...rest] = schemas;
  
    const merged = rest.reduce(
      (mergedSchemas, schema) => mergedSchemas.concat(schema),
      first
    );
  
    return merged;
  }
///////////// Authentication and Authorization /////////////////////////
// add Authorization as default header

Axios.interceptors.response.use((response) => {
    return response;
}, error => {
        if (error.response && error.response.status) {
            if (error.response.status === 401) {
                // unauthenticated (ยังไม่ได้ login)
                InformationOKDialog(" Login / token expire", () => { GoHome() })
                return error
            } else if (error.response.status === 403) {
                // unauthorized (user ไม่มีสิทธิ์)
                InformationOKDialog("PermissionDenied")
                return error
            }
             else if (error.response.status === 400) {
                return false
            }
            return Promise.reject(error)
        }
        return Promise.reject(error)
});
export const GoHome = () => {
    var path = window.location.protocol + '//' + window.location.host
    window.location.replace(path)
}
export const SetUserData = (data) => {
    if (data != null) {
        sessionStorage.setItem('UserId', data.UserId);
        sessionStorage.setItem('EmployeeId', data.EmployeeId);
        sessionStorage.setItem('Token', data.Token);
    } else {
        sessionStorage.removeItem('UserId');
        sessionStorage.removeItem('EmployeeId');
        sessionStorage.removeItem('Token');
    }
}
export const GetUserId = () => {
    return sessionStorage.getItem('UserId') || ''
}
export const GetEmpId = () => {
    return sessionStorage.getItem('EmployeeId') || ''
}
export const GetToken = () => {
    return sessionStorage.getItem('Token') || ''
}
export const GetAud = () => {
    return 'sGSJp4eU0APoUwH0w09p'
}
export function without(props, keys) {
    return Object.keys(props)
        .filter((key) => keys.indexOf(key) !== -1)
        .reduce((retVal, key) => {
            retVal[key] = props[key];
        }, {});
}
export const setDataToFormHook = (obj,fieldDate) => {
    let lstfield = []
    for (var name in obj) {
        var value = obj[name];
        if (fieldDate&&fieldDate.includes(name)) {
            lstfield.push({ [name]: formatDate(value) })
        } else {
            lstfield.push({ [name]: value })
        }
    }
    return lstfield
    
}
export const setDataDate = (obj,fieldDate) => {
    let lstfield = []
    for (var name in obj) {
        var value = obj[name];
        if (fieldDate&&fieldDate.includes(name)) {
            obj[name]= formatDate(value) 
        } 
    }
    return obj
    
}
export const formatDate = (date) => {
    if (date == null || date=='') {
        return ''
    }
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
export const DownloadReport=(ReportGenerateResult,defaultName)=>{
    if(ReportGenerateResult){
        if (ReportGenerateResult.PdfSream) {
            let a = document.createElement("a");
            a.href = `data:application/pdf;base64,${ReportGenerateResult.PdfSream}`
            if (isEmptyStr(ReportGenerateResult.Filename)) {
                a.download = defaultName||"Report.pdf"
            }else{
                a.download = ReportGenerateResult.Filename;
            }
            
            a.click();
        }
    }
    
}
var hasOwnProperty = Object.prototype.hasOwnProperty;

export function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
export function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            console.log(a[propName], b[propName])
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}