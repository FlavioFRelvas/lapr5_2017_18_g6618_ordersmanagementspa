import React, { Component } from 'react';
// react component used to create charts
import ChartistGraph from 'react-chartist';
import Spinner from 'components/Spinner/Spinner.jsx';
import { getOrdersHistoryInfo, getPendingOrdersInfo } from '../../components/Information/Information';


import Card from 'components/Card/Card.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';


var pendingOrdersData;
var ordersData;
var ordersByDate;
var options = {

};

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            loading1: false,
            loading2: false,
            loading3: false,
            alert: null,
            alertMessage: null,
        };
        this.hideAlert = this.hideAlert.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize(e) {
        this.setState({
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        })
    };
    hideAlert() {
        this.setState({
            alert: null
        });
        //setTimeout(window.location.reload(), 2000);
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
        this.setState({ loading1: true })

        getOrdersHistoryInfo().then((orders_info) => {
            if (orders_info !== null) {
                var map = [];
                var series1 = [];

                var data = {
                    labels: [],
                    series: []
                };

                for (let i = 0; i < orders_info.length; i++) {

                    if (data.labels.indexOf(orders_info[i][5]) === -1) {
                        data.labels.push(orders_info[i][5]);
                        map[orders_info[i][5]] = orders_info[i][4];
                    }
                    else {
                        map[orders_info[i][5]] += orders_info[i][4];
                    }


                }
                for (let i = 0; i < data.labels.length; i++) {
                    series1.push(map[data.labels[i]]);
                }

                data.series.push(series1);




                ordersData = data;


                this.setState({ ordersData, loading1: false });
            } else {
                this.setState({ loading1: false, alertMessage: "Error loading orders history." });
                this.failAlert();
            }
        });

        this.setState({ loading2: true })
        getOrdersHistoryInfo().then((orders_info) => {
            if (orders_info !== null) {
                var map = [];
                var series1 = [];

                var data = {
                    labels: [],
                    series: []
                };

                for (let i = 0; i < orders_info.length; i++) {
                    if (orders_info[i].length > 0) {
                        var formatedDate = orders_info[i][0].split("T")[0];
                        if (data.labels.indexOf(formatedDate) === -1) {
                            data.labels.push(formatedDate);
                            map[formatedDate] = orders_info[i][4];
                        }
                        else {
                            map[formatedDate] += orders_info[i][4];
                        }
                    }

                }
                for (let i = 0; i < data.labels.length; i++) {
                    series1.push(map[data.labels[i]]);
                }

                data.series.push(series1);

                ordersByDate = data;


                this.setState({ ordersByDate, loading2: false });
            } else {
                this.setState({ loading2: false, alertMessage: "Error loading orders history." });
                this.failAlert();
            }
        });

        this.setState({ loading3: true })
        getPendingOrdersInfo().then((orders_info) => {
            if (orders_info !== null) {
                console.log(orders_info);
                var map = [];
                var series1 = [];

                var data = {
                    labels: [],
                    series: []
                };

                for (let i = 0; i < orders_info.length; i++) {
                    if (orders_info[i].length > 0) {
                        console.log(orders_info[i]);
                        if (data.labels.indexOf(orders_info[i][2]) === -1) {
                            data.labels.push(orders_info[i][2]);
                            map[orders_info[i][2]] = orders_info[i][4];
                        }
                        else {
                            map[orders_info[i][2]] += orders_info[i][4];
                        }
                    }

                }
                for (let i = 0; i < data.labels.length; i++) {
                    series1.push(map[data.labels[i]]);
                }

                data.series.push(series1);




                pendingOrdersData = data;


                this.setState({ pendingOrdersData, loading3: false });
            } else {
                this.setState({ loading3: false, alertMessage: "Error loading pending orders." });
                this.failAlert();
            }
        });

    }



    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }


    render() {



        var type = 'Bar'
        // console.log(data);

        return (

            <div className="main-content">
                {this.state.alert}
                <Card
                    title={<legend>Completed Orders information - Pharmacies comparison</legend>}
                    content={
                        <div>
                            {this.state.loading1 ? <Spinner show={this.state.loading1} /> :
                                <ChartistGraph data={ordersData} options={options} type={type} />}
                        </div>
                    }
                />
                <Card
                    title={<legend>Pending Orders information - Most requested items</legend>}
                    content={
                        <div>
                            {this.state.loading2 ? <Spinner show={this.state.loading2} /> :
                                <ChartistGraph data={pendingOrdersData} options={options} type={type} />}
                        </div>
                    }
                />
                <Card
                    title={<legend>Completed Orders information - Quantity by date</legend>}
                    content={
                        <div>
                            {this.state.loading3 ? <Spinner show={this.state.loading3} /> :
                                <ChartistGraph data={ordersByDate} options={options} type={'Line'} />}
                        </div>
                    }
                />

            </div>


        );







    }

}

export default Dashboard;
