import { combineReducers } from 'redux';

import github from './github';
import persistedState from './persistedState';

export default combineReducers({
	github,
	persistedState
});
