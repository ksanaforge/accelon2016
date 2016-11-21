const onLinkMouseDown=function(e){
	const target=e.target;
	const address=parseInt(target.dataset.target,10);
	e.stopPropagation();
}
const createLink=function({cm,cor,start,end,id,target}){
	if (start.ch==end.ch && start.line==end.line) {
		const dom=document.createElement("span");
		dom.className="notelink";
		dom.onmousedown=onLinkMouseDown;
		dom.cor=cor;
		dom.innerHTML=target;
		cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
	} else {
		cm.markText(start,end,{className:"link"});
		//dom.onmousedown=onLinkMouseDown;
	}

}
module.exports=createLink;