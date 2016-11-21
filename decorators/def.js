const onDefMouseDown=function(e){
	const target=e.target;
	const address=parseInt(target.dataset.target,10);
	e.stopPropagation();
	target.action(address);
}
const createDef=function({cm,cor,start,end,id,target,actions}){
	const dom=document.createElement("span");
	dom.className="def";
	dom.innerHTML=id;
	dom.dataset.target=target;
	dom.onmousedown=onDefMouseDown;
	dom.action=actions.updateArticleByAddress;
	dom.cor=cor;
	cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}

module.exports=createDef;