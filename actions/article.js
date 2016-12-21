/*actions for active article*/
const {openCorpus,parseLink}=require("ksana-corpus");
const TOGGLE_LAYOUT = 'TOGGLE_LAYOUT';
const UPDATE_ARTICLE='UPDATE_ARTICLE';
const {saveAddress}=require("../units/saveaddress");
const getActiveArticle=(state)=>state.articles[state.activeArticle];

const toggleLayout=()=>(dispatch,getState)=>{
	const active=getActiveArticle(getState());
	active&&dispatch({type:TOGGLE_LAYOUT,id:active.id});
};
const newid=()=> 'a'+Math.floor(Math.random()*100000000);

const _fetchArticle=(corpus,address,dispatch,type,id)=>{
	openCorpus(corpus,(err,cor)=>{
		if (!err) {
			const article=cor.articleOf(address);
      if (article){
      	const articleFields=cor.meta.articleFields||[];
      	id=id||newid();
        cor.getArticleTextTag( article.at, articleFields , (res)=>{
      	    dispatch({type,corpus,address,id,
            article,title:cor.getTitle(address),rawlines:res.text,fields:res.fields});
        });
				saveAddress(corpus,address);
      } else {
        dispatch({type: FETCH_FAILED,corpus,address});
      }
		}
	});
}
const fetchArticle=(corpus,address,type,id)=>(dispatch,getState)=>{
	_fetchArticle(corpus,address,dispatch,type,id);
}

const nextprevArticle=(dispatch,getState,now,nav)=>{
	var active=now;
	if (typeof now=="number") {
		active=getState().articles[now];
	}
	if (typeof now=="undefined") {
		active=getActiveArticle(getState());	
	}
	
	if (!active)return;
	const cor=openCorpus(active.corpus);
	if (!cor)return;//should be open
	const next=cor.getArticle(active.article.at,nav)
	if (!next) return;
	const address=cor.stringify(next.start);
	_fetchArticle(active.corpus,address,dispatch,UPDATE_ARTICLE,active.id)
};
const nextArticle=(now)=>(dispatch,getState)=>{
	nextprevArticle(dispatch,getState,now,1);
}
const prevArticle=(now)=>(dispatch,getState)=>{
	nextprevArticle(dispatch,getState,now,-1);
};
const goArticle=(corpus,narticle,id)=>(dispatch,getState)=>{
	openCorpus(corpus,(err,cor)=>{
		const article=cor.getArticle(narticle);
		if (!article)return;
		_fetchArticle(corpus,article.start,dispatch,UPDATE_ARTICLE,id);
	});
}
const findArticleByCorpus=(articles,corpus)=>{
	for (let i=0;i<articles.length;i++) {
		if (articles[i].corpus==corpus) return i;
	}
	return -1;
}
const findArticle=(articles,id)=>{
	for (let i=0;i<articles.length;i++) {
		if (articles[i].id==id) return i;
	}
	return -1;
}


const openLink=(fulladdress)=>(dispatch,getState)=>{
	parseLink(fulladdress,function({corpus,address}){
		const r=fulladdress.split("@");
		if (r.length!==2)return;
		const articles=getState().articles;
		const at=findArticleByCorpus(articles,corpus);
		if (at<0) return;
		const id=articles[at].id;
		_fetchArticle(corpus,address,dispatch,UPDATE_ARTICLE,id);
	});
}

const updateArticleByAddress=(address,aart)=>(dispatch,getState)=>{
	var active;
	const articles=getState().articles;
	if (typeof aart=="undefined") {
		active=getActiveArticle(getState());
	} else {
		if (typeof aart=="string")	 {
			const at=findArticle(articles,aart);
			if (at>=0) active=articles[at];
		} else {
			active=articles[aart];
		}
	}

	if (!active) {
		console.error("no such article")
		return;
	}

	const cor=openCorpus(active.corpus);
	if (!cor)return;//should be open

	const article=cor.articleOf(address);

	if (typeof address=="number") address=cor.stringify(address);
	if (article.at!==active.article.at) {
		_fetchArticle(active.corpus,address,dispatch,UPDATE_ARTICLE,active.id);
	} else {//don't need to fetch 
    dispatch({type:UPDATE_ARTICLE,corpus:active.corpus,address,id:active.id,
    				fields:active.fields,
            article,title:cor.getTitle(address),rawlines:active.rawlines});
	}
}
module.exports={TOGGLE_LAYOUT,UPDATE_ARTICLE,fetchArticle,goArticle,openLink,
	findArticle,findArticleByCorpus,
	toggleLayout,nextArticle,prevArticle,_fetchArticle,updateArticleByAddress,newid};
