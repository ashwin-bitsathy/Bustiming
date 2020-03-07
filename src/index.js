import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import bus from './bus';
import Signup from './signup';


ReactDOM.render(
	<Router>
    <Switch>
    <Route exact path="/" component={App}/>
    <Route path="/bus" component={bus}/>
    <Route path="/signup" component={Signup}/>


    </Switch>
	</Router> , document.getElementById('root'));
