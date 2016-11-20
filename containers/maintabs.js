const React =require('react');
const E=React.createElement;
const MUITabs=require("../components/muitabs");
const CorpusView=require("../components/corpusview");
const styles={
	navcontainer:{position:"relative",zIndex:200},
	nav:{position:"absolute",right:19}
}

const MainTabs=(props)=>{	
	const topmargin=props.topMargin||"0px";
	const containerstyle={ height: "-webkit-calc(100vh - "+topmargin+")"} ;

	const onSelectItem=(address)=>props.updateArticleByAddress(address);

	const panes=props.articles.map((a,idx)=>{
		var article=a;
		const focus=props.activeArticleTab==idx;
		const ranges=props.selections[article.id].ranges;
		const viewprops=Object.assign({},article,{ranges,setSelection:props.setSelection,focus});

		const caretpos=props.selections[article.id].caretpos;

		const navprops={caretpos,corpus:article.corpus,onSelectItem};
		return E("div",{style:containerstyle},
			E("div",{style:styles.navcontainer},
				E("div",{style:styles.nav},E(props.nav,navprops))),
			E(CorpusView,viewprops)
		);
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
	return E("div",{},
		E(MUITabs,{onSelectTab,tabs,panes,selected:props.activeArticleTab,
			closable:true,onClose,panel:props.viewOptions})
	)
}

module.exports=MainTabs;