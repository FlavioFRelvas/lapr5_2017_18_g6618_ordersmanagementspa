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
import Select from 'react-select';

var config = require('../../config');

function compare(a, b) {
    if (a.time < b.time)
        return -1;
    if (a.time > b.time)
        return 1;
    return 0;
}

class DeliveryPlans extends Component {
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
            singleSelect: null,
            algorithms: [{ value: "gatw", label: "gatw" }, { value: "ga", label: "ga" }]
        }
        this.a = null;
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
    successAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    success={true}
                    style={{ display: "block", marginTop: "-100px" }}
                    title="True!"
                    onConfirm={() => setTimeout(window.location.reload(), 30000)}
                    onCancel={() => setTimeout(window.location.reload(), 30000)}
                    confirmBtnBsStyle="info"
                >
                    {this.state.alertMessage}
                </SweetAlert >
            )
        });
    }
    htmlAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    type="custom"
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Select algorithm"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="danger"
                    confirmBtnText="Cancel"
                    disabled
                >
                    <Select
                        placeholder="Select algorithm"
                        name="singleSelect"
                        value={null}
                        options={this.state.algorithms}
                        onChange={(value) => { this.state.singleSelect = value, this.recalculate() }}
                    />
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
    recalculate() {
        this.hideAlert();
        if (this.state.singleSelect !== null) {
            alert(this.state.singleSelect.value);
            this.setState({ recalculating: true, loading: true });
            fetch(config.orders_url + 'api/deliveryPlans/generate/' + this.state.singleSelect.value + '?recalculate=true', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem("token"),
                },
            }).then(results => {
                if (results.status === 200) {
                    return results.json()
                } else {
                    this.setState({ alertMessage: results.status + " " + results.statusText });
                    this.failAlert();
                    setTimeout(window.location.reload(), 30000);
                }

            }).then(response => {
                this.setState({ alertMessage: response.message });
                this.successAlert();
            });
        }
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
                    this.setState({ loading: false, alertMessage: "No delivery plan created for today. Press \"Recalculate\" to generate one." });
                    this.failAlert();
                }
            } else {
                this.setState({ loading: false, alertMessage: "Error getting delivery plan." });
                this.failAlert();
            }
        }).catch(() => {
            this.setState({ loading: false, alertMessage: "Error getting delivery plan." });
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
                                        {this.state.recalculating ? <div className="text-center"> Recalculating... </div> : null}
                                        {this.state.loading ? < Spinner show={this.state.loading} /> : (
                                            <form id="form1" onSubmit={this.htmlAlert.bind(this)}>
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
                                        )}
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

export default DeliveryPlans;
