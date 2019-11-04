import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Example from './Example';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App}></Route>
            <Route path="/example" component={Example}></Route>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
