import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root'

// import LottoClass from './LottoClass';
// const HotLottoClass = hot(LottoClass);

import LottoHooks from './LottoHooks';
const HotLottoHooks = hot(LottoHooks);

ReactDOM.render(<HotLottoHooks />, document.querySelector('#root'));
