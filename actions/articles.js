const OPEN_AT = 'OPEN_AT';
const SET_ACTIVE_ARTICLE = 'SET_ACTIVE_ARTICLE';
const OPEN_AT_FAILED = 'OPEN_AT_FAILED';
const CLOSE_ARTICLE = 'CLOSE_ARTICLE';
const ksanacorpus=require("ksana-corpus");

const openAt= (opts) => (dispatch) => {
	ksanacorpus.openCorpus(opts.corpus,(err,cor)=>{
		if (!err) {
			const article=cor.articleOf(opts.address);
      if (article){
        cor.getArticleText( article.at, text=>{
          dispatch({type: OPEN_AT,corpus:opts.corpus,address:opts.address,
            article,title:article.articlename,text});
        });
      } else {
        dispatch({type: OPEN_AT_FAILED,corpus:opts.corpus,address:opts.address});
      }
		}
	});
}

const setActiveArticle=(id)=>({type:SET_ACTIVE_ARTICLE,id});

const closeArticle=(id)=>({type:CLOSE_ARTICLE,id});

module.exports={OPEN_AT,OPEN_AT_FAILED,SET_ACTIVE_ARTICLE,CLOSE_ARTICLE,
  openAt,setActiveArticle,closeArticle};