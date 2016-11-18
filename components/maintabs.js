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
	const panes=props.articles.map((a,idx)=>{
		if (a.active) selected=idx;
		return E("div",{style:styles.container},E(CorpusView,a))
	});
	const tabs=props.articles.map((a)=>[a.id,a.title]);
	
	const onSelectTab=(newtab,oldtab)=>{
		const tab=props.articles[newtab];
		if (!tab) return true;
		props.setActiveArticle(tab.id );
		return true; //do not change tab now
	}
	const onClose=(i)=>{
		props.closeArticle(props.articles[i].id);
	}
	return E("div",this.props,
		E(MUITabs,{onSelectTab,tabs,panes,selected,closable:true,onClose})
	)
}

module.exports=MainTabs;