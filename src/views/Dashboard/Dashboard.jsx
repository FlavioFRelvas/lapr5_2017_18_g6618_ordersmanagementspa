import React, { Component } from 'react';
import { React3 } from 'react'
import { Grid, Col, Row } from 'react-bootstrap';
// react component used to create charts
import ChartistGraph from 'react-chartist';
// function that returns a color based on an interval of numbers
import { scaleLinear } from "d3-scale";

import {getOrdersHistoryInfo, getPendingOrdersInfo} from '../../components/Information/Information';
import $ from 'jquery';

// react components used to create a SVG / Vector map
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps";

import Card from 'components/Card/Card.jsx';
import StatsCard from 'components/Card/StatsCard.jsx';
import Tasks from 'components/Tasks/Tasks.jsx';

import {
    dataPie,
    dataSales,
    optionsSales,
    responsiveSales,
    dataBar,
    optionsBar,
    responsiveBar,
    table_data
} from 'variables/Variables.jsx';


const colorScale = scaleLinear()
    .domain([0, 1, 6820])
    .range(["#E5E5E5", "#B2B2B2", "#000000"]);

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
            windowWidth: window.innerWidth
        };
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize(e) {
        this.setState({
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        })
    };

    componentWillMount()
    {



        getOrdersHistoryInfo().then((orders_info) =>{
            var map = [];
            var series1 = [];

            var data = {
                labels: [],
                series: []
            };

            for(var i = 0; i < orders_info.length;i++)
            {

                if(data.labels.indexOf(orders_info[i][5])== -1)
                {
                    data.labels.push(orders_info[i][5]);
                    map[orders_info[i][5]] = orders_info[i][4];
                }
                else{
                    map[orders_info[i][5]] += orders_info[i][4];
                }


            }
            for(var i = 0 ; i < data.labels.length;i++)
            {
                series1.push(map[data.labels[i]]);
            }

            data.series.push(series1);




            ordersData = data;


            this.setState({ ordersData });

        });

        getOrdersHistoryInfo().then((orders_info) =>{
            var map = [];
            var series1 = [];

            var data = {
                labels: [],
                series: []
            };

            for(var i = 0; i < orders_info.length;i++)
            {
                if(orders_info[i].length > 0) {
                    var formatedDate = orders_info[i][0].split("T")[0];
                    if (data.labels.indexOf(formatedDate) == -1) {
                        data.labels.push(formatedDate);
                        map[formatedDate] = orders_info[i][4];
                    }
                    else {
                        map[formatedDate] += orders_info[i][4];
                    }
                }

            }
            for(var i = 0 ; i < data.labels.length;i++)
            {
                series1.push(map[data.labels[i]]);
            }

            data.series.push(series1);




             ordersByDate = data;


            this.setState({ ordersByDate });

        });
        getPendingOrdersInfo().then((orders_info) =>{
            console.log(orders_info);
            var map = [];
            var series1 = [];

            var data = {
                labels: [],
                series: []
            };

            for(var i = 0; i < orders_info.length;i++)
            {
                if(orders_info[i].length > 0)
                {
                    console.log(orders_info[i]);
                    if(data.labels.indexOf(orders_info[i][2])== -1 )
                    {
                        data.labels.push(orders_info[i][2]);
                        map[orders_info[i][2]] = orders_info[i][4];
                    }
                    else{
                        map[orders_info[i][2]] += orders_info[i][4];
                    }
                }

            }
            for(var i = 0 ; i < data.labels.length;i++)
            {
                series1.push(map[data.labels[i]]);
            }

            data.series.push(series1);




            pendingOrdersData = data;


            this.setState({ pendingOrdersData });

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

            <div>
                <Card
                    title={<legend>Completed Orders information - Pharmacies comparison</legend>}
                    content={

                        <ChartistGraph data={ordersData} options={options} type={type}/>
                    }
                />
                <Card
                    title={<legend>Pending Orders information - Most requested items</legend>}
                    content={

                        <ChartistGraph data={pendingOrdersData} options={options} type={type}/>
                    }
                />
                <Card
                    title={<legend>Completed Orders information - Quantity by date</legend>}
                    content={

                        <ChartistGraph data={ordersByDate} options={options} type={'Line'}/>
                    }
                />

            </div>


        );







    }

}

export default Dashboard;
