const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');

const React =require('react');
const E=React.createElement;
const ArticleActions=require("../actions/article");
const ExcerptActions=require("../actions/excerpts");
const SetExcerptLine=require("../components/setexcerptline");

const CorpusViewOptions=React.createClass({
	getInitialState(){
		return {caretposH:this.props.caretposH}
	}
	,componentWillReceiveProps(nextprops){
		if (nextprops.caretposH!==this.state.caretposH) {
			this.setState({caretposH:nextprops.caretposH});
		}
	}
	,onChange(e){
		this.setState({caretposH:e.target.value});
	}
	,onKeyPress(e) {
		if (e.key=="Enter") {
			this.props.updateArticleByAddress(this.state.caretposH);
		}
	}
	,nextArticle(){
		this.props.nextArticle();
	}
	,prevArticle(){
		this.props.prevArticle();
	}
	,onSetExcerptLine(line){
		this.props.setExcerptLine(line);
	}
	,render(){
		return E("div",{},
		E("button",{onClick:this.props.toggleLayout},"layout")
		,E(SetExcerptLine,{excerptline:this.props.excerptline,
			onSetExcerptLine:this.onSetExcerptLine})
		,E("br")
		,E("button",{onClick:this.prevArticle},"prev")
		,E("button",{onClick:this.nextArticle},"next")
		,E("br")
		
		,E("input",{size:10,value:this.state.caretposH,onKeyPress:this.onKeyPress,
			onChange:this.onChange})
		)
	}
});

function mapStateToProps(state,ownProps) {
	const activeArticle=state.articles[state.activeArticle];
	const caretposH=state.selections[activeArticle.id].caretposH;
	const excerptline=state.excerpts.excerptline;
	return Object.assign({},activeArticle, {caretposH,excerptline} );
}

function mapDispatchToProps(dispatch,ownProps) {
	const boundarticleactions=bindActionCreators(ArticleActions, dispatch);
	const boundexcerptactions=bindActionCreators(ExcerptActions,dispatch);
	const bound=Object.assign({},boundarticleactions,boundexcerptactions);
  return bound; 
}

module.exports=connect(mapStateToProps,mapDispatchToProps)(CorpusViewOptions);