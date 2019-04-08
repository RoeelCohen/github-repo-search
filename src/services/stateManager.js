const STATE_KEY = 'presisted_state';

/**
 * saving persisted state to local storage
 * @param {*} state - the state object to save
 */
export const saveState = state => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(STATE_KEY, serializedState);
	} catch (err) {
		console.log(err);
	}
};

/**
 * loading persisted state from local storage
 */
export const loadState = () => {
	try {
		const serializedState = localStorage.getItem(STATE_KEY);
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};
