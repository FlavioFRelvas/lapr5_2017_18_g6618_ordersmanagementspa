import React, { Component } from 'react';
import {
    Navbar, Nav, NavItem, 
    FormGroup, FormControl, InputGroup
} from 'react-bootstrap';


class HeaderLinks extends Component{
    render(){
        return(
            <div>
                <Navbar.Form pullLeft className="navbar-search-form">
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon><i className="fa fa-search"></i></InputGroup.Addon>
                            <FormControl type="text" placeholder="Search..." />
                        </InputGroup>
                    </FormGroup>
                </Navbar.Form>

                <Nav pullRight>
                    <NavItem eventKey={3} href="/dashboard">
                        <i className="fa fa-line-chart"></i>
                        <p>Dashboards</p>
                    </NavItem>

                    <NavItem eventKey={3} href="#/pending-orders">
                        <i className="pe-7s-gift"></i>
                        <p>Pending Orders</p>
                    </NavItem>

                    <NavItem eventKey={3} href="#/orders-history">
                        <i className="pe-7s-car"></i>
                        <p>Orders</p>
                    </NavItem>

                 
                    <NavItem eventKey={3} href="#/deliveries-history">
                        <i className="pe-7s-arc"></i>
                        <p>Deliveries</p>
                    </NavItem>

                    <NavItem eventKey={3} href="#/pages/login-page">
                        <i className="pe-7s-close-circle"></i>
                        <p>Log Out</p>
                    </NavItem>
                 
                   
                </Nav>
            </div>
        );
    }
}
export default HeaderLinks;
