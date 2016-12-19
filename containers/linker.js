const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');
const CorpusActions=require("../actions/corpus");
const ArticleActions=require("../actions/article");
const SelectionActions=require("../actions/selection");
const LinkActions=require("../actions/link");
const UserLinkActions=require("../actions/userlink");

const LinkerDesktop =require('./linkerdesktop');
function mapStateToProps(state,ownProps) {  
  var wlinkkey="";

  var leftarticle=state.articles[1];
  var rightarticle=state.articles[2];
  var rightuserlink={}, leftuserlink={};

  if (leftarticle && rightarticle) {
    if (leftarticle.corpus!==ownProps.corpus1) {
      const t=leftarticle;
      leftarticle=rightarticle;
      rightarticle=t;
    }
    wlinkkey=leftarticle.corpus+"_"+rightarticle.corpus;
    rightuserlink=state.userLink[rightarticle.corpus]||{};
    leftuserlink=state.userLink[leftarticle.corpus]||{};
  }
  return {
    corpora: state.corpora,
    selections: state.selections,
    rightarticle,
    leftarticle,
    articles:state.articles,
    activeWLink:state.activeWLink,
    workinglinks:ownProps.remotedata.workinglinks[wlinkkey]||{},
    rightuserlink,
    leftuserlink
  };
}

function mapDispatchToProps(dispatch,ownProps) {
	const boundcorpus=bindActionCreators(CorpusActions, dispatch);
	const boundarticle=bindActionCreators(ArticleActions, dispatch);
  const boundselection=bindActionCreators(SelectionActions, dispatch);
  const boundlink=bindActionCreators(LinkActions, dispatch);
  const bounduserlink=bindActionCreators(UserLinkActions, dispatch);
	const bound=Object.assign({},boundcorpus,boundarticle, boundselection, 
    boundlink, bounduserlink);
  return bound; 
}

module.exports=connect(mapStateToProps, mapDispatchToProps)(LinkerDesktop);