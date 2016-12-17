const SET_SELECTION = 'SET_SELECTION';
const CLEAR_SELECTION='CLEAR_SELECTION';
const {SET_ACTIVE_ARTICLE}=require("./articles");

const findArticleById=function(articles,id){
	for (let i=0;i<articles.length;i++) {
		if (articles[i].id===id) return i;
	}
	return -1;
}
const setSelection=(opts)=>(dispatch,getState)=>{
	dispatch(Object.assign({},{type:SET_SELECTION},opts));
	const articles=getState().articles;
	if (articles[getState().activeArticle].id!==opts.id){
		const index=findArticleById(articles,opts.id);
		if (index>-1) dispatch({type:SET_ACTIVE_ARTICLE, index});
	}
}


const clearSelection=()=>({type:CLEAR_SELECTION});

module.exports={SET_SELECTION,CLEAR_SELECTION,
	setSelection,clearSelection};
