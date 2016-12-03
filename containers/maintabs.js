const React =require('react');
const E=React.createElement;
const MUITabs=require("../components/muitabs");
const CorpusView=require("../components/corpusview");
const ExcerptView=require("../components/excerptview");
const TabCloseButton=require("../components/tabclosebutton");
const styles={
	navcontainer:{position:"relative",zIndex:200},
	nav:{position:"absolute",right:19}
}

const MainTabs=(props)=>{	
	const topmargin=props.topMargin||"0px";
	//prevent vertical scrollbar by 49.8vh, not 50.vh
	const resultstyle={ height: "-webkit-calc(49.8vh - "+parseFloat(topmargin,10)/2+"em )"} ;
	const containerstyle={ height: "-webkit-calc(100vh - "+topmargin+")"} ;

	const onSelectItem=(address)=>props.updateArticleByAddress(address);
	const decorators=props.decorators;
	var rightButtons=[];
	const panes=props.articles.map((a,idx)=>{
		var article=a;
		const active=props.activeArticle==idx;
		const ranges=props.selections[article.id].ranges;
		const viewprops=Object.assign({},article,{rawlines:article.text},
			{updateArticleByAddress:props.updateArticleByAddress,
			ranges,setSelection:props.setSelection,active,decorators});
		const excerptprops=Object.assign({}, props.excerpts,
			{updateArticleByAddress:props.updateArticleByAddress});
		const caretpos=props.selections[article.id].caretpos;

		rightButtons.push(article.rightButton||TabCloseButton);
		const isresultview=idx==0;
		const navprops={caretpos,corpus:article.corpus,onSelectItem};
		return E("div",{style:isresultview?resultstyle:containerstyle},
			E("div",{style:styles.navcontainer},
				E("div",{style:styles.nav},E(article.nav||props.nav,navprops))),
			E(article.view||CorpusView,viewprops)
			,isresultview?E(ExcerptView,excerptprops):null
		);
	});

	var tabs=props.articles.map((a)=>[a.id,a.title]);

	const onSelectTab=(newtab,oldtab)=>{
		const tab=props.articles[newtab];
		if (!tab) return true;
		props.setActiveArticle(tab.id );
		return true; //do not change tab now
	}
	const onRightButtonClick=(i)=>{
		if (!props.articles[i].rightButton) {
			props.closeArticle(props.articles[i].id);	
		}
	}
	return E("div",{},
		E(MUITabs,{onSelectTab,tabs,panes,selected:props.activeArticle,rightButtons,
			closable:true,onRightButtonClick,panel:props.viewOptions})
	)
}

module.exports=MainTabs;