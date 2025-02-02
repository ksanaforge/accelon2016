const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
const SET_ACTIVE_ARTICLE = 'SET_ACTIVE_ARTICLE'; //for linker mode
const OPEN_AT = 'OPEN_AT';
const FETCH_FAILED = 'FETCH_FAILED';
const CLOSE_ARTICLE = 'CLOSE_ARTICLE';
const CLONE_ARTICLE = 'CLONE_ARTICLE';
const {findArticle,newid,_fetchArticle}=require("./article");

const openAt= (opts) => (dispatch,getState) => {
  var index=getState().articles.length;
  _fetchArticle(opts.corpus,opts.address,dispatch,OPEN_AT);
  dispatch({type:SET_ACTIVE_TAB,index});  
}

const setActiveArticle=(id)=> (dispatch,getState)=>{
	const index=findArticle(getState().articles,id);
	if (index>-1) {
		dispatch({type:SET_ACTIVE_TAB,index});
	}
};

const closeArticle=(id)=> (dispatch,getState)=>{
	const articles=getState().articles;
	var index=findArticle(articles,id);

	dispatch({type:CLOSE_ARTICLE,id});

	if (articles.length-1==index) index--;
	if (index>-1) {
		dispatch({type:SET_ACTIVE_TAB,index});
	}
}

const cloneArticle=(clonefrom)=>(dispatch,getState)=>{
	const address=getState().selections[clonefrom].caretposH;
	dispatch({type:CLONE_ARTICLE,id:newid(),clonefrom,address});

	const articles=getState().articles;
	const index=articles.length-1;
	dispatch({type:SET_ACTIVE_TAB,index});
}
module.exports={
  OPEN_AT,FETCH_FAILED,SET_ACTIVE_TAB,SET_ACTIVE_ARTICLE,CLOSE_ARTICLE,CLONE_ARTICLE
  ,openAt,setActiveArticle,closeArticle,cloneArticle};