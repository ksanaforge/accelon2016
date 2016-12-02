const {SEARCH_DONE}=require("../actions/search");
const {NEXT_OCCUR,PREV_OCCUR}=require("../actions/occur");

var querys="菩薩道\n如來 當然";

querys= (localStorage.getItem("accelon2016_querys")||querys).split("\n");
const initialState=querys.map((q)=>({q,count:0,matches:[],now:-1}));

const nextprev=(querys,n,adv)=>{
  if (!querys[n]) return querys;
  var newstate=querys.slice();
  const query=querys[n];
	var now=query.now+adv;
	if (now<0) now=query.matches.length-1;
	if (now>=query.matches.length) now=0;
  newstate[n].now=now;
  return newstate;
}
module.exports=function querys(state = initialState, action = {}) {
  switch (action.type) {
  	case SEARCH_DONE:
  		var querys=[];
  		for (var i=0;i<action.qarr.length;i++) {
  			const q=action.qarr[i];
  			if (q==action.q) {
  				var count=action.matches.length;
  				if (action.matches.length==0) count=-1;
  				querys.push({q,matches:action.matches,count,now:0});
  				continue;
  			}
  			const at=state.filter((item)=>item.q==q);
  			if (at.length) querys.push(at[0]);
  		}
      localStorage.setItem("accelon2016_querys",querys.map((q)=>q.q).join("\n"));
  		return querys;
  	case NEXT_OCCUR:
  		return nextprev(state,action.n,1);
  	case PREV_OCCUR:
  		return nextprev(state,action.n,-1);
  	default:
    	return state;
  }
}