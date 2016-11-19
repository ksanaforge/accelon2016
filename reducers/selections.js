const  { SET_SELECTION,CLEAR_SELECTION} = require('../actions/selection');
const  { CLOSE_ARTICLE} = require('../actions/articles');

module.exports=function selection(state = {} , action = {}) {
	const A=action;
  if (SET_SELECTION===A.type) {
  	if (A.corpus){
  		const obj=Object.assign({},A);
      delete A.type;
  		return Object.assign({},state,{[A.id]:obj});
  	}
  } else if (CLEAR_SELECTION===A.type) {
  	return {};
  } else if (CLOSE_ARTICLE===A.type) {
    var newstate=Object.assign({},state);
    if (newstate[A.id]) delete newstate[A.id];
    return newstate;
  } else {
  	return state;
  }
};