const UsoniaApi = require("usonia-api-client");
const api = new UsoniaApi({
	toString: () => {
		throw new Error("You must set api.base_url = some url first");
	}
});
export default api;
