import { REPO_SEARCH_STARTED } from '../actions/types';

const initialState = {
	query: '',
	sort: 'stars'
};

export default (state = initialState, action) => {
	switch (action.type) {
		case REPO_SEARCH_STARTED:
			return action.payload;

		default:
			return state;
	}
};
