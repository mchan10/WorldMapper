import React from 'react';
import { useQuery } from '@apollo/client';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Homescreen from './components/homescreen/Homescreen.js'
import * as queries 	from './cache/queries.js';

const App = () => {
	let user = null;
    let transactionStack = new jsTPS();
	
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

    if(error) { console.log(error); }
	if(loading) { console.log("loading"); }
	if(data) { 
	    let { getCurrentUser } = data;
	    if(getCurrentUser !== null) { user = getCurrentUser; }
    }

	return(
		<BrowserRouter>
			<Switch>
				<Route path="/"  
					render={() => 
						<Homescreen tps={transactionStack} fetchUser={refetch} user={user} />
					} 
				/>
				<Route/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
