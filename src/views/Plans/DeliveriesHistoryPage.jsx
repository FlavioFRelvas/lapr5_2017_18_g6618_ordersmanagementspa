import React, { Component } from 'react';

import {
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Table2 from 'components/Table/Table2.jsx';

var config= require('../../config');

class Insert extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataTable: {
                headerRow: ["Date"],
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
                return [
                   delivery.date
                ]
            });
            console.log("DataRows", rows);

            var deliveries= {
                headerRow: ["Date"],
                dataRows: rows
            };
            this.setState({ dataTable: deliveries});
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