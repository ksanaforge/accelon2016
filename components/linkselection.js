const React=require("react");
const E=React.createElement;

const LinkSelection=React.createClass({
	render(){
		return (E("button",{onClick:this.props.onMakeLink},"LINK★"));
	}
});
module.exports=LinkSelection;