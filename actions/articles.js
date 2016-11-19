const OPEN_AT = 'OPEN_AT';
const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
const FETCH_FAILED = 'FETCH_FAILED';
const CLOSE_ARTICLE = 'CLOSE_ARTICLE';
const {_fetchArticle}=require("./article");
const openAt= (opts) => (dispatch,getState) => {
  _fetchArticle(opts.corpus,opts.address,dispatch,OPEN_AT);
  //cause flickering
  dispatch({type:SET_ACTIVE_TAB,index:getState().articles.length});
}

const findArticle=(articles,id)=>{
	for (let i=0;i<articles.length;i++) {
		if (articles[i].id==id) return i;
	}
	return -1;
}
const setActiveArticle=(id)=> (dispatch,getState)=>{
	const index=findArticle(getState().articles,id);
	if (index>-1) dispatch({type:SET_ACTIVE_TAB,index});
};

const closeArticle=(id)=> (dispatch,getState)=>{
	const articles=getState().articles;
	var index=findArticle(articles,id);

	dispatch({type:CLOSE_ARTICLE,id});

	if (articles.length-1==index) index--;
	if (index>-1) dispatch({type:SET_ACTIVE_TAB,index});
}

module.exports={
  OPEN_AT,FETCH_FAILED,SET_ACTIVE_TAB,CLOSE_ARTICLE
  ,openAt,setActiveArticle,closeArticle};