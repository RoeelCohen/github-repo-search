import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './style/app.scss';

import { routs } from './constants';
import Repos from './components/Repos';
import Repo from './components/Repo';

// REPOS is the actual home page therefore redirect automatically
class App extends Component {
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Switch>
						<Redirect exact from={routs.HOME} to={routs.REPOS} />
						<Route exact path={routs.REPOS} component={Repos} />
						<Route exact path={routs.REPO} component={Repo} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
