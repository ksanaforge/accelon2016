const  { OPEN_AT,OPEN_AT_FAILED,SET_ACTIVE_ARTICLE } = require('../actions/articles');

module.exports=function articles(state = [] , action = {}) {
	const A=action;
  if (OPEN_AT===A.type) {
		var newstate=state.slice();
    const {title,corpus,address,article,text}=action;
    var obj={title,corpus,address,article,text};
    newstate.forEach((a)=>a.active=false);
    if (A.replaceAt!==undefined && newstate[A.replaceAt]) {
      newstate[A.replaceAt]=obj;
      obj.seq=A.replaceAt;
      obj.active=true;
    } else {
      if (A.insertAt!==undefined) {
        newstate=[].concat(state.slice(0,A.insertAt));
      }
      obj.seq=newstate.length;
      obj.active=true;
      newstate.push(obj);
      if (A.insertAt!==undefined) newstate=newstate.concat(state.slice(A.insertAt));        
    }
		return newstate;
  } else if(SET_ACTIVE_ARTICLE===A.type){
    if (typeof state[A.seq]=="undefined") return state;

    var newstate=state.slice();
    newstate.forEach((o)=>o.active=false);
    newstate[A.seq]=Object.assign({},newstate[A.seq],{active:true});

    return newstate;
  } else {
  	return state;
  }
};