// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {routerMiddleware} from 'react-router-redux';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/rootReducer'
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

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(
    rootReducer,
    persistedState,
    middleware
);

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>,
    rootElement
);
registerServiceWorker();
