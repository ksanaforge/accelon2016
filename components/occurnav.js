const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const OccurIndicator=require("./occurindicator")
const styles={
	button:{cursor:"pointer",userSelect:"none"}
}
const OccurNav=(props)=>{
	const {now=0,count=0}=props;
	const disabled=count==0;
	return E("div",{},
			E("span",{style:styles.button,disabled,onClick:props.onPrev},"◀"),
			E(OccurIndicator,{editable:props.editable,onChange:props.onChange,now,count}),
			E("span",{style:styles.button,disabled,onClick:props.onNext},"▶")
			);
}

module.exports=OccurNav;