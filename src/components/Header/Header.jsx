import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

// links that appear in navbar - they are separated from this component (navbar) so that we can redner them on responsive in sidebar as well

import HeaderLinks from './HeaderLinks.jsx'

// we import here the routes for dashboard pages (links that appear in sidebar) to set navbar's name

import dashRoutes from 'routes/dash.jsx';

class Header extends Component{
    constructor(props){
        super(props);
        this.handleMinimizeSidebar = this.handleMinimizeSidebar.bind(this);
        this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
        this.state={
            authenticated: false
        }
        this.login=this.login.bind(this);
        this.logout=this.logout.bind(this);
    }

    login() {
        // We can call the show method from Auth0Lock,
        // which is passed down as a prop, to allow
        // the user to log in
        this.props.lock.show((err, profile, token) => {
            if (err) {
                alert(err);
                return;
            }
            this.setState({ authenticated: true });
        });
    }
    logout() {
        // AuthActions.logUserOut();
        this.setState({ authenticated: false });
    }

    makeBrand(){
        var name;
        dashRoutes.map((prop,key) => {
            if(prop.collapse){
                 prop.views.map((prop,key) => {
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                    }
                    return null;
                })
            } else {
                if(prop.redirect){
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                    }
                }else{
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                    }
                }
            }
            return null;
        })
        return name;
    }
    // function that makes the sidebar from normal to mini and vice-versa
    handleMinimizeSidebar(){
        document.body.classList.toggle('sidebar-mini');
    }
    // function for responsive that hides/shows the sidebar
    mobileSidebarToggle(e){
        document.documentElement.classList.toggle('nav-open');
    }
    render(){
        return (
            <Navbar fluid>
                <div className="navbar-minimize">
                    <button id="minimizeSidebar" className="btn btn-default btn-fill btn-round btn-icon" onClick={this.handleMinimizeSidebar}>
                        <i className="fa fa-ellipsis-v visible-on-sidebar-regular"></i>
                        <i className="fa fa-navicon visible-on-sidebar-mini"></i>
                    </button>
                </div>
                <Navbar.Header>
                    <Navbar.Brand>
                        {/* Here we create navbar brand, based on route name */}
                        <a href="#di">{this.makeBrand()}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle onClick={this.mobileSidebarToggle} />
                </Navbar.Header>

                    {/* Here we import the links that appear in navbar */}
                    { window.innerWidth > 992 ? (<Navbar.Collapse><HeaderLinks /></Navbar.Collapse>):null }

            </Navbar>
        );
    }
}

export default Header;
