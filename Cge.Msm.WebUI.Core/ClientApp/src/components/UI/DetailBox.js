import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col, CardTitle } from 'reactstrap';
import {Box,Paper} from '@material-ui/core';
import * as common from './../CommonFunction/common-function'

const DetailBox = (props) => {
    const defaultProps = {
        HeaderText: 'header text',
        onbutton1Click: () => { },
        button1txt: 'load task',
        button1hidden: true,
        onbutton2Click: () => { },
        button2txt: 'button2',
        button2hidden: true
    }
    const [show, setShow] = useState(false);
    const [style, setStyle] = useState();

    const currentProps = {
        ...defaultProps, ...props
    }

    const EnabledBox = () => {
        setShow(!show)
    }

    useEffect(() => {

        if (!show) {
            setStyle({ display: 'block' })
        } else {
            setStyle({ display: 'none' })
        }
    }, [show])

    const IoIosArrowUp = common.getIconTag(common.Icontype.ION, "IoIosArrowUp");
    const IoIosArrowDown = common.getIconTag(common.Icontype.ION, "IoIosArrowDown");

    return (
        <Card className="card-modal">
            <CardBody>
                <Row className="row-HeadDetail-Modal">
                    <Col md={9}>
                        <CardTitle>
                            <b className="topic-table">{currentProps.HeaderText}</b>
                        </CardTitle>
                    </Col>
                    <Col md={3}>
                        <input type="button" className="btn btn-default btnDefault" onClick={currentProps.onbutton1Click} value={currentProps.button1txt} hidden={currentProps.button1hidden} />{' '}               
                        <button className="btn btn-default icon-arrow btn-Temp" onClick={EnabledBox} value={currentProps.button2txt} hidden={currentProps.button2hidden}>
                            {show ? <IoIosArrowUp /> : <IoIosArrowDown />}

                        </button>
                    </Col>
                </Row>
                <Row className="row-Detail-Modal" style={style} >
                    <Col>
                        {props.children}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}
export const DetailBox2 = (props) => {
    return (
        <Paper>
            <Box m={1} p={2} spacing={1}>
            {props.children}
            </Box>
            
        </Paper>
    )
}
export default DetailBox