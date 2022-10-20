import "../css/main.css";
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from '../components/App';

const baseComponent = ReactDOM.render(
    <App />, document.getElementById('root')
);
