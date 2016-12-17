const  { SET_ACTIVE_WLINK} = require('../actions/link');

module.exports=function activewlink(state = "" , action = {}) {
	const A=action;
	if (SET_ACTIVE_WLINK===A.type){
	 return A.id;
  }
  return state;
};