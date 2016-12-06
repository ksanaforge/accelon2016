const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');
const Desktop =require('./desktop');
const CorpusActions=require('../actions/corpus');
const ArticlesActions=require('../actions/articles');
const ArticleActions=require('../actions/article');
const SelectionActions=require('../actions/selection');
const SearchActions=require('../actions/search');
const OccurActions=require('../actions/occur');
const FilterActions=require('../actions/filter');

function mapStateToProps(state,ownProps) {
	const article=state.articles[state.activeArticle];
	const query=state.querys[state.activeQuery];
	const corpus=state.corpora[state.activeCorpus];
  const filter=state.filters[state.activeCorpus]||{};
  
  return {
    corpora: state.corpora,
    articles: state.articles,
    activeArticle:state.activeArticle,
    activeQuery:state.activeQuery,
    activeCorpus:state.activeCorpus,
    selections: state.selections,
    querys:state.querys,
    excerpts:state.excerpts,
    article,query,corpus,
    filter
  };
}

function mapDispatchToProps(dispatch,ownProps) {
	const boundcorpus=bindActionCreators(CorpusActions, dispatch);
	const boundarticles=bindActionCreators(ArticlesActions, dispatch);
	const boundarticle=bindActionCreators(ArticleActions, dispatch);
  const boundselection=bindActionCreators(SelectionActions, dispatch);
  const boundsearch=bindActionCreators(SearchActions, dispatch);
  const boundoccur=bindActionCreators(OccurActions, dispatch);
  const boundfilter=bindActionCreators(FilterActions, dispatch);
	const bound=Object.assign({},boundcorpus,boundarticles,
    boundarticle,boundselection,boundsearch,boundoccur,boundfilter);
  return bound; 
}

module.exports=connect(mapStateToProps, mapDispatchToProps)(Desktop);