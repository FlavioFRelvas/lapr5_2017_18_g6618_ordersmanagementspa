import React, { Component } from 'react';

import spinner from './oval.svg';

class Spinner extends Component {

    render() {
        if (this.props.show) {
            console.log("LOADING!");
            return (
                <div className="content text-center" >
                    <img src={spinner} alt="Loading..." />
                </div>);
        } else {
            return null;
        }
    }
}

export default Spinner;