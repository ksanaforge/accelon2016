const React=require("react");
const E=React.createElement;

const TabCloseButton=(props)=>{
	const onClick=(e)=>{
		const i=parseInt(e.target.dataset.idx,10);
		props.onClick(i);
	}
	return E("span",{className:"closebutton",onClick,"data-idx":props.i},"×");
}

module.exports=TabCloseButton;