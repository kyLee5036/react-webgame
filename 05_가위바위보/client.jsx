import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root'

// import RSPClass from './RSPClass';
// const HotRSPClass = hot(RSPClass);

import RSPHooks from './RSPHooks';
const HotRSPHooks = hot(RSPHooks);

ReactDOM.render(<HotRSPHooks />, document.querySelector('#root'));










