const  { OPEN_AT,OPEN_AT_FAILED,SET_ACTIVE_ARTICLE,CLOSE_ARTICLE } = require('../actions/articles');

module.exports=function articles(state = [] , action = {}) {
	const A=action;

  if (OPEN_AT===A.type) {
		var newstate=state.slice();
    const {title,corpus,address,article,text}=action;
    var id='A'+Math.floor(Math.random()*10000000);
    var obj={title,corpus,address,article,text,id,active:true};
    newstate.forEach((a)=>a.active=false);
    newstate.push(obj);
		return newstate;
  } else if(SET_ACTIVE_ARTICLE===A.type){
    return state.map((o)=>{
      if (o.id==A.id) {
        return Object.assign({},o,{active:true})
      } else {
        o.active=false;
      }
      return o;
    });
  } else if (CLOSE_ARTICLE===A.type) {
    return state.filter((o)=>o.id!==A.id);
  } else {
  	return state;
  }
};