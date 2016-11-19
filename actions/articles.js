const OPEN_AT = 'OPEN_AT';
const SET_ACTIVE_ARTICLE = 'SET_ACTIVE_ARTICLE';
const FETCH_FAILED = 'FETCH_FAILED';
const CLOSE_ARTICLE = 'CLOSE_ARTICLE';
const {fetchArticle}=require("./article");
const openAt= (opts) => (dispatch) => {
  fetchArticle(opts.corpus,opts.address,dispatch,OPEN_AT);
}

const setActiveArticle=(id)=>({type:SET_ACTIVE_ARTICLE,id});

const closeArticle=(id)=>({type:CLOSE_ARTICLE,id});
module.exports={
  OPEN_AT,FETCH_FAILED,SET_ACTIVE_ARTICLE,CLOSE_ARTICLE
  ,openAt,setActiveArticle,closeArticle};