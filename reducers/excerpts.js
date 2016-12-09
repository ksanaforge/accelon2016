const  {SHOW_EXCERPT,hitperbatch} = require('../actions/excerpts');
/*
{text:"a\na\na"}
	,{text:"b\nb\nb"}
	,{text:"c\nc\nc"}
	,{text:"d\nd\nd"}
	,{text:"e\ne\ne"}
*/
const initialState={
	excerpts:[]
	,query:{count:0}
	,hitperbatch
};
module.exports=function Excerpt(state = initialState , action = {}) {
  if (SHOW_EXCERPT===action.type) {
  	return {excerpts:action.excerpts,query:action.query,
  		hitperbatch:action.hitperbatch};
  } else {
  	return state;
  }
};