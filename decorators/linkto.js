const onLinkMouseDown=function(e){
	const target=e.target;
	const fulladdress=e.target.target;
	e.stopPropagation();
	if (!target.action) {
		console.error("action openLink is not defined");
	}
	target.action&&target.action(fulladdress);	
}

const createLinkTo=({cm,cor,start,end,id,target,active,actions})=>{
		return cm.markText(start,end,{className:active?"linkto-active":"linkto"});
}
module.exports=createLinkTo;