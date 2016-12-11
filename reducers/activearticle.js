const  { SET_ACTIVE_ARTICLE} = require('../actions/articles');
const {SET_SELECTION}=require("../actions/selection");

module.exports=function activearticle(state = 1 , action = {}) {
	const A=action;
	if (SET_ACTIVE_ARTICLE===A.type){
		if (A.index>-1) return A.index;
  }
  return state;
};