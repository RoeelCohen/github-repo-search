import { BASE_URL, DEFAULT_RESULTS_PER_PAGE } from './constants';

/**
 * Building the search url
 * @param {integer} perPage - Defaults to 10
 * @see DEFAULT_RESULTS_PER_PAGE
 */
export const buildSearchURL = (query, sort = 'stars', perPage = DEFAULT_RESULTS_PER_PAGE) => {
	return `${BASE_URL}?q=${query}&sort=${sort}&per_page=${perPage}`;
};

/**
 * github api request
 * @returns object with repos if request successful, object with error otherwise
 */
export const searchRepos = async (query, sort) => {
	try {
		if (!query) {
			throw new Error('Failed searching');
		}

		const res = await fetch(buildSearchURL(query, sort));
		const searchResult = await res.json();

		if (searchResult && searchResult.items) {
			return { repos: searchResult.items };
		} else {
			throw new Error('Failed searching');
		}
	} catch (error) {
		return { error: error.message };
	}
};
