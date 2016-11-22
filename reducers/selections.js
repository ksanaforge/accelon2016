const  { SET_SELECTION,CLEAR_SELECTION} = require('../actions/selection');
const  {OPEN_AT, CLOSE_ARTICLE} = require('../actions/articles');

module.exports=function selection(state = {} , action = {}) {
	const A=action;
  if (SET_SELECTION===A.type) {
  	if (A.corpus){
  		const obj=Object.assign({},A);
      delete obj.type;
  		return Object.assign({},state,{[A.id]:obj});
  	}
  } else if (OPEN_AT===A.type) {
    const ranges=[A.article.start];
    const caretpos=A.article.start;
    const caretposH=A.article.startH;
    return Object.assign({},state,{[A.id]:{caretpos,caretposH,ranges,cursor:{line:0,ch:0}}});
  } else if (CLOSE_ARTICLE===A.type) {
    var newstate=Object.assign({},state);
    if (newstate[A.id]) delete newstate[A.id];
    return newstate;
  } else {
  	return state;
  }
};