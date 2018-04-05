// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {routerMiddleware} from 'react-router-redux';
import {applyMiddleware, createStore} from 'redux';
import reduxLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/root.reducer'
import rootSaga from './sagas/root.saga';
import App from './app';
import './index.css';

const history = createHistory({basename: process.env.PUBLIC_URL}),
    sagaMiddleware = createSagaMiddleware(),
    rootElement = document.getElementById('root');

const middleware = applyMiddleware(
    // reduxLogger,
    routerMiddleware(history),
    sagaMiddleware
);

const store = createStore(
    rootReducer,
    middleware
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>,
    rootElement
);
registerServiceWorker();
