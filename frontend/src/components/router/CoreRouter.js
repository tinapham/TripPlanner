import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../app/App';
import Error from '../error404/Error';
import Authentication from '../admin/Authentication'

const CoreRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/admin" component={Authentication} />
				<Route path="*" component={Error} />
			</Switch>
		</Router>
	);
}

export default CoreRouter;