import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { SingleMenuBox } from './MenuBox'
export const MainScreen = (props) => {

    return (
        <Container className="body-page">
            <Row>
                <Col sm="12" md="12" lg="12">
                    <SingleMenuBox data={menu} />
                </Col>
                <Col sm="12" md="12" lg="12">
                    {props.children}
                </Col>
            </Row>
        </Container>
    )
}


const menu = [{
    link: "/service-request"
    , icon: { type: "ion", name: "IoIosPaper" }
    , header: "Service Request Form"
   // , detail: "Create new service request from customer"
},
{
    link: "/calendar"
    , icon: { type: "ion", name: "IoMdCalendar" }
    , header: "Schedule and Calendar"
    //, detail: "Job calendar view Gantt chart view"
},
{
    link: "/employee-leave"
    , icon: { type: "ion", name: "IoIosBuild" }
    , header: "Employee Holiday Leave"
    //, detail: "Edit Employee maintenance schedule Mask disable/enable"
},

]



export default MainScreen