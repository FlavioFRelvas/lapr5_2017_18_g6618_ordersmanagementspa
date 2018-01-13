import React, { Component } from 'react';
import {
    Nav, NavItem
} from 'react-bootstrap';


class HeaderLinks extends Component {
    render() {
        return (
            <div>
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
