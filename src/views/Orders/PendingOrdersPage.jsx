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

                var input= new Date(order.requestDate).toISOString().substring(0,10);
                var today=new Date().toISOString().substring(0,10);
                if(input=== today){

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
                }else{
                    return [];
                }
            });

            var orders= {
                headerRow: ["Request Date", "Order Date", "Item", "Form", "Quantity", "Pharmacy", "Time Restriction", "Provider"],
                dataRows: rows.filter( (item,index) => item.length!==0)
            };

            this.setState({ dataTable: orders});
        })
    }
    

    render() {
            var table=null;

            if (this.state.dataTable.dataRows=== undefined||this.state.dataTable.dataRows ===null ||this.state.dataTable.dataRows=== undefined || this.state.dataTable.dataRows.length !== 0) {
                table = <Table title="Orders" content={this.state.dataTable} />
       
            } else {
                table = [];
            }
            return(
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
          
                            <h4 className="title">Pending Orders</h4>
                            <p className="category">Pendings orders waiting for delivery plan.</p>
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