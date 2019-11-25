import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root'

import RSPClass from './RSPClass';



const HotRSPClass = hot(RSPClass);
ReactDOM.render(<HotRSPClass />, document.querySelector('#root'));

// const HotRSPClass = hot(RSPClass);
// ReactDOM.render(<HotRSPClass />, document.querySelector('#root'));








