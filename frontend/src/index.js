import ReactDOM from 'react-dom';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import reducers from './reducers';
import App from './components/App';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'),
);
