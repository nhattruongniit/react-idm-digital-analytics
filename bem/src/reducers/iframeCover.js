/*
	Usage:
	import {setCover, unsetCover} from "reducers/iframeCover"

	const mapDispatchToProps = { setCover, unsetCover }

*/

const SET_COVER   = "/IFRAME_COVER/SET_COVER";
const UNSET_COVER = "/IFRAME_COVER/UNSET_COVER";


export const setCover   = () => ({ type: SET_COVER   });
export const unsetCover = () => ({ type: UNSET_COVER });





export default (state=false, action) => {
	switch(action.type){
		case SET_COVER:   console.log("SET_COVER"); return true;
		case UNSET_COVER: console.log("UNSET_COVER"); return false;

		default: return state;
	}
}