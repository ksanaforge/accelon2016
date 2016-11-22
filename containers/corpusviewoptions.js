const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');

const React =require('react');
const E=React.createElement;
const ArticleActions=require("../actions/article");

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
	,render(){
		return E("div",{},
		E("button",{onClick:this.props.toggleLayout},"layout")
		,E("br")
		,E("button",{onClick:this.props.prevArticle},"prev")
		,E("button",{onClick:this.props.nextArticle},"next")
		,E("br")
		,E("input",{size:10,value:this.state.caretposH,onKeyPress:this.onKeyPress,
			onChange:this.onChange})
		)
	}
});

function mapStateToProps(state,ownProps) {
	const activeArticle=state.articles[state.activeArticleTab];
	const caretposH=state.selections[activeArticle.id].caretposH;
	return Object.assign({},activeArticle, {caretposH} );
}

function mapDispatchToProps(dispatch,ownProps) {
	const boundarticleactions=bindActionCreators(ArticleActions, dispatch);
	const bound=Object.assign({},boundarticleactions);
  return bound; 
}

module.exports=connect(mapStateToProps,mapDispatchToProps)(CorpusViewOptions);