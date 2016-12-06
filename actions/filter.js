const UPDATE_EXCLUDE = 'UPDATE_EXCLUDE';
const SET_FILTERED = 'SET_FILTERED';
const {openCorpus}=require("ksana-corpus");
const kcs=require("ksana-corpus-search")
const {updateResultView}=require("./occur");

const filterMatch=function(corpus,matches,excludegroup){
	const cor=openCorpus(corpus)
	if (!cor)return;
	return kcs.filterMatch(cor,matches,excludegroup);
}

const setExclude=(group,value)=>(dispatch,getState)=>{
	const corpus=getState().activeCorpus;
	dispatch({type:UPDATE_EXCLUDE,corpus,group,corpus,value});

  const n=getState().activeQuery;
	var exclude=(getState().filters[corpus]||{}).exclude;
	const matches=getState().querys[n].matches;
	if (!matches)return;
	exclude[group]=value;
  const filtered=filterMatch(corpus,matches,exclude);
	dispatch({type:SET_FILTERED, filtered, n });
	
	const query=getState().querys[ getState().activeQuery];

	if (query) updateResultView(query,dispatch,getState().excerpts);
}

module.exports={UPDATE_EXCLUDE,SET_FILTERED,setExclude,filterMatch};