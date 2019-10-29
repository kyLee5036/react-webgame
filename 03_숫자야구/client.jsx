import React from 'react';
import ReactDOM from 'react-dom';

import {hot} from 'react-hot-loader/root'

import MapPratice from './NumberBaseballClass';

import Test from './ShouldComponetUpdate_renderTest';
import Test2 from './PureComponent_renderTest';

const Hot = hot(MapPratice);

ReactDOM.render(<MapPratice />, document.querySelector('#root'));

