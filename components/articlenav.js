const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const OccurNav=require("./occurnav");
const ArticleNav=React.createClass({
	propTypes:{
		now:PT.number.isRequired,
		total:PT.number.isRequired,
		onNext:PT.func.isRequired,
		onPrev:PT.func.isRequired,
		editable:PT.bool,
		onChange:PT.func
	}
	,render(){
		return E(OccurNav,{editable:this.props.editable,onChange:this.props.onChange,
			now:this.props.now,count:this.props.total,onNext:this.props.onNext,onPrev:this.props.onPrev});
	}
})
module.exports=ArticleNav;