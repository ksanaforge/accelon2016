const React=require("react");
const E=React.createElement;
const LinkerTab=require("../components/linkertab");
const CorpusView=require("../components/corpusview");
const {openCorpus}=require("ksana-corpus");
const {OPEN_AT}=require("../actions/articles");
const {getQuoteText}=require("../units/quote");
const {getWorkingLinks}=require("../units/link");
const LinkerDesktop=React.createClass({
	getInitialState(){
		return {ready:false}
	}
	,added(key,val,from,article,to){
		console.log("added",arguments)
	}
	,remove(key,val,from,article,to){
		console.log("removed",arguments)
	}
	,bindData(from,article,to){
		if (article==this.onarticle)return;
		console.log(from,article,to)
		this.offbinding(from,to);
		const binding=this.props.remotedata.binding;

		binding(from,article,to).on('child_added',(snapshot)=>{
			this.added.call(this,snapshot.key,snapshot.val(),from,article,to);
		});
		binding(from,article,to).on('child_removed',(snapshot)=>{
			this.removed.call(this,snapshot.key,snapshot.val(),from,article,to);
		});
		this.onarticle=article;
	}
	,offbinding(from,to){
		if (this.onarticle) {
			this.props.remotedata.binding(from,this.onarticle,to).off('child_added');
			this.props.remotedata.binding(from,this.onarticle,to).off('child_removed');
		}		
	}
	,componentWillUnmount(){
		this.offbinding(this.props.corpus2,this.props.corpus1);
	}
	,componentWillReceiveProps(nextProps){
		if (!this.state.ready&&nextProps.corpora[nextProps.corpus1] && nextProps.corpora[nextProps.corpus2]) {
			if (!nextProps.rightarticle && !nextProps.leftarticle) {
				this.props.fetchArticle(nextProps.corpus1,nextProps.address1,OPEN_AT);
				this.props.fetchArticle(nextProps.corpus2,nextProps.address2,OPEN_AT);
			} else {
				this.bindData(nextProps.corpus2,nextProps.rightarticle.article.at,nextProps.corpus1);
			}

			if (nextProps.leftarticle&&nextProps.rightarticle) {
				this.setState({ready:true})
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
			corpustab:{flex:16,display:"flex"},
			linkertab:{flex:2}
		}
		const actions={
			decorators:this.props.decorators,
			updateArticleByAddress:this.props.updateArticleByAddress,
			openLink:this.props.openLink,
			setSelection:this.props.setSelection
		}
		const extraKeys={
			"Ctrl-M": this.findOrigin
		}	
		const wlink=getWorkingLinks(this.props.workinglinks,this.props.corpus2,this.props.leftarticle.article);
		const fields=(wlink)?
		Object.assign({},this.props.leftarticle.fields,{wlink}):this.props.leftarticle.fields;

		const props1=Object.assign({},actions,this.props.leftarticle,{extraKeys,fields});
		const props2=Object.assign({},actions,this.props.rightarticle,{});
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