// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {routerMiddleware} from 'react-router-redux';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';
import {ApolloProvider} from 'react-apollo';
import {Rehydrated} from 'aws-appsync-react';
import rootReducer from './reducers/rootReducer'
import rootSaga from './sagas/root.saga';
import {client} from './appSync';
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

ReactDOM.render(
    <ApolloProvider client={client}>
        <Rehydrated>
            <Provider store={store}>
                <App history={history}/>
            </Provider>
        </Rehydrated>
    </ApolloProvider>,
    rootElement
);
registerServiceWorker();


