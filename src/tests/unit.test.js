import '../services/extensions';
import { isRelevantResult } from '../reducers/github';
import { sortByOptions } from '../components/Repos';

test('string capitalize extension', () => {
	expect('string'.capitalize()).toBe('String');
	expect('String'.capitalize()).toBe('String');
	expect('String string'.capitalize()).toBe('String string');
});

test('is relevant result', () => {
	let time = Date.now();
	expect(isRelevantResult(time, time + 100)).toBeTruthy();
	expect(isRelevantResult(time, time - 100)).toBeFalsy();
});

/**
 * probably shouldve export it to an helper function, now I understand TDD better =D
 */
test('sort by mapping', () => {
	const mockData = [
		{ value: 'stars', label: 'Stars' },
		{ value: 'forks', label: 'Forks' },
		{ value: 'updated', label: 'Updated' },
		{ value: 'help-wanted-issues', label: 'Help wanted issues' }
	];
	expect(sortByOptions).toEqual(mockData);
});
