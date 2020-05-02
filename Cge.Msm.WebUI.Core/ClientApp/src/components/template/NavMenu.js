import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Badge } from 'reactstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import '../../assets/css/NavMenu.css';
import * as common from './../CommonFunction/common-function'

export const Name = () => {


    
    return (
        <div>{common.GetUserId() || ''}</div>
    )
}
export const Conflict = () => {
    const JobConflictData = useSelector(state => state.JobMointorReducer.JobConflictData)
    return (
        <React.Fragment>
            {JobConflictData.length > 0 ?
                <Badge color="danger" pill>{JobConflictData.length}</Badge>
                : null
            }
        </React.Fragment>

    )
}
export default class NavMenu extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };

    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    logout() {
        common.SaveWithConfirm(() => {
            common.SetUserData(null);
            common.GoHome();
        },false)
        
    }

    render() {
        const Iconsearch = common.getIconTag(common.Icontype.ION, "IoIosSearch")
        return (
            <header>
                <Navbar className="navbar-expand-lg navbar-toggleable-lg box-shadow mb-3 bg-navbar">

                    <Container>
                        <NavbarBrand >
                            <img src={require('./../../assets/Logo.png')} width="50" height="40" />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2 custom-toggler" />
                        <Collapse className="d-lg-inline-flex flex-lg-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-light text-font-menubar" to="/JobConflict">Conflict<Conflict /></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light text-font-menubar" to="/report">Report</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light text-font-menubar" to="/dashboard">Dashboard</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/master" className="text-light text-font-menubar" >Master Maintenance</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="text-light text-font-menubar" >Account</NavLink>
                                </NavItem>
                                <NavItem>
                                    <button onClick={() => {
                                        this.logout()
                                    }} className="btn-transparent">
                                        <NavLink tag={Link} className="text-light text-font-menubar" to="" disabled  >Logout</NavLink>
                                    </button>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light text-font-menubar" to="" ><Name /></NavLink>
                                </NavItem>
                                
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
