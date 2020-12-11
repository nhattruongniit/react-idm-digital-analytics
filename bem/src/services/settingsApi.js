import request from 'services/request';

var crypto = require('crypto');



function getMD5(obj){
	const str = JSON.stringify(obj || null);
	var hash = crypto.createHash('md5');
	const data = hash.update(str, 'utf-8');
	return data.digest('hex');
}

const settingsModels = {
	
	"addon-dock-state": {
	  _version:       2,
      type:           "left",
      size:           501,
      layoutState:    [],
    }

}


export default {
	
	get: async name => {

		const setting_definition = settingsModels[name];
		
		if(!setting_definition){
			throw new Error("Cannot find setting definition: " + name);
		}

		const setting_version = getMD5(setting_definition);
		const setting_name = `${name}-${setting_version}`;

		let model = (await request.get(`/settings/${setting_name}`)).data.data;
		if(model.value === null){
			model = (await request.post('/settings', {
				name:  setting_name,
				value: setting_definition,
			})).data.data;
		}

		return model;
	},

	update: async (name, value) => {

		const setting_definition = settingsModels[name];
		
		if(!setting_definition){
			throw new Error("Cannot find setting definition: " + name);
		}

		const setting_version = getMD5(setting_definition);
		const setting_name = `${name}-${setting_version}`;

		const model = (await request.put(`/settings/${setting_name}`, {
			name:  setting_name,
			value
		})).data.data;
	}
}