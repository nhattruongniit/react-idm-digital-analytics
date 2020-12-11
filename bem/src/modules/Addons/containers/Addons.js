import { connect } from 'react-redux';
import Addons from "../components/Addons";

const mapStateToProps = state => {

	const addons = state.addons.addons.models;

	console.log("addons: ", addons)


	const contexts = {
		
		idf_documents: state.projects.selectedDocumentIds.length 
			? state.projects.documents.documentItems.filter( ({id}) => state.projects.selectedDocumentIds.indexOf(id) > -1 )
			: null,
		
		idf_document: (state.projects.selectedDocumentIds.length == 1) // TODO: Or we are in idf document editor
			? ( ()=>{
				for (let doc of state.projects.documents.documentItems){
					if(doc.id === state.projects.selectedDocumentIds[0]) return doc;
				}
				throw new Error(`Selected document id ${state.projects.selectedDocumentIds[0]} is not in document items list`)
			})() : null,

		projects: state.projects.selectedProjectIds.length 
			? state.projects.projects.projectItems.filter( ({id}) => state.projects.selectedProjectIds.indexOf(id) > -1 )
			: null,
		
		project: (state.projects.selectedProjectIds.length  == 1) // TODO: Or we are in project document list
			? ( ()=>{
				for (let doc of state.projects.projects.projectItems){
					if(doc.id === state.projects.selectedProjectIds[0]) return doc;
				}
				throw new Error(`Selected project id ${state.projects.selectedProjectIds[0]} is not in project items list`)
			})() : null
	}

	console.log("contexts: ", contexts)



	const available_contexts = [];
	for(let key in contexts){
		let ctx = contexts[key];
		if(!ctx) continue;
		available_contexts.push(key);
	}




	const addons_data = addons.map( addon => {
		const active = addon.manifest.context.some( ctx => available_contexts.indexOf(ctx) > -1 )
		return { active,  ...addon };
	})

	console.log("addons data: ", addons_data)


	return {
		addons_data,
		contexts
	}


};

const mapDispatchToProps = dispatch => ({
  // requestLogin: () => dispatch(requestLogin),
  // verifyLogin: () => dispatch(verifyLogin()),
  // dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Addons);