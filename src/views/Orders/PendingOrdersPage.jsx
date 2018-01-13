import React, { Component } from 'react';

import {
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Table from 'components/Table/Table.jsx';

import Spinner from 'components/Spinner/Spinner.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';

var config = require('../../config');

class Insert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: {
                headerRow: ["Request Date", "Order Date", "Item", "Form", "Quantity", "Pharmacy", "Time Restriction", "Provider"],
                dataRows: []
            },
            loading: false,
            alert: null,
            alertMessage: "This operation was successfull",

        };

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
    componentWillMount() {
        this.setState({ loading: true })

        fetch(config.orders_url + 'api/orders', {
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
                console.log(data);
                let rows = data.map((order) => {

                    var input = new Date(order.requestDate).toISOString().substring(0, 10);
                    var today = new Date().toISOString().substring(0, 10);
                    if (input === today) {

                        return [
                            new Date(order.requestDate).toLocaleString(),
                            new Date(order.orderDate).toLocaleString(),
                            order.itemName,
                            order.form,
                            order.quantity,
                            order.pharmacy,
                            order.timeRestriction,
                            order.provider.name
                        ]
                    } else {
                        this.setState({ loading: false, alertMessage: "No pending orders." });
                        this.failAlert();
                        return [];
                    }
                });

                var orders = {
                    headerRow: ["Request Date", "Order Date", "Item", "Form", "Quantity", "Pharmacy", "Time Restriction", "Provider"],
                    dataRows: rows.filter((item, index) => item.length !== 0)
                };

                this.setState({ dataTable: orders, loading: false });
            } else {
                this.setState({ loading: false, alertMessage: "Error getting pending orders." });
                this.failAlert();
            }
        }).catch(error => {
            this.setState({ loading: false, alertMessage: "Error getting pending orders." });
            this.failAlert();
        });

    }


    render() {
        var table = null;

        if (this.state.dataTable.dataRows.length !== 0) {
            table = <Table title="Orders" content={this.state.dataTable} />

        } else {
            table = <Spinner show={this.state.loading} />;
        }
        return (
            <div className="main-content">
                {this.state.alert}
                <Grid fluid>
                    <Row>
                        <Col md={12}>

                            <h4 className="title">Pending Orders</h4>
                            <p className="category">Pendings orders waiting for delivery plan.</p>
                            <Card
                                content={table}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Insert;