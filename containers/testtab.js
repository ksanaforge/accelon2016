const React=require("react");
const E=React.createElement;
//const ArticleActions=require("../actions/articles");
//const { bindActionCreators } =require('redux');
//const { connect } = require('react-redux');

const testtab=function(props){//4p1.0101
	const onClick=()=>props.openAt({corpus:"yinshun",address:"59p9.0301"});//address:""
	return E("div",{},
		E("button",{onClick},"Open article")
	);
}
/*
function mapDispatchToProps(dispatch,ownProps) {
	const boundarticleactions=bindActionCreators(ArticleActions, dispatch);
	return boundarticleactions;
}
*/
module.exports=testtab;
//module.exports=connect(null,mapDispatchToProps)(testtab);