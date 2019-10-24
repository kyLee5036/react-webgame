import React, { Component } from 'react';

class Try extends Component {
    render() {
        return (
            <li>
                <b>{this.props.getValue.fruit}</b> -
                {this.props.getValue.taste} - 
                {this.props.getIndex}
            </li>
        )
    }
}

export default Try;