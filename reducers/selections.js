const  { SET_SELECTION,CLEAR_SELECTION} = require('../actions/selection');
const  {OPEN_AT, CLOSE_ARTICLE, CLONE_ARTICLE} = require('../actions/articles');

const emptySelection=function(A){
  var article=A.article||{start:0,startH:""};
  const ranges=[article.start];
  const caretpos=article.start;
  const caretposH=article.startH;
  return {[A.id]:{caretpos,caretposH,ranges,index:0,cursor:{line:0,ch:0}}};  
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
  } else if (OPEN_AT===A.type||CLONE_ARTICLE===A.type) {
    return Object.assign({},state,emptySelection(A));
  } else if (CLOSE_ARTICLE===A.type) {
    var newstate=Object.assign({},state);
    if (newstate[A.id]) delete newstate[A.id];
    return newstate;
  } else {
  	return state;
  }
};