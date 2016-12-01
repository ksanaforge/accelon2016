const {SET_ACTIVE_CORPUS}=require("../actions/search");
const {OPEN_CORPUS_SUCCESS}=require("../actions/corpus");

module.exports=function activequery(state = "" , action = {}) {
  switch (action.type) {
  	case OPEN_CORPUS_SUCCESS: //set to active corpus for first open 
  		if (state=="") {
  			return action.corpus;
  		}
  		return state;
  	case SET_ACTIVE_CORPUS:
  		if (action.corpus!==undefined) {
  			return action.corpus;
  		}
  		return state;
  	default:
  		return state;
  }
}
