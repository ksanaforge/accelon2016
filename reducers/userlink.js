const  { ADD_USERLINK, REMOVE_USERLINK, REMOVE_ALL_USERLINK} = require('../actions/userlink');

module.exports=function userlink(state = {} , action = {}) {
  if (ADD_USERLINK===action.type) {
  	var newstate= Object.assign({},state);
  	for (let i=0;i<action.items.length;i++) {
  		const item=action.items[i];
  		const corpususerlink=newstate[item.corpus]||{};
  		corpususerlink[item.id]=item.payload;
      newstate[item.corpus]=Object.assign({},corpususerlink);
  	}
    
  	return newstate;
  } else if (REMOVE_USERLINK==action.type) {
    const corpususerlink=Object.assign({},state[corpus]||{});
  	delete corpususerlink[action.id];
    const newstate=Object.assign({},state);
    newstate[action.corpus]=corpususerlink;
  	return newstate;
  } else if (REMOVE_ALL_USERLINK==action.type) {
  	var newstate=Object.assign({},state);
    delete newstate[action.corpus];
    return newstate;
  }
  return state;
};