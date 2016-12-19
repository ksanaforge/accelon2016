const React=require("react");
const E=React.createElement;
const LinkerTab=require("../components/linkertab");
const CorpusView=require("../components/corpusview");
const {openCorpus}=require("ksana-corpus");
const {OPEN_AT}=require("../actions/articles");
const {getQuoteText}=require("../units/quote");
const {getWorkingLinks,getUserLinks}=require("../units/link");
const LinkerDesktop=React.createClass({
	getInitialState(){
		this.actions={
			decorators:this.props.decorators,
			updateArticleByAddress:this.props.updateArticleByAddress,
			openLink:this.props.openLink,
			setActiveWLink:this.props.setActiveWLink,
			setSelection:this.props.setSelection,
			removeAllUserLinks:this.props.removeAllUserLinks,
			corpusCurrentAddress:this.corpusCurrentAddress
		}		
		return {ready:false}
	}
	,corpusCurrentAddress(corpus){
		for (var i in this.props.selections){
			if (this.props.selections[i].corpus==corpus){
				return this.props.selections[i].caretposH;
			}
		}
		return 0;
	}
	,bindData(fromcorpus,narticle,tocorpus,decorator){
		const binding=this.props.remotedata.binding;
		const fromcor=openCorpus(fromcorpus);
		binding(fromcorpus,narticle,tocorpus).on('child_added',(snapshot)=>{
			this.props.addUserLink(snapshot.key,snapshot.val(),fromcorpus,narticle,tocorpus,decorator,fromcor);
		});
		binding(fromcorpus,narticle,tocorpus).on('child_removed',(snapshot)=>{
			this.props.removeUserLink(snapshot.key,snapshot.val(),fromcorpus,narticle,tocorpus);
		});
		return narticle;
	}
	,offbinding(article){
		const {corpus1,corpus2}=this.props;
		if (article==this.bindarticle1) {
			this.props.remotedata.binding(corpus1,this.bindarticle1,corpus2).off('child_added');
			this.props.remotedata.binding(corpus1,this.bindarticle1,corpus2).off('child_removed');			
			this.bindarticle1=-1;
		}
		if (article==this.bindarticle2){
			this.props.remotedata.binding(corpus2,this.bindarticle2,corpus1).off('child_added');
			this.props.remotedata.binding(corpus2,this.bindarticle2,corpus1).off('child_removed');			
			this.bindarticle2=-1;
		}
	}
	,componentWillUnmount(){
		this.props.removeAllUserLinks();
		this.offbinding();
	}
	,componentWillReceiveProps(nextProps){
		if (!this.state.ready&&nextProps.corpora[nextProps.corpus1] && nextProps.corpora[nextProps.corpus2]) {
			if (!nextProps.rightarticle && !nextProps.leftarticle) {
				this.props.fetchArticle(nextProps.corpus1,nextProps.address1,OPEN_AT);
				this.props.fetchArticle(nextProps.corpus2,nextProps.address2,OPEN_AT);
			}
			if (nextProps.leftarticle&&nextProps.rightarticle) {
				if (!this.state.ready) this.setState({ready:true})
			}
		} else if (this.state.ready) {
			if (this.bindarticle1!==nextProps.leftarticle.article.at){
				this.offbinding(this.bindarticle1);
				this.bindarticle1=this.bindData(nextProps.corpus1,nextProps.leftarticle.article.at,nextProps.corpus2,"linkto");
			}
			if (this.bindarticle2!==nextProps.rightarticle.article.at){
				this.offbinding(this.bindarticle2);
				this.bindarticle2=this.bindData(nextProps.corpus2,nextProps.rightarticle.article.at,nextProps.corpus1,"linkedby");
			}
		}
	}
	,componentWillMount(){
		this.props.openCorpus(this.props.corpus1);
		this.props.openCorpus(this.props.corpus2);
	}
	,sourcePos(){
		for (var i in this.props.selections){
			if (this.props.selections[i].corpus==this.props.corpus2){
				return this.props.selections[i].caretpos;
			}
		}
		return 0;
	}
	,findOrigin(cm){
		const quotetext=getQuoteText(cm);
		if (!quotetext)return;
		const searchfrom=this.sourcePos();
  	this.props.findOrigin(quotetext, this.props.corpus2, searchfrom);
	}
	,render(){
		if (!this.state.ready) {
			return E("loading");
		}
		const styles={
			container:{display:"flex",width:"100%"},
			lefttab:{flex:this.props.leftFlex||6},
			righttab:{flex:this.props.rightFlex||4},
			corpustab:{flex:"20",display:"flex"},
			linkertab:{flex:"2"}
		}

		const extraKeys={
			"Ctrl-M": this.findOrigin,
			"Enter":this.followLink
		}	
		const wlink=getWorkingLinks(this.props.workinglinks,this.props.corpus2,this.props.leftarticle.article);
		
		const fields=(wlink)?
		Object.assign({},this.props.leftarticle.fields,{wlink}):this.props.leftarticle.fields;

		const props1=Object.assign({},this.actions,this.props.leftarticle,
			{fields,extraKeys,userfield:this.props.leftuserlink,activeUserfield:this.props.activeWLink});
		const props2=Object.assign({},this.actions,this.props.rightarticle,
			{userfield:this.props.rightuserlink,activeUserfield:this.props.activeWLink});

		return E("div",{style:styles.container},
			E("div",{style:styles.corpustab},
				E("div",{style:styles.lefttab},E(CorpusView,props1)),
				E("div",{style:styles.righttab},E(CorpusView,props2))
			),
			E("div",{style:styles.linkertab},E(LinkerTab,this.props))
		);
	}
});


module.exports=LinkerDesktop;