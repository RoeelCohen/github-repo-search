import React from 'react';
import { withRouter } from 'react-router-dom';

import RepoListItem from './RepoListItem';
import { routs } from '../constants';

export const ReposList = props => {
	const { repos = [] } = props;

	return (
		<div className="repos-list">
			{repos.map(repo => {
				const { id, full_name, description, stargazers_count } = repo;
				return (
					<RepoListItem
						key={id}
						fullName={full_name}
						description={description}
						stars={stargazers_count}
						onItemClicked={e => {
							e.preventDefault();
							e.stopPropagation();
							props.history.push(`${routs.REPO_BASE}${id}/`);
						}}
					/>
				);
			})}
		</div>
	);
};

export default withRouter(ReposList);
