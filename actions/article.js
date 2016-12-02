/*actions for active article*/
const ksanacorpus=require("ksana-corpus");

const TOGGLE_LAYOUT = 'TOGGLE_LAYOUT';
const UPDATE_ARTICLE='UPDATE_ARTICLE';

const getActiveArticle=(state)=>state.articles[state.activeArticle];

const toggleLayout=()=>(dispatch,getState)=>{
	const active=getActiveArticle(getState());
	active&&dispatch({type:TOGGLE_LAYOUT,id:active.id});
};
const newid=()=> 'a'+Math.floor(Math.random()*100000000);

const _fetchArticle=(corpus,address,dispatch,type,id)=>{
	ksanacorpus.openCorpus(corpus,(err,cor)=>{
		if (!err) {
			const article=cor.articleOf(address);
      if (article){
      	const articleFields=cor.meta.articleFields||[];
      	id=id||newid();
        cor.getArticleTextTag( article.at, articleFields , (res)=>{
          dispatch({type,corpus,address,id,
            article,title:article.articlename,text:res.text,fields:res.fields});
        });
      } else {
        dispatch({type: FETCH_FAILED,corpus,address});
      }
		}
	});
}

const nextprevArticle=(dispatch,getState,nav)=>{
	const active=getActiveArticle(getState());
	if (!active)return;
	const cor=ksanacorpus.openCorpus(active.corpus);
	if (!cor)return;//should be open
	const next=cor.getArticle(active.article.at,nav)
	if (!next) return;
	const address=cor.stringify(next.start);
	_fetchArticle(active.corpus,address,dispatch,UPDATE_ARTICLE,active.id)
};
const nextArticle=()=>(dispatch,getState)=>{
	nextprevArticle(dispatch,getState,1);
}
const prevArticle=()=>(dispatch,getState)=>{
	nextprevArticle(dispatch,getState,-1);
};
const updateArticleByAddress=(address)=>(dispatch,getState)=>{
	const active=getActiveArticle(getState());
	if (!active)return;
	const cor=ksanacorpus.openCorpus(active.corpus);
	if (!cor)return;//should be open

	const article=cor.articleOf(address);
	if (typeof address=="number") address=cor.stringify(address);
	if (article.at!==active.article.at) {
		_fetchArticle(active.corpus,address,dispatch,UPDATE_ARTICLE,active.id);
	} else {//don't need to fetch 
    dispatch({type:UPDATE_ARTICLE,corpus:active.corpus,address,id:active.id,
            article,title:article.articlename,text:active.text});
	}
}
module.exports={TOGGLE_LAYOUT,UPDATE_ARTICLE,
	toggleLayout,nextArticle,prevArticle,_fetchArticle,updateArticleByAddress};
