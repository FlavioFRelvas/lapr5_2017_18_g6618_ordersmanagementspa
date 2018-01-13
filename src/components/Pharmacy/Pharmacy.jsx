import React, { Component } from 'react';

import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, HelpBlock, Form, InputGroup, PanelGroup, Panel,
} from 'react-bootstrap';


class Pharmacy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.pharmacy.name,
            latitude: this.props.pharmacy.waypoint.latitude,
            longitude: this.props.pharmacy.waypoint.longitude,
            time: this.props.pharmacy.time,
            waypoints: this.props.pharmacy.orderedWaypoints,
        }
        //console.log("Pharmacy State", this.state);
    }
    render() {
        const pharmacy = (
            <PanelGroup id="acordion" ref="panels" onClick={() => this.forceUpdate()}>
                <Panel
                    collapsible={(this.state.waypoints.length !== 0) ? true : false}
                    header={
                        <div>
                            <Row>
                                <Col md={6}>
                                    {this.state.name}
                                </Col>
                                <Col md={6}>
                                    {this.state.time ? <span> Arrival : {Math.floor(Math.trunc(this.state.time) / 60)}: {("0" + (Math.trunc(this.state.time) % 60)).slice(-2)} h </span> : null}
                                    {(this.state.waypoints.length !== 0) ? <b className="caret"></b> : null}
                                </Col>
                            </Row>
                        </div>

                    }
                    eventKey="1">
                    {(this.state.waypoints.length !== 0) ? <ul className="list-unstyled" style={{ height: "100px", overflow: "auto" }}>
                        {this.state.waypoints.map((waypoint, key) => {
                            return (
                                <li key={waypoint.id}>
                                    <b> Waypoint Latitude: </b> {waypoint.latitude}<b> Longitude: </b> {waypoint.longitude}
                                </li>
                            );
                        })}
                    </ul> : null}
                </Panel>
            </PanelGroup >
        );

        return (
            <div >
                {pharmacy}
            </div>
        );
    };
}

export default Pharmacy;

/*
  id: this.props.id,
            distance: this.props.distance,
            pharmacies: this.props.pharmacies,
            nonVisited: this.props.nonVisited 
            */