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
	)
}

function mapStateToProps(state,ownProps) {
	const activeArticle=state.articles.filter((a)=>a.active)[0];
	return {activeArticle};
}

function mapDispatchToProps(dispatch,ownProps) {
	const boundarticleactions=bindActionCreators(ArticleActions, dispatch);
	const bound=Object.assign({},boundarticleactions);
  return bound; 
}

module.exports=connect(mapStateToProps,mapDispatchToProps)(CorpusViewOptions);