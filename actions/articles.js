const OPEN_AT = 'OPEN_AT';
const SET_ACTIVE_ARTICLE = 'SET_ACTIVE_ARTICLE';
const OPEN_AT_FAILED = 'OPEN_AT_FAILED';
const ksanacorpus=require("ksana-corpus");

const openAt=function(opts){
  return dispatch => {
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
}

const setActiveArticle=function(seq,oldseq){
  return {type:SET_ACTIVE_ARTICLE,seq};
}

module.exports={OPEN_AT,OPEN_AT_FAILED,openAt,setActiveArticle,SET_ACTIVE_ARTICLE};