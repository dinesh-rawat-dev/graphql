/**
 * React Main file
 */
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './app/frontend/redux/reducers/index.jsx';
import Admin from './app/frontend/components/admin.jsx';
import Create from './app/frontend/components/create.jsx';
import Update from './app/frontend/components/update.jsx';
import Customer from './app/frontend/components/customer.jsx';

render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/" exact component={Customer}/>
                <Route path="/admin" component={Admin}/>
                <Route path="/create" component={Create}/>
                <Route path="/update/:id" component={Update}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
