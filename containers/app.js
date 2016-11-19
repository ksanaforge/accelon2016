const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');
const Desktop =require('./desktop');
const CorpusActions=require('../actions/corpus');
const ArticlesActions=require('../actions/articles');
const ArticleActions=require('../actions/article');
const SelectionActions=require('../actions/selection');

function mapStateToProps(state,ownProps) {
	const activeArticle=state.articles[state.activeArticleTab];
  return {
    articles: state.articles,
    activeArticleTab:state.activeArticleTab,
    selections: state.selections,
    corpus: state.corpus,
    activeArticle
  };
}

function mapDispatchToProps(dispatch,ownProps) {
	const boundcorpus=bindActionCreators(CorpusActions, dispatch);
	const boundarticles=bindActionCreators(ArticlesActions, dispatch);
	const boundarticle=bindActionCreators(ArticleActions, dispatch);
  const boundselection=bindActionCreators(SelectionActions, dispatch);
	const bound=Object.assign({},boundcorpus,boundarticles,boundarticle,boundselection);
  return bound; 
}

module.exports=connect(mapStateToProps, mapDispatchToProps)(Desktop);