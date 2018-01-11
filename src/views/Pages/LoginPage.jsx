import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import * as jwt_decode from 'jwt-decode';

import Card from 'components/Card/Card.jsx';
import Spinner from 'components/Spinner/Spinner.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardHidden: true,
            cardHidden2: true,
            cardTitle: "Login Failed",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        setTimeout(function () { this.setState({ cardHidden: false }); }.bind(this), 700);
    }

    componentWillMount() {
        localStorage.clear();
    }

    handleSubmit(event) {

        event.preventDefault();
        this.setState({ loading: true });
        fetch('https://lapr5-g6618-receipts-management.azurewebsites.net/api/authenticate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.email.value,
                password: this.password.value,
            }),
        }).then(results => {
            if (results.status !== 500)
                return results.json();
            else
                return null;
        }).then(data => {
            if (data !== null) {
                const tokenDecoded = jwt_decode(data.token);
                let userInfo = {
                    id: tokenDecoded.sub,
                    name: this.email.value,
                    email: tokenDecoded["https://lapr5.isep.pt/email"],
                    roles: tokenDecoded["https://lapr5.isep.pt/roles"]
                }

                if (userInfo.roles.includes("supplier")) {
                    localStorage.setItem("token", data.token_type + " " + data.token);
                    localStorage.setItem("user", userInfo.name);

                    this.setState({ cardHidden2: false, cardTitle: "Login Sucessful", loading: false })
                    setTimeout(function () { this.props.history.push('/dashboard') }.bind(this), 1000);
                } else {
                    this.setState({ cardHidden2: false, cardTitle: "Login Failed", loading: false })
                }
            } else {
                this.setState({ cardHidden2: false, cardTitle: "Login Failed", loading: false })
            }
        }).catch(error => {
            this.setState({ cardHidden2: false, cardTitle: "Login Failed", loading: false })
        })
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                        <form onSubmit={this.handleSubmit}>
                            <Card
                                hidden={this.state.cardHidden}
                                textCenter
                                title="Login"
                                content={
                                    <div>
                                        <FormGroup>
                                            <ControlLabel>
                                                Email address
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Enter email"
                                                type="name"
                                                inputRef={(email) => this.email = email}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>
                                                Password
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Password"
                                                type="password"
                                                inputRef={(password) => this.password = password}

                                            />
                                        </FormGroup>
                                    </div>
                                }
                                legend={
                                    <div>
                                        <Spinner show={this.state.loading} />
                                        <Button type="submit" bsStyle="info" fill wd >
                                            Login
                                        </Button>
                                    </div>
                                }
                                ftTextCenter
                            />
                            <Card
                                hidden={this.state.cardHidden2}
                                textCenter
                                content={<div className="text-center"><b>{this.state.cardTitle}</b></div>}
                            />
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default LoginPage;
