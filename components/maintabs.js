const React =require('react');
const E=React.createElement;
const MUITabs=require("./muitabs");
const CorpusView=require("./corpusview");
const MainTabs=(props)=>{	
	const topmargin=props.topMargin||"0px";
	var styles={
		container:{ height: "-webkit-calc(100vh - "+topmargin+")"}
	}
	var selected=0;
	const panes=props.articles.map((a)=>{
		if (a.active) selected=a.seq;
		return E("div",{style:styles.container},E(CorpusView,a))
	});
	const tabs=props.articles.map((a)=>[a.seq,a.title]);
	
	const onSelectTab=function(newtab,oldtab){
		props.setActiveArticle(newtab);
		return true; //do not change tab now
	}
	return E("div",this.props,
		E(MUITabs,{onSelectTab,tabs,panes,selected})
	)
}

module.exports=MainTabs;