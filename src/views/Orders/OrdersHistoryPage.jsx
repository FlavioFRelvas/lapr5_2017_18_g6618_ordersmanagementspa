import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net
import $ from 'jquery';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');




const dataTable = {
    headerRow: [ 'Order Date', 'Request Date', 'Item', 'Form', 'Quantity', 'Provider', 'Pharmacy', 'Time Restriction' ],
    footerRow: [ 'Order Date', 'Request Date', 'Item', 'Form', 'Quantity', 'Provider', 'Pharmacy', 'Time Restriction'],
    dataRows: [
        ['Order Date1', 'Request Date', 'Item', 'Form', 'Quantity', 'Provider', 'Pharmacy', 'Time Restriction' ],
          ]
};

class DataTables extends Component{
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
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <h4 className="title">Orders History</h4>
                            <p className="category">Consult your orders and search for one item in history.</p>
                            <Card
                                title="Table"
                                content={
                                    <div className="fresh-datatables">
                                        <table id="datatables" ref="main" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{width:"100%"}}>
                                            <thead>
                                                <tr>
                                                    <th>{ dataTable.headerRow[0] }</th>
                                                    <th>{ dataTable.headerRow[1] }</th>
                                                    <th>{ dataTable.headerRow[2] }</th>
                                                    <th>{ dataTable.headerRow[3] }</th>
                                                    <th>{ dataTable.headerRow[4] }</th>
                                                    <th>{ dataTable.headerRow[5] }</th>
                                                    <th>{ dataTable.headerRow[6] }</th>
                                                    <th>{ dataTable.headerRow[7] }</th>
                                                    <th className="disabled-sorting text-right">{ dataTable.headerRow[8] }</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>{ dataTable.footerRow[0] }</th>
                                                    <th>{ dataTable.footerRow[1] }</th>
                                                    <th>{ dataTable.footerRow[2] }</th>
                                                    <th>{ dataTable.footerRow[3] }</th>
                                                    <th>{ dataTable.footerRow[4] }</th>
                                                    <th>{ dataTable.footerRow[5] }</th>
                                                    <th>{ dataTable.footerRow[6] }</th>
                                                    <th>{ dataTable.footerRow[7] }</th>
                                                    <th className="text-right">{ dataTable.footerRow[8] }</th>
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
                                                                    <a className="btn btn-simple btn-info btn-icon like">Delivery Plan <i className="fa fa-photo"></i></a>
                                                                    <a className="btn btn-simple btn-warning btn-icon edit"><i className="fa fa-edit"></i></a>
                                                                    <a className="btn btn-simple btn-danger btn-icon remove"><i className="fa fa-times"></i></a>
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
