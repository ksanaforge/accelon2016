const React=require("react");
const E=React.createElement;
const GotoAddress=require("./gotoaddress");
const {openCorpus}=require("ksana-corpus");

const selectionOf=(selections,corpus)=>{
	for (var i in selections) {
		const sel=selections[i];
		if (sel.corpus==corpus) return sel.ranges[0];
	}
	return 0;
}

const getActiveArticle=(articles,corpus)=>{
	for (var i=0;i<articles.length;i++) {
		const article=articles[i];
		if (article.corpus==corpus) return i;
	}
	return 0;
}


const LinkerTab=(props)=>{

	const onEnter=(address,corpus)=>{
		const active=getActiveArticle(props.articles,corpus);
		props.updateArticleByAddress(address,active)
	}

	const cor1=openCorpus(props.corpus1);
	const cor2=openCorpus(props.corpus2);
	const sel1=selectionOf(props.selections,props.corpus1);
	const sel2=selectionOf(props.selections,props.corpus2);
	const value1=cor1.stringify(sel1);
	const value2=cor2.stringify(sel2);
	return E("div",{},
		E(GotoAddress,{corpus:props.corpus1,value:value1,onEnter}),
		E(GotoAddress,{corpus:props.corpus2,value:value2,onEnter})
	);
}
module.exports=LinkerTab;