const {SET_ACTIVE_QUERY}=require("../actions/search");

const initialState={query:-1,total:0,now:-1};

module.exports=function activequery(state = -1 , action = {}) {
  switch (action.type) {
  	case SET_ACTIVE_QUERY:
  		if (action.n!==undefined) {
  			return action.n;
  		}
  		return state;
  	default:
  		return state;
  }
}
