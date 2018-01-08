import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net
import $ from 'jquery';
import {
    Grid, Row, Col,
    PanelGroup, Panel,
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');




const dataTable = {
    headerRow: [ 'Date' ],
    footerRow: [ 'Date' ],
    dataRows: [
        ['Date1'],
        ['Date2'],
        ['Date3']
    ]
};

class DataTables extends Component{

//PANEL- Pharmacies
    componentDidUpdate(e){
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this._reactInternalInstance._currentElement._owner._instance._reactInternalInstance._currentElement._owner._instance.componentDidUpdate(e);
        }
    }
    isMac(){
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    //TABLE
    componentDidMount() {
        // $(this.refs.main).DataTable({
        //     dom: '<"data-table-wrapper"t>',
        //     data: this.props.names,
        //     columns,
        //     ordering: false
        // });
        $("#datatables").DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records",
            }
        });
        var table = $('#datatables').DataTable();

        // Edit record
        table.on( 'click', '.edit', function () {
            var $tr = $(this).closest('tr');

            var data = table.row($tr).data();
            alert( 'You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.' );
        } );

        // Delete a record
        table.on( 'click', '.remove', function (e) {
            var $tr = $(this).closest('tr');
            table.row($tr).remove().draw();
            e.preventDefault();
        } );

        //Like record
        table.on( 'click', '.like', function () {
            alert('You clicked on Like button');
        });
    }
    componentWillUnmount(){
        $('.data-table-wrapper')
        .find('table')
        .DataTable()
        .destroy(true);
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        const defaultPanel = (
            <PanelGroup id="accordion" ref="panels" onClick={() => this.forceUpdate()}>
                <Panel
                    collapsible
                    header={
                        <div>
                        <h6>Pharmacies</h6><b className="caret"></b>
                        </div>
                    }
                    eventKey="1">
                        <ol>  
                            <li>Pharmacie1</li>
                            <li>Pharmacie2</li>  
                        </ol>
                </Panel>
            </PanelGroup>
        );

        const wayPointsPanel = (
            <PanelGroup id="accordion" ref="panels" onClick={() => this.forceUpdate()}>
                <Panel
                    collapsible
                    header={
                        <div>
                        <h6>Waypoints</h6><b className="caret"></b>
                        </div>
                    }
                    eventKey="2">
                        <ol>  
                            <li>Waypoint1</li>
                            <li>Waypoint2</li>  
                        </ol>
                </Panel>
            </PanelGroup>
        );

        const nonVisitedPanel = (
            <PanelGroup id="accordion" ref="panels" onClick={() => this.forceUpdate()}>
                <Panel
                    collapsible
                    header={
                        <div>
                        <h6>Non Visited</h6><b className="caret"></b>
                        </div>
                    }
                    eventKey="3">
                        <ol>  
                            <li>Pharmacie1</li>  
                        </ol>
                </Panel>
            </PanelGroup>
        );

        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <h4 className="title">Deliveries History</h4>
                            <p className="category">A powerful jQuery plugin to see deliveries plans completed.</p>
                            <Card
                                title="Table"
                                content={
                                    <div className="fresh-datatables">
                                        <table id="datatables" ref="main" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{width:"100%"}}>
                                            <thead>
                                                <tr>
                                                    <th>{ dataTable.headerRow[0] }</th>

                                                    <th className="disabled-sorting text-right">{ dataTable.headerRow[1] }</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>{ dataTable.footerRow[0] }</th>
                                                    <th className="text-right">{ dataTable.footerRow[1] }</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                {
                                                    dataTable.dataRows.map((prop,key) => {
                                                        return (
                                                            <tr key={key}>
                                                                {
                                                                    prop.map((prop,key)=> {
                                                                        return (
                                                                            <td  key={key}>{prop}</td>
                                                                        );
                                                                    })
                                                                }
                                                                <td className="text-right">
                                                                <Col md={4}>
                                                                    <Card
                                                                        content={defaultPanel}
                                                                    />
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Card
                                                                        content={wayPointsPanel}
                                                                    />
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Card
                                                                        content={nonVisitedPanel}
                                                                    />
                                                                </Col>
                                                                  
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default DataTables;
