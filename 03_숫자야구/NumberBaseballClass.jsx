import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class NumberBaseballClass extends Component {
    state = {
        text:'Hello webpack!!!23223233',
    }

    render() {
        return <h1>{this.state.text}</h1>
    }
}


export default NumberBaseballClass;


