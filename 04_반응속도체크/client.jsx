import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';

import ResponseCheckClass from './ResponseCheckClass';
import ResponseCheckHooks from './ResponseCheckHooks';


const HotResponseCheckClass = hot(ResponseCheckHooks);

ReactDOM.render(<HotResponseCheckClass/> ,document.querySelector('#root'));
