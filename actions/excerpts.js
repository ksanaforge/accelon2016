const SHOW_EXCERPT="SHOW_EXCERPT";
const SET_EXCERPT_LINE="SET_EXCERPT_LINE";
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
	const line=stateExcerpts.excerptline;
	fetchExcerpts(cor,{tpos,line,phrasepostings:query.phrasepostings},function(excerpts){
		dispatch({type:SHOW_EXCERPT, excerpts, query, hitperbatch})
	});
}
const setExcerptLine=function(line){
	if (!line) line=1;
	if (line>5) line=5;
	if (line==2||line==4) line==3;
	return {type:SET_EXCERPT_LINE, excerptline:line};
}
module.exports={listExcerpts,SHOW_EXCERPT,SET_EXCERPT_LINE,hitperbatch,setExcerptLine};