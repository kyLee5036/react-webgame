import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';

import ResponseCheckClass from './ResponseCheckClass';

const HotResponseCheckClass = hot(ResponseCheckClass);

ReactDOM.render(<HotResponseCheckClass/> ,document.querySelector('#root'));
