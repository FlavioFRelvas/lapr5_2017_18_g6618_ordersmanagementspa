import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Form, FormGroup, FormControl, ControlLabel
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

// react component that creates a dropdown menu for selecting a date
import Datetime from 'react-datetime';

// react component that creates a dropdown menu for selection
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class ValidationForms extends Component {
    constructor(props) {
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {

            // Type
            type_text: "",
            type_textError: null,
            type_number: "",
            type_numberError: null,

            singleSelect: null,
            type_selectError: null,

            type_latitude: null,
            type_longitude: null,
            pharmacies: [],

        };
        this.regex = {
            quantity: /^\d*[1-9]\d*$/
        }
    }

    componentWillMount() {
        fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/pharmacy')
            .then(results => { 
                return results.json();
            })
            .then(data => {
                let pharmacies = data.map((pharmacy) => {
                    return {
                        value: pharmacy._id,
                        label: pharmacy.name,
                        value_lat: pharmacy.latitude,
                        value_long: pharmacy.longitude
                    }
                });

                this.setState({ pharmacies: pharmacies });
            });
    }

    handleTypeValidation() {

        this.state.type_text === "" ? this.setState({ type_textError: (<small className="text-danger">This field is required.</small>) }) : this.setState({ type_textError: null });

        this.regex.quantity.test(this.state.type_number) === false ? this.setState({ type_numberError: (<small className="text-danger">Must be a valid quantity!</small>) }) : this.setState({ type_numberError: null });

        this.state.singleSelect === null ? this.setState({ type_selectError: (<small className="text-danger">Pharmacy is required.</small>) }) : this.setState({ type_selectError: null });

        this.state.type_timeError === null ? this.setState({ type_timeError: (<small className="text-danger">Time restriction is required.</small>) }) : this.setState({ type_timeError: null });

    }
    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>

                        <Col md={12}>
                            <Form horizontal>
                                <Card
                                    title={
                                        <legend>Add Order Form</legend>
                                    }
                                    content={

                                        <div>

                                            <FormGroup controlId="formMedicine">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Item name (medicine)
                                                </Col>
                                                <Col sm={6}>
                                                    <FormControl type="text" name="type_text" onChange={(event) => {
                                                        this.setState({ type_text: event.target.value });
                                                        event.target.value === "" ? this.setState({ type_textError: (<small className="text-danger">Medicine is required.</small>) }) : this.setState({ type_textError: null });
                                                    }} />
                                                    {this.state.type_textError}
                                                </Col>
                                            </FormGroup>

                                            <FormGroup controlId="formForm">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Form (medicine)
                                                </Col>
                                                <Col sm={6}>
                                                    <FormControl type="text" name="type_text" onChange={(event) => {
                                                        this.setState({ type_text: event.target.value });
                                                        event.target.value === "" ? this.setState({ type_textError: (<small className="text-danger">Form is required.</small>) }) : this.setState({ type_textError: null });
                                                    }} />
                                                    {this.state.type_textError}
                                                </Col>
                                            </FormGroup>

                                            <FormGroup controlId="formQuantity">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Quantity
                                                </Col>
                                                <Col sm={6}>
                                                    <FormControl type="number" name="type_number" onChange={(event) => {
                                                        this.setState({ type_number: event.target.value });

                                                        this.regex.quantity.test(event.target.value) === false ? this.setState({ type_numberError: (<small className="text-danger">Quantity has to be a whole number and positive.</small>) }) : this.setState({ type_numberError: null });
                                                    }} />
                                                    {this.state.type_numberError}
                                                </Col>
                                            </FormGroup>

                                            <FormGroup controlId="formPharmacy">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Pharmacy
                                            </Col>
                                                <Col sm={6}>

                                                    <Select
                                                        placeholder="Select Pharmacy"
                                                        name="singleSelect"
                                                        value={this.state.singleSelect}
                                                        options={this.state.pharmacies}
                                                        onChange={(value) => {
                                                            this.setState({ singleSelect: value });
                                                            //FIXME -> Pharmacy Location values
                                                            this.setState({ value_latitude: "test" }),
                                                                this.setState({ value_longitude: this.state.type_longitude })
                                                        }}
                                                    />
                                                    {this.state.type_selectError}
                                                </Col>
                                            </FormGroup>
                                            <FormGroup controlId="formLocation">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Latitude
                                            </Col>
                                                <Col sm={4}>
                                                    <FormControl type="text" name="type_text" value={this.state.value_latitude} disabled />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup controlId="formLocation">

                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Longitude
                                              </Col>

                                                <Col sm={4}>
                                                    <FormControl type="text" name="type_text" value={this.state.value_longitude} disabled />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup controlId="formDate">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Date Request
                                                </Col>
                                                <Col sm={6}>
                                                    <FormGroup>
                                                        <Datetime
                                                            inputProps={{ placeholder: "Datetime Picker Here" }}
                                                            defaultValue={new Date()}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </FormGroup>

                                            <FormGroup controlId="formTimeRestriction">
                                                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                    Time Restriction
                                                </Col>
                                                <Col sm={6}>
                                                    <Datetime
                                                        dateFormat={false}
                                                        inputProps={{ placeholder: "Start" }}
                                                       defaultValue={new Date()}

                                                />
                                                </Col>
                                            </FormGroup>
                                        </div>
                                    }
                                    ftTextCenter
                                    legend={
                                        <div>
                                            <Button fill bsStyle="info" type="submit" onClick={this.handleTypeValidation.bind(this)}>Create Order</Button>
                                        </div>
                                    }

                                />
                            </Form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default ValidationForms;