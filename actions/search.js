const SEARCHING = 'SEARCHING';
const SEARCH_DONE = 'SEARCH_DONE';
const SET_ACTIVE_QUERY='SET_ACTIVE_QUERY';
const SET_ACTIVE_CORPUS='SET_ACTIVE_CORPUS';
const {SET_HIGHLIGHT,updateHighlight,updateResultView}=require("./occur");
const {openCorpus}=require("ksana-corpus");
const {_fetchArticle}=require("./article");
const {listExcerpts}=require("./excerpts");
const kcs=require("ksana-corpus-search");

function _search(dispatch,getState,qarr,idx){
  const q=qarr[idx];
  if (!q) return;
  var searchtimer=setInterval(()=>{
  	const corpus=getState().activeCorpus;
  	if (!corpus)return;

  	const cor=openCorpus(corpus);
  	if (!cor) return;
  	
    if (getState().searching) {
      console.log("wait searching",getState().searching);
      return;
    }
    clearInterval(searchtimer);
    dispatch({type:SEARCHING,corpus,q,idx});

    kcs.search(cor,q,function(result){
    	const {matches,count,phrasepostings,timer}=result;
      dispatch({type:SEARCH_DONE, corpus,qarr, q ,
        matches,count,phrasepostings,timer,n:idx });

      if (matches.length) {
        cor.fromTPos(matches[0],function({kpos}){
          const address=cor.stringify(kpos[0]);
          _fetchArticle(corpus,address,dispatch,"UPDATE_ARTICLE","resultview");
          listExcerpts(cor,result,dispatch,getState().excerpts);
        });
      }      
    });
  },100);
}

function search(qarr,n) {
  return (dispatch,getState) => {
    const query=getState().querys[n];
    if (!query || query&&query.now==-1 || query.q!==qarr[n]) {
      _search(dispatch,getState,qarr,n);
    } else {
      dispatch({type:SET_ACTIVE_QUERY,n});
      updateResultView(query,dispatch,getState().excerpts);
    }
  };
}
/*
function setActiveQuery(n){
  return (dispatch,getState) => {
  	dispatch({type:SET_ACTIVE_QUERY,n});
    const query=getState().querys[n];
    if (query && query.matches) {
      const m=query.matches[query.now];
      if (m) {
        const start=m[0],len=m[1]-start;
        dispatch({type:SET_HIGHLIGHT,start,len});        
      }
    }
  }
}
*/
function findAll(qarr){
  return (dispatch,getState) => {
    const querys=getState().querys;
    qarr.forEach((q,idx)=>{
      const at=qarr.length-idx-1;
      if (typeof querys[at].count=="undefined" || querys[at].count==0) {
        _search(dispatch,getState,qarr,at);
      }
    });
    dispatch({type:SET_ACTIVE_QUERY,n:0});
  };
}
module.exports={search,findAll,SEARCH_DONE,SEARCHING,SET_ACTIVE_QUERY};