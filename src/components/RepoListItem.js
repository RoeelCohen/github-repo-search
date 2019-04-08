import React from 'react';

export default props => {
	const { onItemClicked, fullName = 'Repo', description = '', stars = 0 } = props;

	return (
		<div className="repo-list-item rounded-border three-d-hover clickable" onClick={onItemClicked}>
			<div className="title">Repo: {fullName}</div>
			<div className="description">Description: {description}</div>
			<div className="stars">Stars: {stars}</div>
		</div>
	);
};
