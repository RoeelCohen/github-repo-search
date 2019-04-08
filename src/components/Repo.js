import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { routs } from '../constants';
class Repo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			didOpenOnGithub: false
		};
	}

	/**
	 * using debounce with leading to call the funtion once but prevent's the user from spam clicking.
	 * updating the flag to prevent further clicking
	 */
	onOpenOnGithubClicked = debounce(
		() => {
			this.setState({ didOpenOnGithub: true });
			window.open(this.props.repo.html_url, '_blank');
		},
		300,
		{
			leading: true,
			trailing: false
		}
	);

	render() {
		const { repo, history } = this.props;
		const { didOpenOnGithub } = this.state;
		return (
			<div className="repo-container">
				<div className="repo-name color-white">{repo.full_name}</div>
				<div className="buttons-container">
					<div
						className={`primary-button elevated ${didOpenOnGithub ? 'disabled' : 'click-animation'}`}
						onClick={didOpenOnGithub ? null : this.onOpenOnGithubClicked}
						disabled={didOpenOnGithub}
					>
						Open on github
					</div>
					<div
						className="primary-button elevated click-animation"
						onClick={() => history.push(routs.REPOS)}
					>
						Back
					</div>
				</div>
			</div>
		);
	}
}

// fallback in case of user changed url manualy or repo wasn't found
Repo.defaultProps = {
	repo: {
		full_name: 'Repo wast found.. Search again',
		html_url: 'https://github.com/'
	}
};

const mapStateToProps = (state, props) => {
	// get the repos from redux's state and find the wanted repo
	const repos = state.github.repos || [];
	// == in case id from url is a string
	const repo = repos.find(r => r.id == props.match.params.id);
	return { repo };
};

export default connect(mapStateToProps)(Repo);
