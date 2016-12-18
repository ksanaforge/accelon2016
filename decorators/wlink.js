const {makeWLinkId}=require("../units/link");
const setinnerhtml=function(dom){
	if (dom.target instanceof Array) {
		dom.innerHTML = (dom.nlink+1)+"/"+dom.target.length+" "+dom.target[dom.nlink];
	} else {
		dom.innerHTML=dom.target;
	}
}
const linkaction=function(actions,address,kpos){
	actions.openLink(address);
	actions.setActiveWLink(makeWLinkId(kpos,address));
}
const onLinkMouseDown=function(e){
	e.stopPropagation();
	const target=e.target;
	const address=e.target.target;
	if (address instanceof Array) {
		setinnerhtml(target);
		linkaction(target.actions,address[target.nlink],target.kpos);
		target.nlink++;
		if(target.nlink>=address.length) target.nlink=0;
	} else {
		linkaction(target.actions,fulladdress,target.kpos);
	}

}

const createLink=function({cm,cor,kpos,start,end,id,target,actions}){
	const dom=document.createElement("span");
	dom.className="notelink";
	if (target instanceof Array) dom.className="notelink2";
	dom.onmousedown=onLinkMouseDown;
	dom.cor=cor;
	dom.nlink=0;//target might have multiple link
	dom.target=target;
	setinnerhtml(dom);	
	dom.actions=actions;
	dom.kpos=kpos;
	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}
module.exports=createLink;