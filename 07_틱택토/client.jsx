import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root'

import TicTacToeHooks from './TicTacToeHooks';
const HotTicTacToeHooks = hot(TicTacToeHooks);

ReactDOM.render(<HotTicTacToeHooks />, document.querySelector('#root'));
