import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/app-container.jsx';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={AppContainer} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('app'));