/*actions for active article*/
const ksanacorpus=require("ksana-corpus");

const TOGGLE_LAYOUT = 'TOGGLE_LAYOUT';
const UPDATE_ARTICLE='UPDATE_ARTICLE';

const getActiveArticle=(articles)=>articles.filter((a)=>a.active)[0];
const toggleLayout=()=>(dispatch,getState)=>{
	const active=getActiveArticle(getState().articles);
	active&&dispatch({type:TOGGLE_LAYOUT,id:active.id});
};

const fetchArticle=(corpus,address,dispatch,type,id)=>{
	ksanacorpus.openCorpus(corpus,(err,cor)=>{
		if (!err) {
			const article=cor.articleOf(address);
      if (article){
        cor.getArticleText( article.at, text=>{
          dispatch({type,corpus,address,id,
            article,title:article.articlename,text});
        });
      } else {
        dispatch({type: FETCH_FAILED,corpus,address});
      }
		}
	});
}

const nextprevArticle=(dispatch,getState,nav)=>{
	const active=getActiveArticle(getState().articles);
	if (!active)return;
	const cor=ksanacorpus.openCorpus(active.corpus);
	if (!cor)return;//should be open
	const next=cor.getArticle(active.article.at,nav)
	if (!next) return;
	const address=cor.stringify(next.start);
	fetchArticle(active.corpus,address,dispatch,UPDATE_ARTICLE,active.id)
};
const nextArticle=()=>(dispatch,getState)=>{
	nextprevArticle(dispatch,getState,1);
}
const prevArticle=()=>(dispatch,getState)=>{
	nextprevArticle(dispatch,getState,-1);
};

module.exports={TOGGLE_LAYOUT,UPDATE_ARTICLE,
	toggleLayout,nextArticle,prevArticle,fetchArticle};
