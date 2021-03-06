import ReactDOM from 'react-dom';
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducers from './reducers';
import App from './components/App';

import './skeleton.css';

// Prevents mutability of the state.
const immutable = [require('redux-immutable-state-invariant').default()];

// An object containing the whole state of the application.
const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...immutable)),
);

// Starting point of the system.
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'),
);
