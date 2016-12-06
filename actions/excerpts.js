const SHOW_EXCERPT="SHOW_EXCERPT";
const {fetchExcerpts}=require("ksana-corpus-search/excerpt");

const {openCorpus}=require("ksana-corpus");
const kcs=require("ksana-corpus-search");

const hitperbatch=20;

const listExcerpts=function(cor,query,dispatch,stateExcerpts){
	const batch=Math.floor( (query.now||0) / hitperbatch);
	if (batch==stateExcerpts.batch && stateExcerpts.query==query) return;//nothing to do
	var tpos=[];
	var filtered=query.filtered||[];
	for (let i=0;i<hitperbatch;i++) {
		const at=hitperbatch*batch+i;
		if (at>=filtered.length) break;
		tpos.push(filtered[at]);
	}

	fetchExcerpts(cor,{tpos,line:3,phrasepostings:query.phrasepostings},function(excerpts){
		dispatch({type:SHOW_EXCERPT, excerpts, batch, query, hitperbatch})
	});
}
module.exports={listExcerpts,SHOW_EXCERPT,hitperbatch};