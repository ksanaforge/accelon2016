const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const OccurIndicator=require("./occurindicator")
const ResultNav=(props)=>{
	const {now=0,count=0}=props;
	const disabled=count==0;
	return E("div",{},
			E("button",{className:"mui-btn mui-btn--flat",disabled,onClick:props.onPrev},"◀"),
			E(OccurIndicator,{now,count}),
			E("button",{className:"mui-btn mui-btn--flat",disabled,onClick:props.onNext},"▶")
			);
}

module.exports=ResultNav;