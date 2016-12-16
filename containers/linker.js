const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');
const CorpusActions=require("../actions/corpus");
const ArticleActions=require("../actions/article");
const SelectionActions=require("../actions/selection");
const LinkActions=require("../actions/link");

const LinkerDesktop =require('./linkerdesktop');
function mapStateToProps(state,ownProps) {  
  var wlinkkey="";
  if (state.articles[1]&&state.articles[2]) {
    wlinkkey=state.articles[2].corpus+"_"+state.articles[1].corpus;
  }
  return {
    corpora: state.corpora,
    selections: state.selections,
    rightarticle:state.articles[1],
    leftarticle:state.articles[2],
    articles:state.articles,
    activeWLink:state.activeWLink,
    workinglinks:ownProps.remotedata.workinglinks[wlinkkey]||[]
  };
}

function mapDispatchToProps(dispatch,ownProps) {
	const boundcorpus=bindActionCreators(CorpusActions, dispatch);
	const boundarticle=bindActionCreators(ArticleActions, dispatch);
  const boundselection=bindActionCreators(SelectionActions, dispatch);
  const boundlink=bindActionCreators(LinkActions, dispatch);
	const bound=Object.assign({},boundcorpus,boundarticle, boundselection, boundlink);
  return bound; 
}

module.exports=connect(mapStateToProps, mapDispatchToProps)(LinkerDesktop);