import React from 'react';
import ReactDOM from 'react-dom';

import {hot} from 'react-hot-loader/root'

import NumberBaseballClass from './NumberBaseballClass';

const Hot = hot(NumberBaseballClass);

ReactDOM.render(<NumberBaseballClass />, document.querySelector('#root'));

