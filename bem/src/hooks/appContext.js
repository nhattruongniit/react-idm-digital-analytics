import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { useParams } from "react-router-dom";

import { setContext, unsetContext } from "reducers/contexts";

import path from "../config/path";
// Mounted in src/components/Main.js

const handlers = {
	projectId:    (id, setContext, unsetContext) => id ? setContext("project",      {id: parseInt(id)}) : unsetContext("project"),
	documentId:   (id, setContext, unsetContext) => id ? setContext("idf-document", {id: parseInt(id)}) : unsetContext("idf-document"),
	simulationId: (id, setContext, unsetContext) => id ? setContext("simulation",   {id: parseInt(id)}) : unsetContext("simulation"),
	chartId:      (id, setContext, unsetContext) => id ? setContext("chart",        {id: parseInt(id)}) : unsetContext("chart"),
}

function Handler(props){

	const params = { ...handlers, ...useParams() };
	for(let key in params){
		useEffect(()=>{
			typeof params[key] === "function"
			? handlers[key](undefined, props.setContext, props.unsetContext)
			: handlers[key](params[key], props.setContext, props.unsetContext)
		},[params[key]])
	}
	return null;
}


export default connect(
	(state, ownProps)    => ({}),
	(dispatch, ownProps) => ({
		setContext:   (...args) => setTimeout( () => setContext(dispatch)(...args)    ),
		unsetContext: (...args) => setTimeout( () => unsetContext(dispatch)(...args)  ),
	}),
)(function AppContext({
	setContext,
	unsetContext
}){
	
	// const { world_id } = useParams();

	return <Switch>
		
		<Route path={[
			"/dashboard/:projectId/documents/:documentId/simulator/:simulationId/charts/:chartId",
			"/dashboard/:projectId/documents/:documentId/simulator/:simulationId",
			"/dashboard/:projectId/documents/:documentId",
			"/dashboard/:projectId",
		]}><Handler setContext={setContext} unsetContext={unsetContext} />

		</Route>

		<Route path="/"><Handler setContext={setContext} unsetContext={unsetContext} /></Route>
	</Switch>

	// console.log("DEBUG: APPCONTEXT");

	// return null;
});