import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import Select from 'react-select';

import { searchReposAction } from '../actions/github';
import { SORT_BY } from '../api/constants';
import Loader from './Loader';
import NoResults from './NoResults';
import ReposList from './ReposList';

export class Repos extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: props.query,
			sort: { value: props.sort, label: props.sort.capitalize() }
		};

		this.inputRef = React.createRef();
	}

	componentDidMount() {
		// sets the value of the old search for the input on first load
		this.inputRef.current.value = this.state.query;
	}

	/**
	 * calling search action, added debounce with leading to pass the first click but prevent spam clicking
	 */
	onSearchClicked = debounce(
		() => {
			const text = this.inputRef.current.value;
			if (text) {
				this.props.searchRepos(text, this.state.sort.value);
			}
		},
		300,
		{
			leading: true,
			trailing: false
		}
	);

	/**
	 *  needed to know when user is deleting the query so we will not show old results
	 *  added debounce for performence
	 */
	onUserTyping = debounce(text => {
		this.setState({ query: text });
	}, 300);

	render() {
		const { repos, loading, error } = this.props;
		const { sort, query } = this.state;

		// condinitional rendering
		const shouldRenderReposList = repos.length > 0 && query && !loading;
		const shouldRenderEmptyResults = (repos.length === 0 || !query) && !loading;

		return (
			<div className="repos-container">
				<div className="header">
					<div className="flex-row input-container">
						<div className="input-title color-white">Search:</div>
						<input
							ref={this.inputRef}
							className="search-bar"
							type="text"
							name="query"
							placeholder="Search repos..."
							onChange={e => this.onUserTyping(e.target.value)}
						/>
					</div>
					<div className="flex-row input-container">
						<div className="input-title color-white">Sort By:</div>
						<Select
							className="dropdown"
							value={sort}
							options={sortByOptions}
							onChange={sort => {
								this.setState({ sort });
							}}
							theme={customTheme}
						/>
						<div
							className="white-flat-button search-button click-animation"
							onClick={this.onSearchClicked}
						>
							Search
						</div>
					</div>
				</div>
				{error ? (
					<div className="error color-white">Something went wrong.. please try again</div>
				) : (
					<Fragment>
						{loading && <Loader className="loader" />}
						{shouldRenderEmptyResults && <NoResults />}
						{shouldRenderReposList && <ReposList repos={repos} />}
					</Fragment>
				)}
			</div>
		);
	}
}

Repos.defaultProps = {
	repos: [],
	searchRepos: () => {}
};

const mapStateToProps = state => ({
	repos: state.github.repos,
	query: state.persistedState.query || '',
	sort: state.persistedState.sort || SORT_BY[0],
	loading: state.github.loading,
	error: state.github.error
});

const mapDispatchToProps = {
	searchRepos: (query, sort) => searchReposAction(query, sort)
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Repos)
);

/**
 * this class is arguebly too long. but, seperating the search bar into another component would result with either:
 * 1. more actions and more boilerplate code
 * 2. tightly coupled components (search bar and repos)
 * for now I just moved some of the stuff here to the bottom of the class for readability
 */

/**
 * Select is expecting this {value, label} format so I map the sort options to that convention
 * At the same time I change the label to be capilized and add space instead of dashes
 * @see Select ('react-select')
 */
export const sortByOptions = SORT_BY.map(e => {
	return {
		value: e,
		label: e
			.capitalize()
			.split('-')
			.join(' ')
	};
});

const customTheme = theme => ({
	...theme,
	height: '20px',
	colors: {
		...theme.colors,
		primary25: '#6215aa22',
		primary: '#6215aa88'
	}
});
