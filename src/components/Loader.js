import React from 'react';

import loader from '../assets/loader.svg';

export default () => {
	return (
		<div className="loader">
			<div className="color-white bold">Loading..</div>
			<img src={loader} alt="" />
		</div>
	);
};
