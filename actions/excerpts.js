const SHOW_EXCERPT="SHOW_EXCERPT";
const {fetchExcerpts}=require("ksana-corpus-search/excerpt");
const hitperbatch=10;

const listExcerpts=function(cor,query,dispatch,stateExcerpts){
	const batch=Math.floor( (query.now||0) / hitperbatch);
	if (batch==stateExcerpts.batch && stateExcerpts.query==query) return;//nothing to do
	var tpos=[];
	
	for (let i=0;i<hitperbatch;i++) {
		const at=hitperbatch*batch+i;
		if (at>=query.matches.length) break;
		tpos.push(query.matches[at]);
	}

	fetchExcerpts(cor,{tpos,line:3,phrasepostings:query.phrasepostings},function(excerpts){
		dispatch({type:SHOW_EXCERPT, excerpts, batch, query, hitperbatch})
	});
}
module.exports={listExcerpts,SHOW_EXCERPT,hitperbatch};