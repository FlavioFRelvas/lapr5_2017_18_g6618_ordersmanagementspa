import React, { Component } from 'react';

import {
    Grid, Row
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Table2 from 'components/Table/Table2.jsx';

var config= require('../../config');

class Insert extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataTable: {
                headerRow: ["Date", "Id", "Visited", "Non Visited"],
                dataRows: []
            }
        }
    }

    componentWillMount(){
        
        fetch(config.orders_url+'api/DeliveryPlans', {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),         
            },
        }).then(results=> {
            return results.json();
        }).then(data=> {

            let rows = data.map((delivery) => {

                let pharmacies= delivery.VisitedPharmacies.map((pharmacy) => {
                    return [
                        pharmacy.name,
                        pharmacy.latitude,
                        pharmacy.longitude
                    ]
                });

                let waypoints= delivery.OrderedWaypoints.map((way) =>{
                    return [
                        way.latitude,
                        way.longitude,
                        way.id
                    ]
                });

                let nonvisited= delivery.NonVisitedPharmacies.map((non) =>{
                    return [
                        non.name
                    ]
                });


                //------------ WAYPOINTS BETWEEN PHARMACIES --------

                var i, j, finded=[];
           
                for(i=0;i<waypoints.length;i++){
                    for(j=0; j<pharmacies.length; j++){

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
        })
    }
    

    render() {
            var table=null;

            if (this.state.dataTable.dataRows.length !== 0) {
                table = <Table2 title="Deliveries" content={this.state.dataTable} />
       
            } else {
                table = null;
            }
            return(
            <div className="main-content">
                <Grid fluid>
                    <Row>
           
                            <h4 className="title">Deliveries History</h4>
                            <p className="category">A powerful plugin to consult deliveries plans completed.</p>
                            <Card
                                content= {table}
                            />
         
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Insert;