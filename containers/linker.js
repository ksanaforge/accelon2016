const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');
const CorpusActions=require("../actions/corpus");
const ArticleActions=require("../actions/article");
const SelectionActions=require("../actions/selection");

const LinkerDesktop =require('./linkerdesktop');
function mapStateToProps(state,ownProps) {  
  return {
    corpora: state.corpora,
    selections: state.selections,
    rightarticle:state.articles[1],
    leftarticle:state.articles[2],
    articles:state.articles
  };
}

function mapDispatchToProps(dispatch,ownProps) {
	const boundcorpus=bindActionCreators(CorpusActions, dispatch);
	const boundarticle=bindActionCreators(ArticleActions, dispatch);
  const boundselection=bindActionCreators(SelectionActions, dispatch);
	const bound=Object.assign({},boundcorpus,boundarticle, boundselection);
  return bound; 
}

module.exports=connect(mapStateToProps, mapDispatchToProps)(LinkerDesktop);