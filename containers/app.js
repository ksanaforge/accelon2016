const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');
const Desktop =require('../components/desktop');
const CorpusActions=require('../actions/corpus');
const ArticleActions=require('../actions/articles');

function mapStateToProps(state,ownProps) {
  return {
    articles: state.articles,
    corpus: state.corpus
  };
}

function mapDispatchToProps(dispatch,ownProps) {
	const boundcorpusactions=bindActionCreators(CorpusActions, dispatch);
	const boundarticleactions=bindActionCreators(ArticleActions, dispatch);
	const bound=Object.assign({},boundcorpusactions,boundarticleactions);
  return bound; 
}

module.exports=connect(mapStateToProps, mapDispatchToProps)(Desktop);