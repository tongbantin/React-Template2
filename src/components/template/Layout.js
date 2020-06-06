import React,{useEffect} from 'react';
import NavMenu from './NavMenu';
import '../../assets/css/common-style.css';

export default props => {
    const notloginpage = window.location.pathname!=='/'
    useEffect(() => {
    }, [notloginpage])
    return(    
    <div>
        {notloginpage ? <NavMenu className="app-navbar" /> : null }
        
        {props.children}
    </div>)

    };
