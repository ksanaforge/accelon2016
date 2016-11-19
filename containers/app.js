const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');
const Desktop =require('./desktop');
const CorpusActions=require('../actions/corpus');
const ArticlesActions=require('../actions/articles');
const ArticleActions=require('../actions/article');

function mapStateToProps(state,ownProps) {
	const activeArticle=state.articles.filter((a)=>a.active)[0];
  return {
  	activeArticle,
    articles: state.articles,
    corpus: state.corpus
  };
}

function mapDispatchToProps(dispatch,ownProps) {
	const boundcorpusactions=bindActionCreators(CorpusActions, dispatch);
	const boundarticlesactions=bindActionCreators(ArticlesActions, dispatch);
	const boundarticleactions=bindActionCreators(ArticleActions, dispatch);
	const bound=Object.assign({},boundcorpusactions,boundarticlesactions,boundarticleactions);
  return bound; 
}

module.exports=connect(mapStateToProps, mapDispatchToProps)(Desktop);