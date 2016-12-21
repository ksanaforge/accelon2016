const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	button:{cursor:"pointer",userSelect:"none",background:"lightblue"},
	label:{color:"silver",fontWeight:100},
	done:{color:"lightblue",fontWeight:700,fontSize:"130%"}
}
const WLinkNav=(props)=>{
	const onClick=()=>{
		props.onNextWLink(props.address);
	}
	return E("div",{},
			E("span",{style:styles.label},"linked "),
			E("span",{style:styles.done},Object.keys(props.userlink).length),
			E("br"),
			E("button",{style:styles.button,onClick},"Next Cue▼")
	);
}

module.exports=WLinkNav;