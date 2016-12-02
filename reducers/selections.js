const  { SET_SELECTION,CLEAR_SELECTION} = require('../actions/selection');
const  {OPEN_AT, CLOSE_ARTICLE} = require('../actions/articles');

const emptySelection=function(A){
  const ranges=[A.article.start];
  const caretpos=A.article.start;
  const caretposH=A.article.startH;
  return {[A.id]:{caretpos,caretposH,ranges,cursor:{line:0,ch:0}}};  
}
const initialState=emptySelection({id:"resultview",article:{start:1}});

module.exports=function selection(state = initialState , action = {}) {
	const A=action;
  if (SET_SELECTION===A.type) {
  	if (A.corpus){
  		const obj=Object.assign({},A);
      delete obj.type;
  		return Object.assign({},state,{[A.id]:obj});
  	}
  } else if (OPEN_AT===A.type) {
    return Object.assign({},state,emptySelection(A));
  } else if (CLOSE_ARTICLE===A.type) {
    var newstate=Object.assign({},state);
    if (newstate[A.id]) delete newstate[A.id];
    return newstate;
  } else {
  	return state;
  }
};