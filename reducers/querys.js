const {SEARCH_DONE}=require("../actions/search");
const {SET_OCCUR}=require("../actions/occur");

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
            ,matches:action.matches,count:action.count
            ,now:0,phrasepostings:action.phrasepostings});
  				continue;
  			}
  			const at=state.filter((item)=>item.q==q);
  			if (at.length) querys.push(at[0]);
  		}
      localStorage.setItem("accelon2016_querys",querys.map((q)=>q.q).join("\n"));
  		return querys;
  	case SET_OCCUR:
      var newstate=state.slice();
      const query=newstate[action.n];
      if (!query)return state;
      query.now=action.now;
      return newstate;
  	default:
    	return state;
  }
}