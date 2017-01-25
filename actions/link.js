const {findArticleByCorpus,_fetchArticle}=require("./article");
const {openCorpus,bsearch}=require("ksana-corpus");
const {strstr}=require("ksana-corpus-search");

const {saveAddress}=require("../units/saveaddress");
const {articleSubstr,posFromIndex,fromLogicalPos}=require("../units/quote");
const {UPDATE_ARTICLE}=require("./article");
const SET_ACTIVE_WLINK="SET_ACTIVE_WLINK";
const MAX_ELAPSE=5*60*1000;//max 5 minutes

const makeWLinkId=function(kpos,address){
	return kpos.toString(36) +"_"+address.replace(/.+@/,"");
}

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
	
	var at=bsearch(workinglinks.pos,r.start+1,true);
	if (at==-1)return;

	const activeWLink=getState().activeWLink;

	const articles=getState().articles;
	const ncorpus=findArticleByCorpus(articles,corpus);

	const article=articles[ncorpus];
	if (!article)return;
	const userlinks=getState().userLink[corpus];
	//check if id already in userlink
	var linkid=makeWLinkId(workinglinks.pos[at],workinglinks.value[at]);

	//corpus address point to current working link, go to next
	if (linkid==activeWLink && at<workinglinks.pos.length) { 
		at++;
	}

	while (userlinks&&userlinks[linkid]) {
		at++;
		linkid=makeWLinkId(workinglinks.pos[at],workinglinks.value[at]);
	}

	if (at>=workinglinks.length || workinglinks.pos[at]>article.article.end) {
		alert("no more working link, goto next article");
		return;
	}

	var address=cor.stringify(workinglinks.pos[at],workinglinks.pos[at]+3);

	const article2=(ncorpus==1)?articles[2]:articles[1];

	var id=makeWLinkId(workinglinks.pos[at],workinglinks.value[at]);


	const obj=Object.assign({},{type:UPDATE_ARTICLE},article,{address});
	dispatch(obj);

  _fetchArticle(article2.corpus,workinglinks.value[at],dispatch,UPDATE_ARTICLE,article2.id);
	dispatch(setActiveWLink(id));
	
	saveAddress(corpus,address);
	saveAddress(article2.corpus,workinglinks.value[at]);
}
const setActiveWLink=(id)=>{
	return {type:SET_ACTIVE_WLINK, id};
}
const getCorpusSelection=(selections,corpus)=>{
	for (let i in selections) {
		if (selections[i].corpus==corpus) return selections[i].ranges[0];
	}
	return 0;
}
const makeLink=(databinding,createtime,user)=>(dispatch,getState)=>{
	const articles=getState().articles;
	const article1=articles[1], article2=articles[2];
	const id=getState().activeWLink;
	if (!id || !databinding) return;
	var elapsed=new Date()-createtime;
	if (elapsed>MAX_ELAPSE) elapsed=MAX_ELAPSE;
	const sel1=getCorpusSelection(getState().selections,article1.corpus);
	const sel2=getCorpusSelection(getState().selections,article2.corpus);
	if (!sel1||!sel2)return;

	const cor1=openCorpus(article1.corpus);
	const cor2=openCorpus(article2.corpus);

	databinding(article1.corpus,article1.article.at,article2.corpus).child(id).set({
		from:cor1.stringify(sel1),to:cor2.stringify(sel2), elapsed, user
	});
	databinding(article2.corpus,article2.article.at,article1.corpus).child(id).set({
		from:cor2.stringify(sel2),to:cor1.stringify(sel1), elapsed, user
	});
	dispatch(setActiveWLink(""));
}
const deleteLink=(databinding)=>(dispatch,getState)=>{
	const id=getState().activeWLink;

	const articles=getState().articles;
	const article1=articles[1], article2=articles[2];

	const userlink1=getState().userLink[article1.corpus];
	const userlink2=getState().userLink[article2.corpus];

	databinding(article1.corpus,article1.article.at,article2.corpus).child(id).remove();
	databinding(article2.corpus,article2.article.at,article1.corpus).child(id).remove();

	dispatch(setActiveWLink(""));
}

module.exports={findOrigin,setActiveWLink,SET_ACTIVE_WLINK,nextWLink,makeLink,deleteLink};