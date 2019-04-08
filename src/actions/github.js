import { REPO_SEARCH_STARTED, REPO_SEARCH_RESULT, REPO_SEARCH_FAILED } from './types';
import { searchRepos } from '../api/github';

/**
 * performing a search using github api.
 * dispatching repoSearchStarted action automatically
 * dispatching repoSearchReslut if api request was succesful, respoSearchFailed if it wasn't
 * @param {*} query - the repo search term to look for
 * @param {*} sort - sorting option @see {/api/constants.SORT_BY}
 */
export const searchReposAction = (query, sort) => {
	return async dispatch => {
		const searchStartTime = Date.now();
		dispatch(repoSearchStarted(query, sort, searchStartTime));
		const searchResult = await searchRepos(query, sort);
		const { repos, error } = searchResult;
		if (repos) {
			dispatch(repoSearchReslut(repos, searchStartTime, Date.now()));
		} else {
			dispatch(respoSearchFailed(error, searchStartTime, Date.now()));
		}
	};
};

const repoSearchStarted = (query, sort, searchStartTime) => ({
	type: REPO_SEARCH_STARTED,
	payload: {
		query,
		sort,
		searchStartTime
	}
});

const repoSearchReslut = (repos, searchStartTime, searchEndTime) => ({
	type: REPO_SEARCH_RESULT,
	payload: {
		repos,
		searchStartTime,
		searchEndTime
	}
});

const respoSearchFailed = (error, searchStartTime, searchEndTime) => ({
	type: REPO_SEARCH_FAILED,
	payload: {
		error,
		searchStartTime,
		searchEndTime
	}
});
