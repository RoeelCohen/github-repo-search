import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './services/extensions';
import { saveState, loadState } from './services/stateManager';
import reducers from './reducers';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const persistedState = loadState() || {};

const store = createStore(
	reducers,
	{ persistedState },
	composeEnhancers(applyMiddleware(...middleware))
);

/**
 * subscribe and save only state.persistedState.
 */
store.subscribe(() => {
	saveState(store.getState().persistedState);
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
