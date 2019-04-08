import React from 'react';
import renderer from 'react-test-renderer';

// import the component without router
import { ReposList } from '../../components/ReposList';

it('renders correctly', () => {
	const repos = [
		{ id: 123, full_name: 'test1', description: 'qweasd', stargazers_count: '321' },
		{ id: 456, full_name: 'test2', description: 'asdzxc', stargazers_count: '555' }
	];

	const tree = renderer.create(<ReposList repos={repos} />).toJSON();
	expect(tree).toMatchSnapshot();
});
