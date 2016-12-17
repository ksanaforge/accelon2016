const {makeWLinkId}=require("../units/link");
const setinnerhtml=function(dom){
	const addrs=dom.target.split(";");
	if (addrs.length>1) {
		dom.innerHTML = (dom.nlink+1)+"/"+addrs.length+" "+addrs[dom.nlink];
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
	const fulladdress=e.target.target;
	const addrs=fulladdress.split(";");
	if (addrs.length==1) {
		linkaction(target.actions,fulladdress,target.kpos);
	} else {
		setinnerhtml(target);
		linkaction(target.actions,addrs[target.nlink],target.kpos);
		target.nlink++;
		if(target.nlink>=addrs.length) target.nlink=0;
	}

}

const createLink=function({cm,cor,kpos,start,end,id,target,actions}){
	const dom=document.createElement("span");
	dom.className="notelink";
	if (target.indexOf(";")>-1) dom.className="notelink2";
	dom.onmousedown=onLinkMouseDown;
	dom.cor=cor;
	dom.nlink=0;//target might have multiple link
	dom.target=target;
	setinnerhtml(dom);	
	dom.actions=actions;
	dom.kpos=kpos;
	cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}
module.exports=createLink;