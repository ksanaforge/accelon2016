const  { SET_SELECTION} = require('../actions/selection');

module.exports=function caret(state = {} , action = {}) {
  if (SET_SELECTION===action.type) {
  	var obj=Object.assign({},action);
  	delete obj.type;
  	return obj;
  } else {
  	return state;
  }
};