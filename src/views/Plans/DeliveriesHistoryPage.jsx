import React, { Component } from 'react';

import {
    Grid, Row
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Table2 from 'components/Table/Table2.jsx';

import Spinner from 'components/Spinner/Spinner.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';

var config = require('../../config');

class Insert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: {
                headerRow: ["Date", "Id", "Visited", "Non Visited"],
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
    componentWillMount() {
        this.setState({ loading: true })
        fetch(config.orders_url + 'api/DeliveryPlans', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),
            },
<<<<<<< HEAD
        }).then(results=> {

            if(results.headers.status!=="400") return results.json();
                return [];
        }).then(data=> {
            if(data.length!==0){
            let rows = data.map((delivery) => {
=======
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

                    /*
                 var finded=pharmacies.map((find)=>{
                     return waypoints.filter( (item) => item[1]===find[2]).collect(item[0]);
                   
                 })
    
               //  waypoint.filter( (item,index) => index===pharmacies[i].waypoint)
    
               */
                    console.log("finded", finded);
>>>>>>> 51a92cc7907bca48f140c8fc1b38648f29d9b668

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

                this.setState({ dataTable: deliveries, loading: false });
            }
        }).catch(error => {
            this.setState({ loading: false, alertMessage: "Error getting pending orders." });
            this.failAlert();
        });

<<<<<<< HEAD
                       if(waypoints[i][0]===pharmacies[j][1] &&
                              waypoints[i][1]=== pharmacies[j][2]){
                                finded.push(waypoints[i][2]);
                        }
                    }
                }

                   /*
                var finded=pharmacies.map((find)=>{
                    return waypoints.filter( (item) => item[1]===find[2]).collect(item[0]);
                  
                })

              //  waypoint.filter( (item,index) => index===pharmacies[i].waypoint)

              */
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

            var deliveries= {
                headerRow: ["Date", "Lists"],
                dataRows: rows
            };
            
            this.setState({dataTable: deliveries});
        }
    })}
=======
    }

>>>>>>> 51a92cc7907bca48f140c8fc1b38648f29d9b668

    render() {
        var table = null;

<<<<<<< HEAD
            if (this.state.dataTable.dataRows.length !== 0) {
                table = <Table2 title="Deliveries" content={this.state.dataTable} />
       
            } else {
                table = "Please authenticate to access information.";
            }
            return(
=======
        if (this.state.dataTable.dataRows.length !== 0) {
            table = <Table2 title="Deliveries" content={this.state.dataTable} />

        } else {
            table = <Spinner show={this.state.loading} />;
        }
        return (
>>>>>>> 51a92cc7907bca48f140c8fc1b38648f29d9b668
            <div className="main-content">
            {this.state.alert}
                <Grid fluid>
                    <Row>

                        <h4 className="title">Deliveries History</h4>
                        <p className="category">A powerful plugin to consult deliveries plans completed.</p>
                        <Card
                            content={table}
                        />

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Insert;