const  {SHOW_EXCERPT} = require('../actions/excerpts');

const initialState={excerpts:[
	{text:"a\na\na"}
	,{text:"b\nb\nb"}
	,{text:"c\nc\nc"}
	,{text:"d\nd\nd"}
	,{text:"e\ne\ne"}

	]};
module.exports=function Excerpt(state = initialState , action = {}) {
  if (SHOW_EXCERPT===action.type) {
  	return {excerpts:action.excerpts,query:action.query,batch:action.batch};
  } else {
  	return state;
  }
};