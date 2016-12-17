const React=require("react");
const E=React.createElement;
const LinkSelection=require("./linkselection");
const User=require("./user");
const styles={
	label:{color:"silver"}
}
var previousactive=null;
var createtime=null;    //to record time taken by selecting corresponding text
var user="";
const WLinkBuilder=(props)=>{	
	if (props.linkable && previousactive!==props.activeWLink) {
		createtime=new Date();
		previousactive=props.activeWLink;
	}
	const onMakeLink=()=>{
		props.onMakeLink(createtime,user);
	}
	const onSetUser=(_user)=>{
		user=_user;
	}
	return E("div",{},
		E(User,{onSetUser}),
		E("div",{style:styles.label},props.activeWLink),
		props.linkable?E(LinkSelection,{onMakeLink}):null
	)
}
			

module.exports=WLinkBuilder;