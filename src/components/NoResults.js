import React from 'react';

import emptySearch from '../assets/empty-search.svg';

export default function NoResults() {
	return (
		<div className="no-results">
			<img className="no-results-drawing" src={emptySearch} alt="" />
			<div className="no-results-text">No results to show.. Search something</div>
		</div>
	);
}
