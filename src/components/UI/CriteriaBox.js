import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import * as common from './../CommonFunction/common-function'
const CriteriaBox = (props) => {
    const Iconclose = common.getIconTag(common.Icontype.ION, "IoMdClose")
    const [show, setShow] = useState(false);
    const [style, setStyle] = useState();
    const defaultProps = {
        onSearch: () => {},
        onClose: () => { },
        onClear: () => { },
        hiddenClose: false,
        hiddenClear: true


    }
    const currentProps = {
        ...defaultProps, ...props
    }
    useEffect(() => {

       if(show)
            setStyle({display:'block'})
        else
            setStyle({display:'none'})
    }, [show])

    useEffect(() => {
        setShow(props.hidden)
        
    }, [props])


    return (
        <React.Fragment >    
            <Card style={style} className="card-br criteria-Box-Card">

                <button className="icon-float-right"
                    hidden={currentProps.hiddenClose}
                    onClick={() => {
                    setShow(false)
                    currentProps.onClose()
                }} style={{ textDecoration: 'none', color: 'black', padding: '0 5px', border: 'none', backgroundColor: '#FFFFFF' }}><Iconclose /></button>       
                <CardBody>
                    <div className="row cardDetailForm-Criteria">
                        <div className="col-xs-10 col-md-8 criteria-col">
                            {props.children}
                        </div>
                        <div className="col-xs-10 col-md-4" style={{ textAlign: 'right', lineHeight:'33px' }}>
                            <button className="btn btn-default btnDefault btn-Temp" name="Search" value="Search" onClick={currentProps.onSearch} >Search</button>
                            <button className="btn btn-default btnDefault btn-Temp" name="Clear" value="Clear" hidden={currentProps.hiddenClear} onClick={currentProps.onClear} >Clear</button>  
                        </div>
                    </div>
                </CardBody>
            </Card>         
        </React.Fragment>
        )
}
export default CriteriaBox