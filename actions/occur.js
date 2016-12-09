const SET_HIGHLIGHT='SET_HIGHLIGHT',SET_OCCUR="SET_OCCUR" ;
const {_fetchArticle}=require("./article");
const {listExcerpts}=require("./excerpts");

const {openCorpus}=require("ksana-corpus");
function updateHighlight(querys,n,dispatch) {
	setTimeout(()=>{
		const query=querys[n];
		if (query.filtered && query.filtered[query.now]) {
			const start=query.filtered[query.now][0];
			const len=query.filtered[query.now][1]-start;
			dispatch({type:SET_HIGHLIGHT,start,len});		
		}
	},1);
}

const updateResultView=function(query,dispatch,stateExcerpts){
	if (!query || !query.filtered)  return;
  const corpus=query.corpus;
  if (!corpus)return;
  const cor=openCorpus(corpus);
  if (!cor) return;
  var now=query.now;
  if (!query.filtered.length) {
		 listExcerpts(cor,query,dispatch,stateExcerpts);
  } else {
	  cor.fromTPos(query.filtered[now],function({kpos}){
		  const address=cor.stringify(kpos[0]);
		  _fetchArticle(corpus,address,dispatch,"UPDATE_ARTICLE","resultview");
		  listExcerpts(cor,query,dispatch,stateExcerpts);
	  });  	
  }
}

const nextprev=(dispatch,getState,adv)=>{
	const activeQuery=getState().activeQuery;
	const query=getState().querys[activeQuery];
	if (!query)return;

	var now=query.now+adv;
	if (now<0) now=query.filtered.length-1;
	if (now>=query.filtered.length) now=0;

	query.now=now;
	updateResultView(query,dispatch,getState().excerpts);

	dispatch({type:SET_OCCUR,n:activeQuery,now});
}

function nextOccur() {
	return (dispatch,getState) => nextprev(dispatch,getState,1);
}
function prevOccur(){
	return (dispatch,getState) => nextprev(dispatch,getState,-1);
}
function goOccur(now){
	return (dispatch,getState) =>{
		const activeQuery=getState().activeQuery;
		var query=getState().querys[activeQuery];
		if (!query)return;
		query=getState().querys[activeQuery];
		query.now=now;
		updateResultView(query,dispatch,getState().excerpts);	
	//set_occur after updateresultview , 
	//otherwise onCursorActivity will be trigger before content is updated.
		dispatch({type:SET_OCCUR,n:activeQuery,now});
	}
}

module.exports={SET_HIGHLIGHT,SET_OCCUR,nextOccur,prevOccur,updateHighlight
,updateResultView,goOccur};