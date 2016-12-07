const {SEARCH_DONE}=require("../actions/search");
const {SET_OCCUR}=require("../actions/occur");
const {SET_FILTERED}=require("../actions/filter");

var querys="菩薩道\n如來 當然";

querys= (localStorage.getItem("accelon2016_querys")||querys).split("\n");
const initialState=querys.map((q)=>({q,count:0,matches:[],now:-1}));
module.exports=function querys(state = initialState, action = {}) {
  switch (action.type) {
  	case SEARCH_DONE:
  		var querys=[];
  		for (var i=0;i<action.qarr.length;i++) {
  			const q=action.qarr[i];
  			if (q==action.q) {
  				querys.push({corpus:action.corpus,q
            ,matches:action.matches
            ,filtered:action.filtered||action.matches
            ,count:action.count,now:0,phrasepostings:action.phrasepostings});
  				continue;
  			}
  			var query=state.filter((item)=>item.q==q);
  			if (query.length) querys.push(query[0]); //reuse old query
  		}
      localStorage.setItem("accelon2016_querys",querys.map((q)=>q.q).join("\n"));
  		return querys;
    case SET_FILTERED:
      var newstate=state.slice();
      var query=newstate[action.n];
      if (!query)return state;
      var now=query.now;
      if (now>=action.filtered.length) now=action.filtered.length-1;
      if (now<0)now=0;
      newstate[action.n]=Object.assign({},query,{filtered:action.filtered,now});
      return newstate;
  	case SET_OCCUR:
      var newstate=state.slice();
      var query=newstate[action.n];
      if (!query)return state;
      if (action.now>=0 && action.now<query.filtered.length) {
        newstate[action.n]=Object.assign({},query,{now:action.now});
        return newstate;
      }
      console.error("set occur wrong value",action.now);
      return state;
  	default:
    	return state;
  }
}