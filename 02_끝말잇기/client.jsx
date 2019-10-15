const React = require('react');
const Reactdom = require('react-dom');

const WordRelay = require('./WordRelay');

Reactdom.render(<WordRelay />, document.querySelector('#root'));