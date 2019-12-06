import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root'

import LottoClass from './LottoClass';
const HotLottoClass = hot(LottoClass);

ReactDOM.render(<HotLottoClass />, document.querySelector('#root'));
