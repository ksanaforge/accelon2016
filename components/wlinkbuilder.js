const React=require("react");
const E=React.createElement;
const LinkSelection=require("./linkselection");
const User=require("./user");
const styles={
	label:{color:"silver"}
}
const WLinkBuilder=(props)=>{
	const onLink=()=>{
		console.log("link")
	}
	return E("div",{},
		E(User),
		E("div",{style:styles.label},"id",props.activeWLink),
		props.linkable?E(LinkSelection,{onLink}):null
	)
}
			

module.exports=WLinkBuilder;