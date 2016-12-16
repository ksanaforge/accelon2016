const {findArticleByCorpus,_fetchArticle}=require("./article");
const {openCorpus,bsearch}=require("ksana-corpus");
const {strstr}=require("ksana-corpus-search");
const {makeWLinkId}=require("../units/link");

const {articleSubstr,posFromIndex,fromLogicalPos}=require("../units/quote");
const {UPDATE_ARTICLE}=require("./article");
const SET_ACTIVE_WLINK="SET_ACTIVE_WLINK";
const findOrigin=(tofind,sourcecorpus,searchfrom)=>(dispatch,getState)=>{
	const articles=getState().articles;
	const at=findArticleByCorpus(articles,sourcecorpus);
	if (at<0)return;
	const article=articles[at];
	const cor=openCorpus(sourcecorpus);
	const r=articleSubstr(cor,article,searchfrom);
	const layout=cor.layoutText(r.lines,r.from);
	const hit=strstr(layout.lines.join("\n"),tofind);
	if (!hit.length) return;

	const linech1=posFromIndex(hit[0][0],layout.lines);
	const linech2=posFromIndex(hit[0][1],layout.lines);
	const start=layout.linebreaks[linech1.line];
	const end=layout.linebreaks[linech2.line];

	const range=cor.makeKRange(start,end+cor.addressPattern.maxchar);
	const address=cor.stringify(range);
	const obj=Object.assign({},{type:UPDATE_ARTICLE},article,{address});
  dispatch(obj);
}

const nextWLink=(corpus,workinglinks,from)=>(dispatch,getState)=>{
	const cor=openCorpus(corpus);
	const r=cor.parseRange(from);

	const at=bsearch(workinglinks.pos,r.start+1,true);
	if (at==-1)return;

	const articles=getState().articles;
	const ncorpus=findArticleByCorpus(articles,corpus);

	const article=articles[ncorpus];
	if (!article)return;


	const address=cor.stringify(workinglinks.pos[at],workinglinks.pos[at]+3);
	if (workinglinks.pos[at]>article.article.end) {
		alert("no more working link, goto next article");
		return;
	}

	const article2=(ncorpus==1)?articles[2]:articles[1];

	const id=makeWLinkId(workinglinks.pos[at],workinglinks.value[at]);
	const obj=Object.assign({},{type:UPDATE_ARTICLE},article,{address});
	dispatch(obj);


  _fetchArticle(article2.corpus,workinglinks.value[at],dispatch,UPDATE_ARTICLE,article2.id);
	dispatch(setActiveWLink(id));
}
const setActiveWLink=(id)=>{
	return {type:SET_ACTIVE_WLINK, id};
}
module.exports={findOrigin,setActiveWLink,SET_ACTIVE_WLINK,nextWLink};