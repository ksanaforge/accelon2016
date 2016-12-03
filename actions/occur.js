const SET_HIGHLIGHT='SET_HIGHLIGHT',SET_OCCUR="SET_OCCUR";
const {_fetchArticle}=require("./article");
const {listExcerpts}=require("./excerpts");
const {openCorpus}=require("ksana-corpus");
function updateHighlight(querys,n,dispatch) {
	setTimeout(()=>{
		const query=querys[n];
		if (query.matches && query.matches[query.now]) {
			const start=query.matches[query.now][0];
			const len=query.matches[query.now][1]-start;
			dispatch({type:SET_HIGHLIGHT,start,len});		
		}
	},1);
}
const updateResultView=function(query,dispatch,stateExcerpts){
	if (!query || !query.matches || !query.matches.length)  return;
  const corpus=query.corpus;
  if (!corpus)return;
  const cor=openCorpus(corpus);
  if (!cor) return;

  cor.fromTPos(query.matches[query.now],function({kpos}){
	  const address=cor.stringify(kpos[0]);
	  _fetchArticle(corpus,address,dispatch,"UPDATE_ARTICLE","resultview");
	  listExcerpts(cor,query,dispatch,stateExcerpts);
  });
}

const nextprev=(dispatch,getState,adv)=>{
	const activeQuery=getState().activeQuery;
	const query=getState().querys[activeQuery];
	if (!query)return;

	var now=query.now+adv;
	if (now<0) now=query.matches.length-1;
	if (now>=query.matches.length) now=0;

	dispatch({type:SET_OCCUR,n:activeQuery,now});
	query.now=now;
	updateResultView(query,dispatch,getState().excerpts);
}

function nextOccur() {
	return (dispatch,getState) => nextprev(dispatch,getState,1);
}
function prevOccur(){
	return (dispatch,getState) => nextprev(dispatch,getState,-1);
}


module.exports={SET_HIGHLIGHT,SET_OCCUR,nextOccur,prevOccur,updateHighlight
,updateResultView};