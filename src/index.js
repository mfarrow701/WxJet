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

const localStorageMiddleware = ({getState}) => {
    return (next) => (action) => {
        const result = next(action);
        localStorage.setItem('reduxState', JSON.stringify(
            getState()
        ));
        return result;
    };
};

const reHydrateStore = () => {

    if (localStorage.getItem('reduxState') !== null) {
        return JSON.parse(localStorage.getItem('reduxState'))
    }
};

const middleware = applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware,
    localStorageMiddleware
);

const store = createStore(
    rootReducer,
    reHydrateStore(),
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
