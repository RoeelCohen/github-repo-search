import { buildSearchURL, searchRepos } from '../api/github';

test('github url builder', () => {
	expect(buildSearchURL('tetris', 'stars')).toEqual(
		'https://api.github.com/search/repositories?q=tetris&sort=stars&per_page=10'
	);
	expect(buildSearchURL('tetris2', 'forks')).toEqual(
		'https://api.github.com/search/repositories?q=tetris2&sort=forks&per_page=10'
	);
	expect(buildSearchURL('tetris')).toEqual(
		'https://api.github.com/search/repositories?q=tetris&sort=stars&per_page=10'
	);
});

test('succesful api call', async () => {
	expect.assertions(6);
	const data = await searchRepos('tetris', 'stars');
	expect(data).toHaveProperty('repos');
	expect(data.repos.length).toBe(10);
	const repo = data.repos[0];
	expect(repo).toHaveProperty('full_name');
	expect(repo).toHaveProperty('html_url');
	expect(repo).toHaveProperty('stargazers_count');
	expect(repo).toHaveProperty('description');
});

/**
 * calling search without query will return object with error (try catch is in the api responsibility)
 */
test('fail api call', async () => {
	expect.assertions(2);
	const data = await searchRepos();
	expect(data).toHaveProperty('error');
	expect(data.error).toMatch('Failed searching');
});
