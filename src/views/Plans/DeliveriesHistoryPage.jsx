import React, { Component } from 'react';

import {
    Grid, Row, Col,
    PanelGroup, Panel,
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
// DataTables.net plugin - creates a tables with actions on it
import Table from 'components/Table/Table2.jsx';

var config = require("../../config.js");

class Insert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: {
                headerRow: ["Date"],
                dataRows: []
            },
        }
    }

    componentWillMount() {
        fetch(config.orders_url+ 'api/DeliveryPlans', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),
            },
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
     
                let rows = data.map((delivery) => {
                    return [
                        delivery.date
                    ]
                });

                console.log("DataRows", rows);

                var deliveries = {
                    headerRow: ["Date"],
                    dataRows: rows
                }

                this.setState({ dataTable: deliveries });
            });
    }

    render() {
        const defaultPanel = (
            <PanelGroup id="accordion" ref="panels" onClick={() => this.forceUpdate()}>
                <Panel
                    collapsible
                    header={
                        <div>
                            <h6>Pharmacies</h6><b className="caret"></b>
                        </div>
                    }
                    eventKey="1">
                    <ol>
                        <li>Pharmacie1</li>
                        <li>Pharmacie2</li>
                    </ol>
                </Panel>
            </PanelGroup>
        );

        const wayPointsPanel = (
            <PanelGroup id="accordion" ref="panels" onClick={() => this.forceUpdate()}>
                <Panel
                    collapsible
                    header={
                        <div>
                            <h6>Waypoints</h6><b className="caret"></b>
                        </div>
                    }
                    eventKey="2">
                    <ol>
                        <li>Waypoint1</li>
                        <li>Waypoint2</li>
                    </ol>
                </Panel>
            </PanelGroup>
        );

        const nonVisitedPanel = (
            <PanelGroup id="accordion" ref="panels" onClick={() => this.forceUpdate()}>
                <Panel
                    collapsible
                    header={
                        <div>
                            <h6>Non Visited</h6><b className="caret"></b>
                        </div>
                    }
                    eventKey="3">
                    <ol>
                        <li>Pharmacie1</li>
                    </ol>
                </Panel>
            </PanelGroup>
        );

        var table = null;

        if (this.state.dataTable.dataRows.length !== 0) {
            table = <Table title="Deliveries History" content={this.state.dataTable} />
        } else {
            table = null;
        }
        
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <h4 className="title">Deliveries History</h4>
                            <p className="category">A powerful plugin to see deliveries plans completed.</p>
                            <Card content={table} />
                            <div className="datatables">
                                <tr>

                                <td className="text-right">
                                    <Col md={4}>
                                        <Card
                                            content={defaultPanel}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Card
                                            content={wayPointsPanel}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Card
                                            content={nonVisitedPanel}
                                        />
                                    </Col>

                                </td>
                              </tr>
                            )
                           </div>                            
                        </Col>
                    </Row >
                </Grid >
            </div >
        );
    }
}

export default Insert;