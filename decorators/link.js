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
	if (linech.ch==end.ch && linech.line==end.line) {
		const dom=document.createElement("span");
		dom.className="notelink";
		dom.onmousedown=onLinkMouseDown;
		dom.cor=cor;
		dom.innerHTML=target;
		cm.setBookmark(linech,{widget:dom,handleMouseEvents:true});
	} else {
		cm.markText(linech,end,{className:"link"});
		//dom.innerHTML=text;
	}

}
module.exports=createLink;