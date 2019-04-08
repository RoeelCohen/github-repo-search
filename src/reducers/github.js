import { REPO_SEARCH_STARTED, REPO_SEARCH_RESULT, REPO_SEARCH_FAILED } from '../actions/types';

const initialState = {
	loading: false,
	lastSearchStartTime: -1,
	repos: [],
	error: ''
};

/**
 * determines if request results is relevant in case of somehow old rquest returns after a new one (lags, etc..)
 * @param {*} stateStartSearchTime  - the time of the last action in state
 * @param {*} actionStartSearchTime - the time where the current search action started
 */
export const isRelevantResult = (stateStartSearchTime, actionStartSearchTime) =>
	stateStartSearchTime <= actionStartSearchTime;

export default (state = initialState, action) => {
	switch (action.type) {
		case REPO_SEARCH_STARTED: {
			return Object.assign({}, state, {
				loading: true,
				error: '',
				lastSearchStartTime: action.payload.searchStartTime
			});
		}

		case REPO_SEARCH_RESULT: {
			const { repos, searchStartTime } = action.payload;
			if (isRelevantResult(state.lastSearchStartTime, searchStartTime)) {
				return Object.assign({}, state, {
					loading: false,
					repos
				});
			}

			return state;
		}

		case REPO_SEARCH_FAILED: {
			const { error, searchStartTime } = action.payload;

			if (isRelevantResult(state.lastSearchStartTime, searchStartTime)) {
				return Object.assign({}, state, {
					loading: false,
					repos: [],
					error
				});
			}

			return state;
		}

		default:
			return state;
	}
};
