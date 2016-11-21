const onDefMouseDown=function(e){
	const target=e.target;
	const address=parseInt(target.dataset.target,10);
	e.stopPropagation();
}
const createDef=function(cm,cor,linech,end,text,target){
	const dom=document.createElement("span");
	dom.className="def";
	dom.innerHTML=text;
	dom.dataset.text=text;
	dom.dataset.target=target;
	dom.onmousedown=onDefMouseDown;
	dom.cor=cor;
	cm.setBookmark(linech,{widget:dom,handleMouseEvents:true});
}

module.exports=createDef;