import React, { Component } from 'react';

import {
    Grid, Row, Col, Label, Form, FormGroup, ControlLabel, FormControl,
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Table from 'components/Table/Table3.jsx';

import Spinner from 'components/Spinner/Spinner.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import Pharmacy from 'components/Pharmacy/Pharmacy';
import ReactScrollableList from 'react-scrollable-list'

var config = require('../../config');

var mock = {
    "Distance": 61755,
    "VisitedPharmacies": [
        {
            "name": "warehouse",
            "waypoint": {
                "latitude": 41.2343045,
                "longitude": -8.6200599,
            },
            "time": 491,
            "orderedWaypoints": [
                {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                }, {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                }, {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                }, {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                }, {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                }, {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                }, {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                }, {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                }, {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                }, {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                }, {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                }, {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                }, {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                }, {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                }
            ]
        }, {
            "name": "warehouse",
            "waypoint": {
                "latitude": 41.2343045,
                "longitude": -8.6200599,
            }, "orderedWaypoints": [
                {
                    "latitude": 41.2343045,
                    "longitude": -8.6200599
                },]
        }, {
            "name": "warehouse",
            "waypoint": {
                "latitude": 41.2343045,
                "longitude": -8.6200599,
            },
            "time": 480,
        }],
    "NonVisited": [
        {
            "name": "warehouse",
            "waypoint": {
                "latitude": 41.2343045,
                "longitude": -8.6200599,
            },
        }
    ],
};

function compare(a, b) {
    if (a.time < b.time)
        return -1;
    if (a.time > b.time)
        return 1;
    return 0;
}

class Insert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: {
                headerRow: ["Visited", "Non Visited", "Distance"],
                dataRows: []
            },
            loading: false,
            alert: null,
            alertMessage: "This operation was successfull",
        }
        this.hideAlert = this.hideAlert.bind(this);
    }
    hideAlert() {
        this.setState({
            alert: null
        });
        //setTimeout(window.location.reload(), 10000);

    }
    failAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    success={false}
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Failed!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    {this.state.alertMessage}
                </SweetAlert>
            )
        });
    }
    comparePharmacies(a, b) {
        if (a.time < b.time)
            return -1;
        if (a.time > b.time)
            return 1;
        return 0;
    }

    comparePlans(a, b) {
        if (a.date < b.date)
            return -1;
        if (a.date > b.date)
            return 1;
        return 0;
    }

    componentWillMount() {
        this.setState({ loading: true });
        fetch(config.orders_url + 'api/DeliveryPlans/detailed', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),
            },
        }).then(results => {
            if (results !== null)
                return results.json();
            else return null;
        }).then(data => {
            if (data !== null) {
                if (data.length !== 0) {
                    //console.log(data);
                    let plans = data.map((deliveryPlan) => {

                        let orderedPharmacies = deliveryPlan.VisitedPharmacies.sort(this.comparePharmacies);

                        console.log("MAPPING");
                        let pharmacies = orderedPharmacies.map((pharmacy) => {
                            //console.log("MAPPING VISITED", pharmacy);
                            return (< Pharmacy key={pharmacy.id} pharmacy={pharmacy} />);
                        });

                        let nonVisited = deliveryPlan.NonVisitedPharmacies.map((nonVisited) => {
                            //console.log("MAPPING NON-VISITED", nonVisited)
                            return (nonVisited ? <Pharmacy key={nonVisited.id} pharmacy={nonVisited} /> : null);
                        });

                        return {
                            visited: pharmacies,
                            nonVisited: nonVisited,
                            distance: (deliveryPlan.TotalDistance / 1000 + " km"),
                            date: deliveryPlan.date,
                        }
                    })
                    let orderedPlans = plans.sort(this.comparePlans);
                    let plan = orderedPlans[orderedPlans.length - 1];
                    console.log(plan.date);
                    this.setState({
                        visited: plan.visited,
                        nonVisited: plan.nonVisited,
                        distance: plan.distance,
                        loading: false,
                    })
                }
                else {
                    this.setState({ loading: false, alertMessage: "No pending orders." });
                    this.failAlert();
                }
            } else {
                this.setState({ loading: false, alertMessage: "Error getting pending orders." });
                this.failAlert();
            }
        }).catch(() => {
            this.setState({ loading: false, alertMessage: "Error getting pending orders." });
            this.failAlert();
        });
        /*{
            let pharmacies = mock.VisitedPharmacies.map((pharmacy, key) => {
                return (< Pharmacy key={key} pharmacy={pharmacy} />);
            });
            //onsole.log("Pharmacies", pharmacies);
            let nonVisited = mock.NonVisited.map((nonVisited, key) => {
                return <Pharmacy key={key} pharmacy={nonVisited} />
            });
            //console.log("NonVisited", nonVisited);

            let Rows = [[pharmacies, nonVisited, (<b>{(mock.Distance / 1000 + " km")}</b>)]];

            //console.log(Rows);
            this.setState({
                visited: pharmacies,
                nonVisited: nonVisited,
                distance: (mock.Distance / 1000 + " km"),
            })
        }*/

    }

    render() {
        return (
            <div className="main-content">
                {this.state.alert}
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Delivery plan</legend>}
                                content={
                                    <div className="content">
                                        <Spinner show={this.state.loading} />
                                        <form>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Distance:
                                            </ControlLabel>
                                                <FormControl
                                                    disabled
                                                    placeholder={this.state.distance}
                                                    type="text"
                                                    ref={this.state.distance}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Visited pharmacies:
                                                </ControlLabel>
                                                <Card
                                                    content={this.state.visited}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Non visited pharmacies:
                                                </ControlLabel>
                                                <Card
                                                    content={this.state.nonVisited}
                                                />
                                            </FormGroup>
                                        </form>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Insert;

/*
 * var table = null;

        if (this.state.dataTable.dataRows.length !== 0) {
                        table = <Table title={<legend>Delivery plan</legend>} content={this.state.dataTable} />

                    } else {
                        table = <Spinner show={this.state.loading} />;
                    }
        return (
            <div className="main-content">
                        {this.state.alert}
                        <Grid fluid>
                            <Row>
                                {table}
                            </Row>
                        </Grid>
                    </div>
                    );
 *
        fetch(config.orders_url + 'api/DeliveryPlans/detailed', {
                        method: 'GET',
            headers: {
                        Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),
            },
        }).then(results => {
            if (results !== null)
                return results.json();
        }).then(data => {
            if (data !== null) {
                        let rows = data.map((delivery) => {

                        let pharmacies = delivery.VisitedPharmacies.map((pharmacy) => {
                        return [
                            pharmacy.name,
                            pharmacy.latitude,
                            pharmacy.longitude
                        ]
                    });

                    let waypoints = delivery.OrderedWaypoints.map((way) => {
                        return [
                            way.latitude,
                            way.longitude,
                            way.id
                        ]
                    });

                    let nonvisited = delivery.NonVisitedPharmacies.map((non) => {
                        return [
                            non.name
                        ]
                    });


                    //------------ WAYPOINTS BETWEEN PHARMACIES --------

                    var i, j, finded = [];

                    for (i = 0; i < waypoints.length; i++) {
                        for (j = 0; j < pharmacies.length; j++) {

                            if (waypoints[i][0] === pharmacies[j][1] &&
                                waypoints[i][1] === pharmacies[j][2]) {
                        finded.push(waypoints[i][2]);
                    }
                        }
                    }

                    */ /*
var finded = pharmacies.map((find) => {
return waypoints.filter((item) => item[1] === find[2]).collect(item[0]);

})

//  waypoint.filter( (item,index) => index===pharmacies[i].waypoint)

*/
        /**
                console.log("finded", finded);

                //-----------------------------------------------------

                return [
                    delivery.id,
                    delivery.date,
                    pharmacies,
                    waypoints,
                    nonvisited,
                    finded
                ]
            });

                        var deliveries = {
                        headerRow: ["Date", "Lists"],
            dataRows: rows
        };

        this.setState({dataTable: deliveries, loading: false });
                    }
                }).catch (error => {
                        this.setState({ loading: false, alertMessage: "Error getting pending orders." });
                    this.failAlert();
        });
                **/