import idfApi from "./idf-api";

const UsoniaApi = require("usonia-api-client");
const collaborationApi = new UsoniaApi({
	toString: () => { throw new Error("Can not use collaboration api outside project context"); }
});

const responseHandler = (done, error, stream) => ( err, response, body ) => {
	if(err){ return error(err) }
	if(response.statusCode >=400) return error(body)
	if(stream) response.pipe(stream)
	done(body)
}

collaborationApi._request = collaborationApi.request;

// Only for collaboration endpoints !!!
collaborationApi.getStatus = function (){
	return new Promise((done,error)=>{
		this._request({
			type: "GET",
			url: `${this.base_url}/status`,
			json: true
		}, ( err, response, body ) => {
			if(err){ return error(err) }
			if(response.statusCode >=400) return error(body)
			done(body)
		})
	})
}


collaborationApi.holdRequests = function(){
	this.requests_collection = [];
	this.request = (opts, callback) => {
		return new Promise( (done, error) => {
			 this.requests_collection.push(function(err){
			 	if(err) return error(err);
				collaborationApi._request(opts, responseHandler(done, error));
			});
		});
	};
}

collaborationApi.releaseRequests = function(err){
	this.request = this._request;
	this.requests_collection.forEach( fn => fn(err) );
	this.requests_collection = [];
}

collaborationApi.setupProject = async (project) => {
	
	collaborationApi.request = collaborationApi._request;
	collaborationApi.requests_collection = [];

	if(project === null){
		collaborationApi.base_url = {
			toString: () => { throw new Error("Can not use collaboration api outside project context"); }
		}
		return;
	}

	if(project.remote === 0){
		collaborationApi.base_url = idfApi.base_url;
		collaborationApi.request = collaborationApi._request;
		return;
	}


	collaborationApi.base_url = `${process.env.REACT_APP_COLLABORATION_HUB_API_URL}/projects/${project.remote}/forward`;
	console.log("debug: set collaborationApi.base_url", collaborationApi.base_url)

	collaborationApi.holdRequests();
	
	// collaborationApi._request = collaborationApi.request;

	// collaborationApi.getIDFDocuments()
	// 	.then( data => { console.log("debug: collaborationApi.getIDFDocuments()", data); })

	// collaborationApi.getProjectDocuments(project.remote)
	// 	.then( data => { console.log("debug: collaborationApi.getProjectDocuments()", data); })



	status_loop:
		for(let i = 0; i < 200; i++){
			let status
			try{
				status = ( await collaborationApi.getStatus() ).data;
				switch(status.state){
					case "stopped":
					case "terminating":
					case "starting":
						// Just wait the status to be changed
						status.message && console.log("debug: CHECK STATUS: ", status.message);
						if(status.wait){
							// If status response wants us to wait some time
							// wait n seconds before next status check
							await ( new Promise( done => setTimeout(done, status.wait * 1000 ) ) )
						}
						break;
					case "running":
						collaborationApi.releaseRequests();
						break status_loop;
					default: throw new Error(`Unsupported status state: ${status.state}`);
				}


				
			}

			catch(e){
				console.error(e);
				return collaborationApi.releaseRequests(e);
			}


			// console.log("debug: CHECK STATUS: ", status)

			status.message && console.log("debug: CHECK STATUS: ", status.message)




			
		}


	// console.log(
	// 	"debug: collaborationApi.setupProject::",
	// 	collaborationApi.base_url
	// );
	// Inspect project, decide how to set collaborationApi.base_url, ...etc
	// Authorize, setup container and etc
	// callback(err, ready, message)
}

export default collaborationApi
