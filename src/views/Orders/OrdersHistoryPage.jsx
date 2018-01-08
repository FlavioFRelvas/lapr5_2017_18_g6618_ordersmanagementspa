import React, { Component } from 'react';

import {
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Table from 'components/Table/Table.jsx';

var config= require('../../config');

class Insert extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataTable: {
                headerRow: ["Request Date", "Order Date", "Item", "Form", "Quantity", "Pharmacy", "Time Restriction", "Provider"],
                dataRows: []
            }
        }
    }

    componentWillMount(){
        
        fetch(config.orders_url+'api/orders', {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),         
            },
        }).then(results=> {
            return results.json();
        }).then(data=> {

            let rows = data.map((order) => {
                return [
                   order.requestDate,
                   order.orderDate,
                   order.itemName,
                   order.form,
                   order.quantity,
                   order.pharmacy,
                   order.timeRestriction,
                   order.provider.name
                ]
            });
            console.log("DataRows", rows);

            var orders= {
                headerRow: ["Request Date", "Order Date", "Item", "Form", "Quantity", "Pharmacy", "Time Restriction", "Provider"],
                dataRows: rows
            };
            this.setState({ dataTable: orders});
        })
    }
    

    render() {
            var table=null;

            if (this.state.dataTable.dataRows.length !== 0) {
                table = <Table title="Orders" content={this.state.dataTable} />
       
            } else {
                table = null;
            }
            return(
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
          
                            <h4 className="title">Orders History</h4>
                            <p className="category">Consult your orders and search for one item in history.</p>
                            <Card
                                content= {table}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Insert;