import React, { Component } from 'react';

// jQuery plugin - used for DataTables.net
import $ from 'jquery';

import Card from 'components/Card/Card.jsx';

// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

class Table2 extends Component {
    constructor(props, state) {
        super(props);
        console.log("props", this.props.content);
        this.state = {
            title: this.props.title,
            dataTable: {
                headerRow: ["Date"],
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
                                        </tr>
                                    )
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