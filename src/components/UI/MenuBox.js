import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardLink, CardSubtitle } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as common from '../CommonFunction/common-function'
import '../../assets/css/MenuBox.css';

const MenuBox = (props) => {

    const listcard = props.data && props.data.map((item) => {
        const Tag = common.getIconTag(item.icon.type, item.icon.name)
        return (
            <div className="col-xs-6 col-md-4" key={common.uuidv4()}>
                <Card tag={Link} to={item.link} className="menubox-br p-2 card-menubox-shadow" style={{ textDecoration: 'none', color: 'black' }}>
                    <Container>
                        <Row>
                            <div className="col-sm-12 col-md-12 col-lg-2">
                                <Tag size={30} style={{ textDecoration: 'none', color: 'black', opacity: '0.5' }} />
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-10">
                                <Container>
                                    <Row className="row-equal-box">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <CardTitle className="text-font-menubox">{item.header}</CardTitle>
                                        </div>
                                    </Row>                                   
                                </Container>
                            </div>
                        </Row>
                    </Container>
                </Card>
            </div>
        )
    })
    return (
        <React.Fragment>
            <Container>
                <div className="row">
                    {listcard}
                </div>
            </Container>

        </React.Fragment>
    )
}


export const SingleMenuBox = (props) => {
    const listcard = props.data && props.data.map((item) => {
        const Tag = common.getIconTag(item.icon.type, item.icon.name)
        return (
            <Col sm="12" md="12" lg="4" key={common.uuidv4()}>
                <Card key={common.uuidv4()} tag={Link} to={item.link} className="menubox-br p-2 card-menubox-shadow" style={{ textDecoration: 'none', color: 'black' }}>

                    <Container>
                        <Row>
                            <Col sm="12" md="2" lg="2">
                                <Tag size={30} style={{ textDecoration: 'none', color: 'black', opacity: '0.5' }} />
                            </Col>
                            <Col sm="12" md="10" lg="10">
                                <Container>
                                    <Row>
                                        <CardTitle className="text-font-menubox">{item.header}</CardTitle>
                                    </Row>
                                  
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Card>

            </Col>
        )
    })
    return (
        <React.Fragment>
            <Row>
                {listcard}
            </Row>

        </React.Fragment>
    )
}
export default MenuBox


// Single box
    //< Row >
    //<CardSubtitle className="text-font-menulist">{item.detail}</CardSubtitle>
    //</Row >

// MenuBox
    //< Row className = "row-equal-box" >
    //    <div className="col-sm-12 col-md-12 col-lg-12">
    //        <CardSubtitle className="text-font-menulist">{item.detail}</CardSubtitle>
    //    </div>
    //</Row >
