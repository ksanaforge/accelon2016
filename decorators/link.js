const onLinkMouseDown=function(e){
	const target=e.target;
	const address=parseInt(target.dataset.target,10);
	e.stopPropagation();
}

var entertimer,leavetimer;
const onLinkEnter=function(e){
	clearTimeout(entertimer);
	clearTimeout(leavetimer);
	const target=e.target;
	entertimer=setTimeout(function(){
		target.innerHTML=target.dataset.target;	
	},100);
}
const onLinkLeave=function(e){
	clearTimeout(entertimer);
	clearTimeout(leavetimer);

	const target=e.target;
	leavetimer=setTimeout(function(){
		e.target.innerHTML=e.target.dataset.text;
	},50);
}
const createLink=function(cm,cor,linech,end,text,target){
	const dom=document.createElement("span");
	dom.className="link";
	dom.innerHTML=target;
	dom.onmousedown=onLinkMouseDown;
	dom.cor=cor;
	//dom.onmouseenter=onLinkEnter;
	//dom.onmouseleave=onLinkLeave;
	cm.setBookmark(linech,{widget:dom,handleMouseEvents:true});
}
module.exports=createLink;