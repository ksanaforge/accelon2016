const {SEARCH_DONE,SET_ACTIVE_QUERY}=require("../actions/search");

module.exports=function activequery(state = -1 , action = {}) {
  switch (action.type) {
  	case SET_ACTIVE_QUERY:
  	case SEARCH_DONE:
  		if (action.n!==undefined) {
  			return action.n;
  		}
  		return state;
  	default:
  		return state;
  }
}
