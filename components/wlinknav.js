const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	button:{cursor:"pointer",userSelect:"none"}
}
const WLinkNav=(props)=>{
	const onClick=()=>{
		props.onNextWLink(props.address);
	}
	return E("div",{},
			E("button",{style:styles.button,onClick},"Next Cue▼")
	);
}

module.exports=WLinkNav;