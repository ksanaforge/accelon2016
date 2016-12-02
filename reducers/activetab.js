const  { SET_ACTIVE_TAB} = require('../actions/articles');

module.exports=function activearticle(state = 0 , action = {}) {
	const A=action;
	if (SET_ACTIVE_TAB===A.type){
		if (A.index>-1) return A.index;
  }
  return state;
};