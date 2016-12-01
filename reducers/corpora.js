const  { OPEN_CORPUS_SUCCESS,OPEN_CORPUS_FAILED } = require('../actions/corpus');

module.exports=function Corpora(state = {} , action = {}) {
  switch (action.type) {
  case OPEN_CORPUS_SUCCESS:
  	var r=Object.assign({},state);
  	r[action.corpus] = {ready:true};
    return r;
  case OPEN_CORPUS_FAILED:
  	var r=Object.assign({},state);
  	delete r[action.corpus];
    return r;
  default:
    return state;
  }
};