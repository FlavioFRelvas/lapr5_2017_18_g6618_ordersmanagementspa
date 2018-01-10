import React, { Component } from 'react';

import {
    PanelGroup, Panel,
} from 'react-bootstrap';

// jQuery plugin - used for DataTables.net
import $ from 'jquery';

import Card from 'components/Card/Card.jsx';

// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

class Table2 extends Component {
    constructor(props, state) {
        super(props);

        this.state = {
            title: this.props.title,
            dataTable: {
                headerRow: [],
                dataRows: this.props.content.dataRows
            }
        }
    }
    componentDidMount() {

        $("#datatables").DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records",
            }
        });
        // var table = $('#datatables').DataTable();
    }
    render() {
        console.log("state", this.state.dataTable.dataRows);

        return <Card
            title={this.state.title}
            content={
                <div className="fresh-datatables">
                    <table id="datatables" ref="main" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>{this.state.dataTable.headerRow[0]}</th>
                                <th>{this.state.dataTable.headerRow[1]}</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.dataTable.dataRows.map((prop, key) => {
                                return (

                                    <tr key={key}>

                                        {/*Date and Id*/}

                                        <td>{prop[0]}</td>
                                        <td>{prop[1]}</td>

                                        <td>
                                           

                                                    {/*Visited Pharmacies*/}
                                                    {prop[2].map((pharm, key2) => {

                                                        return (
                                                            <tr key2={key}>
                                                                <PanelGroup id="accordion" ref="panels" onCLick={() => this.forceUpdate()}>

                                                                    <Panel collapsible header={
                                                                        <div key={key2}>

                                                                            <h6>{pharm}</h6><b className="caret"></b>
                                                                        </div>
                                                                    }>
                                                                       
                                           {/*Visited Waypoints*/}

                                        {prop[3].map((wayp, key3) => {
                                            console.log("wayp", wayp);
                                            
                                            return (
                                                <ul key={key3}><b>Waypoints</b>
                                                  
                                                           
                                                               <li><tr>Latitude: {wayp[0]}</tr>
                                                               <tr>Longitude: {wayp[1]}</tr></li>
                                                              
                                                         
                                                        
                                                    )                                                 
                                                </ul>
                                            )
                                        })}


                                    </Panel>
                                </PanelGroup>

                            </tr>
                        );

                    })
                    }
            </td>

            {/*Non Visited*/}
            <td>

                {prop[4].map((prop, key) => {
                    
                    return (
                        <tr key={"4"}>
                            <PanelGroup id="accordion" ref="panels" onCLick={() => this.forceUpdate()}>
                                
                            <Panel collapsible header={
                                <div>

                                    <h6>Non Visited</h6><b className="caret"></b>
                                </div>
                            }>
                                <ul>
                                    <li key={key}>{prop}</li>
                                </ul>

                            </Panel>
                            
                            </PanelGroup>
                        </tr>
                    );
                
                })
                }

            </td>


        </tr>)
})
}
                        </tbody>
                    </table>
                </div>
            }
        />
    }
}

export default Table2;