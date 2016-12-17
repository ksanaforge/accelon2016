const React=require("react");
const E=React.createElement;
const LinkSelection=require("./linkselection");

const styles={
	label:{color:"silver"}
}
var previousactive=null;
var createtime=null;    //to record time taken by selecting corresponding text
const WLinkBuilder=(props)=>{	
	if (props.linkable && previousactive!==props.activeWLink) {
		createtime=new Date();
		previousactive=props.activeWLink;
	}
	const onMakeLink=()=>{
		props.onMakeLink(createtime);
	}

	return E("div",{},
		E("div",{style:styles.label},props.activeWLink),
		props.linkable?E(LinkSelection,{onMakeLink}):null
	)
}
			

module.exports=WLinkBuilder;