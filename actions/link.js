const {findArticleByCorpus}=require("./article");
const {openCorpus}=require("ksana-corpus");
const strstr=require("ksana-corpus-search").strstr;
const {articleSubstr,posFromIndex,fromLogicalPos}=require("../units/quote");
const {UPDATE_ARTICLE}=require("./article");
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

	const range=cor.makeKRange(start,end);
	const address=cor.stringify(range);
	const obj=Object.assign({},{type:UPDATE_ARTICLE},article,{address});
  dispatch(obj);
}
module.exports={findOrigin};
