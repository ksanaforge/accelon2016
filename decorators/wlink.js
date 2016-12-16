const setinnerhtml=function(dom){
	const addrs=dom.target.split(";");
	if (addrs.length>1) {
		dom.innerHTML = (dom.nlink+1)+"/"+addrs.length+" "+addrs[dom.nlink];
	} else {
		dom.innerHTML=dom.target;
	}
}
const onLinkMouseDown=function(e){
	e.stopPropagation();
	const target=e.target;
	const fulladdress=e.target.target;
	if (!target.action) {
		console.error("action openLink is not defined",fulladdress);
	}
	const addrs=fulladdress.split(";");
	if (addrs.length==1) {
		target.action&&target.action(fulladdress);
	} else {
		target.action&&target.action(addrs[target.nlink]);
		target.nlink++;
		if(target.nlink>=addrs.length) target.nlink=0;
		setinnerhtml(target);
	}
}

const createLink=function({cm,cor,start,end,id,target,actions}){
	const dom=document.createElement("span");
	dom.className="notelink";
	if (target.indexOf(";")>-1) dom.className="notelink2";
	dom.onmousedown=onLinkMouseDown;
	dom.cor=cor;
	dom.nlink=0;//target might have multiple link
	dom.target=target;
	setinnerhtml(dom);	
	dom.action=actions.openLink;
	cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}
module.exports=createLink;