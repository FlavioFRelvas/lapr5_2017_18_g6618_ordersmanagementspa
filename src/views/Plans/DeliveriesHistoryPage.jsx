import React, { Component } from 'react';

import {
    Grid, Row, Col, Label, Form, FormGroup, ControlLabel, FormControl,
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Table from 'components/Table/Table3.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Spinner from 'components/Spinner/Spinner.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import Pharmacy from 'components/Pharmacy/Pharmacy';
import ReactScrollableList from 'react-scrollable-list'

var config = require('../../config');

function compare(a, b) {
    if (a.time < b.time)
        return -1;
    if (a.time > b.time)
        return 1;
    return 0;
}

class Deliveries extends Component {
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

    handleRecalculate() {
        console.log("Recalculate");
        alert("Not Implemented");
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
                                        <form onSubmit={this.handleRecalculate.bind(this)}>
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

                                            <Button type="submit" bsStyle="info" fill wd > Recalculate </Button>
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

export default Deliveries;
