import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, Button } from 'reactstrap';
import * as common from '../CommonFunction/common-function';
const ResultBox = (props) => {
    const defaultProps = {

        HeaderText: "Header Text Result Box",
        onButtonAddClick: () => { },
        ButtonAddHidden: true,
        onButtonSearchClick: () => { },
        ButtonSearchHidden: true,

    }
    const currentProps = {
        ...defaultProps, ...props
    }
    const Addtag = common.getIconTag('ion', 'IoIosAdd')
    const Searchtag = common.getIconTag('ion', 'IoIosSearch')

    return (
        <Card className="card-br">
            <CardBody>
                <CardTitle>
                    <div className="row">
                        <div className="col-xs-8 col-md-8">
                            <span className="topic-table">{currentProps.HeaderText}</span>
                        </div>
                        <div className="col-xs-4 col-md-4 btnBoxResult">
                            <button className="btn-transparent" hidden={currentProps.ButtonAddHidden} onClick={currentProps.onButtonAddClick}> <Addtag /></button>
                            <button className="btn-transparent" hidden={currentProps.ButtonSearchHidden} onClick={currentProps.onButtonSearchClick} > <Searchtag /></button>

                        </div>
                    </div>
                </CardTitle>
                {props.children}

            </CardBody>
        </Card>
    )
}
export default ResultBox