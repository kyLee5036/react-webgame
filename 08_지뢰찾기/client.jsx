import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root'

import MineSearch from './MineSearch';
const HotMineSearch = hot(MineSearch);

ReactDOM.render(<HotMineSearch />, document.querySelector('#root'));
