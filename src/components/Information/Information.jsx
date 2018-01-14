import React, { Component } from 'react';

import 'react-select/dist/react-select.css';
var config = require("../../config.js");

class Information extends Component {
    constructor(props) {
        super(props);

    }



}

export function getOrdersHistoryInfo() {
    /* let testToday = new Date();
    let testDateBefore = new Date(Date.now() - (86400000*30));
    let testDateTommorow = new Date(Date.now() + 86400000);
    let testTodayMidnight = new Date(new Date().setHours(0, 0, 0, 0));
    console.log("yesterday", testDateBefore);
    console.log("today", testToday);
    console.log("tommorow", testDateTommorow);
    console.log("midnight today", testTodayMidnight); */
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve()
        }, 100000)

        fetch(config.orders_url + 'api/orders', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),
            },
        }).then(results => {
            return results.json();
        }).then(data => {

            let info = data.map((order) => {

                let input = new Date(order.orderDate);
                let today = new Date(new Date().setHours(0, 0, 0, 0));
                console.log(input < today)
                console.log(order)
                if (input < today) {

                    return [
                        order.requestDate,
                        order.orderDate,
                        order.itemName,
                        order.form,
                        order.quantity,
                        order.pharmacy,
                        order.timeRestriction,
                    ]
                }
            });
            console.log(info)
            resolve(info);
        }).catch(error => {
            resolve(null);
        });
    });
}

export function getPendingOrdersInfo() {

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve()
        }, 100000)

        fetch(config.orders_url + 'api/orders', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),
            },
        }).then(results => {
            return results.json();
        }).then(data => {

            let info = data.map((order) => {

                let input = new Date(order.orderDate);
                let today = new Date(new Date().setHours(0, 0, 0, 0));
                if (input >= today) {

                    return [
                        order.requestDate,
                        order.orderDate,
                        order.itemName,
                        order.form,
                        order.quantity,
                        order.pharmacy,
                        order.timeRestriction,
                    ]
                }
            });
            resolve(info);
        }).catch(error => {
            resolve(null);
        });
    });
}


export default Information;
