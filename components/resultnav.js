const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const OccurIndicator=require("./occurindicator")
const ResultNav=(props)=>{
	const {now=0,total=100}=props;
	const onPrev=()=>{}
	const onNext=()=>{}
	var disabled=false;
	return E("div",{},
			E("button",{className:"mui-btn mui-btn--flat",disabled,onClick:onPrev},"◀"),
			E(OccurIndicator,{now,total}),
			E("button",{className:"mui-btn mui-btn--flat",disabled,onClick:onNext},"▶")
			);
}

module.exports=ResultNav;