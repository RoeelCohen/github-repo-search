import React from 'react';
import renderer from 'react-test-renderer';
import RepoListItem from '../../components/RepoListItem';

it('renders correctly', () => {
	const tree = renderer
		.create(<RepoListItem fullName="Test-Repo" description="this is a test" stars={123} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
