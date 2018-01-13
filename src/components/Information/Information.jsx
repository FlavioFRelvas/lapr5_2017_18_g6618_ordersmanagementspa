import React, { Component } from 'react';

import 'react-select/dist/react-select.css';
var config = require("../../config.js");

class Information extends Component {
    constructor(props) {
        super(props);

    }



}

export function getOrdersHistoryInfo() {
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

                var input = new Date(order.requestDate).toISOString().substring(0, 10);
                var today = new Date().toISOString().substring(0, 10);
                if (input !== today) {

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
                } else {
                    throw null;
                }
            });
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

                var input = new Date(order.requestDate).toISOString().substring(0, 10);
                var today = new Date().toISOString().substring(0, 10);
                if (input === today) {

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
                } else {
                    throw null
                }
            });
            resolve(info);
        }).catch(error => {
            resolve(null);
        });
    });
}


export default Information;
