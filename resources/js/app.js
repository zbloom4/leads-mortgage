import React from 'react';
import ReactDOM from 'react-dom';
import LeadForm from './components/lead-form.jsx';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={LeadForm} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('app'));