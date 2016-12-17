const React=require("react");
const E=React.createElement;
const GotoAddress=require("./gotoaddress");
const {openCorpus}=require("ksana-corpus");
const ArticleNav=require("./articlenav");
const WLinkBuilder=require("./wlinkbuilder");
const WLinkEditor=require("./wlinkeditor");
const WLinkNav=require("./wlinknav");
const User=require("./user");
var user="";

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

	const next1=()=>{props.nextArticle(props.leftarticle)};
	const next2=()=>{props.nextArticle(props.rightarticle)};
	const prev1=()=>{props.prevArticle(props.leftarticle)};
	const prev2=()=>{props.prevArticle(props.rightarticle)};

	const change1=(n)=>{props.goArticle(props.corpus1,parseInt(n,10)-1,props.leftarticle.id)};
	const change2=(n)=>{props.goArticle(props.corpus2,parseInt(n,10)-1,props.rightarticle.id)};

	const onNextWLink=(address)=>{
		props.nextWLink(props.corpus1,props.workinglinks,address);
	}
	const onMakeLink=(createtime)=>{
		props.makeLink(props.remotedata.binding,createtime,user);
	}
	const onDeleteLink=()=>{
		props.deleteLink(props.remotedata.binding);	
	}
	const linkEditable=()=>{
		if (!props.leftuserlink)return false;
		const lnk=props.leftuserlink[props.activeWLink] ;
		return lnk && lnk.user==user;
	}
	const cor1=openCorpus(props.corpus1);
	const cor2=openCorpus(props.corpus2);
	const sel1=selectionOf(props.selections,props.corpus1);
	const sel2=selectionOf(props.selections,props.corpus2);
	const value1=cor1.stringify(sel1);
	const value2=cor2.stringify(sel2);
	const now1=props.leftarticle.article.at;
	const now2=props.rightarticle.article.at;
	const total1=cor1.articleCount();
	const total2=cor2.articleCount();
	const linkable=value1.indexOf("-")>-1&&value2.indexOf("-")>-1&&props.activeWLink;//has range

	const onSetUser=(_user)=>{
		console.log("setuser",user)
		user=_user;
	}
	return E("div",{},
		E(GotoAddress,{corpus:props.corpus1,value:value1,onEnter}),
		E(ArticleNav,{editable:true,now:now1,total:total1,onNext:next1,onPrev:prev1,onChange:change1}),
		E(GotoAddress,{corpus:props.corpus2,value:value2,onEnter}),
		E(ArticleNav,{editable:true,now:now2,total:total2,onNext:next2,onPrev:prev2,onChange:change2}),
		E(WLinkNav,{onNextWLink,address:value1}),
		E(User,{onSetUser}),		
		linkEditable()?E(WLinkEditor,Object.assign({},props,{onDeleteLink})):
			E(WLinkBuilder,Object.assign({},props,{linkable,onMakeLink}))
	);
}
module.exports=LinkerTab;