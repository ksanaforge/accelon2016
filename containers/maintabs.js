const React =require('react');
const E=React.createElement;
const MUITabs=require("../components/muitabs");
const CorpusView=require("ksana-corpus-view").CorpusView;
const ExcerptView=require("../components/excerptview");
const TabCloseButton=require("../components/tabclosebutton");
const ArticleList=require("../components/articlelist");
const styles={
	navcontainer:{position:"relative",zIndex:200},
	nav:{position:"absolute",right:19}
}

const MainTabs=React.createClass({
	getInitialState(){
		return this.createPanes();
	}
	,onSelectItem(address){
		this.props.updateArticleByAddress(address);
		this.setState({menuopen:false});
	}
	,componentWillReceiveProps(nextProps) {		
		this.setState(this.createPanes(nextProps));
	}
	,createPanes(props){
		props=props||this.props;
		const topmargin=props.topMargin||"0px";
		//prevent vertical scrollbar by 49.8vh, not 50.vh
		const resultstyle={ height: "-webkit-calc(49.8vh - "+parseFloat(topmargin,10)/2+"em )"} ;
		const containerstyle={ height: "-webkit-calc(99.6vh - "+topmargin+")"} ;		

		const actions={
			decorators:this.props.decorators,
			updateArticleByAddress:this.props.updateArticleByAddress,
			openLink:this.props.openLink,
			setSelection:this.props.setSelection,
			removeAllUserLinks:this.props.removeAllUserLinks,
			copyText:this.props.copyText
		}		

		const tabs=props.articles.map((a)=>[a.id,a.title]);
		var rightButtons=[];
		const panes=props.articles.map(function(a,idx){
			var article=a;
			const active=props.activeArticle==idx;
			const ranges=props.selections[article.id].ranges;
			const viewprops=Object.assign({},article,{rawlines:article.rawlines},actions,
				{ranges,setSelection:props.setSelection,active,decorators:props.decorators});
			const excerptprops=Object.assign({}, props.excerpts,actions,
				{corpus:article.corpus,goOccur:props.goOccur,now:(props.query||{}).now});
			const caretpos=props.selections[article.id].caretpos;

			rightButtons.push(article.rightButton||TabCloseButton);
			const isresultview=idx==0;
			const navprops={caretpos,corpus:article.corpus,onSelectItem:this.onSelectItem};

			return E("div",{style:isresultview?resultstyle:containerstyle},
				E("div",{style:styles.navcontainer},
					E("div",{style:styles.nav},E(article.nav||props.nav,navprops))),
				E(article.view||CorpusView,viewprops)
				,isresultview?E(ExcerptView,excerptprops):null
			);
		}.bind(this));
		return {rightButtons,tabs,panes}
	}
	,onSelectTab(newtab,oldtab){
		const tab=this.props.articles[newtab];
		if (!tab) return true;
		this.props.setActiveArticle(tab.id );
		return true; //do not change tab now
	}	
	,onRightButtonClick(i){
		if (!this.props.articles[i].rightButton) {
			this.props.closeArticle(this.props.articles[i].id);	
		} else { //clone button
			this.props.cloneArticle(this.props.articles[i].id);
		}
	}
	,onLabelEnter(idx,menux,menuy){
		const article=this.props.articles[idx];
		if (!article || !article.corpus)return;
		this.clearTimeout();
		this.openmenutimer=setTimeout(()=>{
			this.setState({menuopen:true,menux,menuy,menuidx:idx});
		},300);
	}
	,clearTimeout(){
		clearTimeout(this.openmenutimer);
		clearTimeout(this.closemenutimer);
	}
	,onLabelLeave(){
		this.clearTimeout();
		this.closemenutimer=setTimeout(()=>{			
		},500);
	}
	,closeMenu(){
		this.setState({menuopen:false});
	}
	,renderArticleList(){
		if (this.props.activeArticle!==this.state.menuidx) return ;
		const article=this.props.articles[this.state.menuidx];
		const corpus=article.corpus, address=article.address;
		return E(ArticleList,{close:this.closeMenu,corpus,address,
			onSelectItem:this.onSelectItem,
			menux:this.state.menux,menuy:this.state.menuy,article:article.article});
	}
	,render(){
		return E("div",{},
		this.state.menuopen&&this.renderArticleList(),
		E(MUITabs,{onSelectTab:this.onSelectTab,
			tabs:this.state.tabs,panes:this.state.panes,
			selected:this.props.activeArticle,rightButtons:this.state.rightButtons,
			onLabelEnter:this.onLabelEnter,onLabelLeave:this.onLabelLeave,
			closable:true,onRightButtonClick:this.onRightButtonClick,panel:this.props.viewOptions})
		)
	}
})

module.exports=MainTabs;