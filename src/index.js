// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {routerMiddleware} from 'react-router-redux';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Amplify from 'aws-amplify';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/rootReducer'
import rootSaga from './sagas/root.saga';
import {amplifyConfig} from './appConfig';
import App from './app';
import './index.css';

const history = createHistory({basename: process.env.PUBLIC_URL}),
    sagaMiddleware = createSagaMiddleware(),
    rootElement = document.getElementById('root');

const reHydrateStore = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const middleware = applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware
);

const store = createStore(
    rootReducer,
    reHydrateStore,
    middleware
);

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

sagaMiddleware.run(rootSaga);

Amplify.configure(amplifyConfig);

ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>,
    rootElement
);
registerServiceWorker();


