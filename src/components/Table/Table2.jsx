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

                            {
            
                                this.state.dataTable.dataRows.map((prop, key) => {
                                    return (

                                        <tr key={key}>

                                            {prop.map((prop, key) => {

                                              
                                                return (

                                                    <td key={key}>{prop}</td>

                                                );
                                            })
                                            }

                                            <td>
                                                <tr>
                                             
                                                        <PanelGroup id="accordion" ref="panels" onCLick={() => this.forceUpdate()}>
                                                            <Panel collapsible header={
                                                                <div>
                                                                    <h6>Pharmacie1</h6><b className="caret"></b>
                                                                </div>
                                                            }>
                                                                <ol>
                                                                    <li>Waypoint1</li>
                                                                    <li>Waypoint2</li>
                                                                </ol>

                                                            </Panel>
                                                        </PanelGroup>
                                             
                                                </tr>
                                                <tr>

                                                    <PanelGroup id="accordion" ref="panels" onCLick={() => this.forceUpdate()}>
                                                        <Panel collapsible header={
                                                            <div>
                                                                <h6>Pharmacie2</h6><b className="caret"></b>
                                                            </div>
                                                        }>
                                                            <ol>
                                                                <li>Waypoint3</li>
                                                                <li>Waypoint4</li>
                                                            </ol>
                                                        </Panel>
                                                    </PanelGroup>
                                                </tr>

                                                <tr>

                                                    <PanelGroup id="accordion" ref="panels" onCLick={() => this.forceUpdate()}>
                                                        <Panel collapsible header={
                                                            <div>
                                                                <h6>Non Visited</h6><b className="caret"></b>
                                                            </div>
                                                        }>
                                                            <ol>
                                                                <li>Pharmacy3</li>
                                                                <li>4</li>
                                                            </ol>
                                                        </Panel>
                                                    </PanelGroup>
                                                </tr>
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