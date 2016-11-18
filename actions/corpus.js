const OPEN_CORPUS_SUCCESS = 'OPEN_CORPUS_SUCCESS';
const OPEN_CORPUS_FAILED = 'OPEN_CORPUS_FAILED';
const ksanacorpus=require("ksana-corpus");

const openCorpus=(corpus)=> {
  return dispatch => {
  	ksanacorpus.openCorpus(corpus,(err,cor)=>{
  		if (err) {
  			dispatch({type: OPEN_CORPUS_FAILED,corpus,err});
  		} else {
		  	dispatch({type: OPEN_CORPUS_SUCCESS,corpus,cor}); 
  		}
		});
	}
}

module.exports={OPEN_CORPUS_SUCCESS,OPEN_CORPUS_FAILED,openCorpus};