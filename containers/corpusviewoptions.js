const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');

const React =require('react');
const E=React.createElement;
const ArticleActions=require("../actions/article");

const CorpusViewOptions=(props)=>{
	return E("div",{},
		E("button",{onClick:props.toggleLayout},"layout")
		,E("br")
		,E("button",{onClick:props.prevArticle},"prev")
		,E("button",{onClick:props.nextArticle},"next")
		,E("br")
		,E("span",{},props.caretpos)
	)
}

function mapStateToProps(state,ownProps) {
	const activeArticle=state.articles[state.activeArticleTab];
	const caretpos=state.selections[activeArticle.id].caretpos;
	return Object.assign({},activeArticle, {caretpos} );
}

function mapDispatchToProps(dispatch,ownProps) {
	const boundarticleactions=bindActionCreators(ArticleActions, dispatch);
	const bound=Object.assign({},boundarticleactions);
  return bound; 
}

module.exports=connect(mapStateToProps,mapDispatchToProps)(CorpusViewOptions);