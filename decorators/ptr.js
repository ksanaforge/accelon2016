const onPtrMouseDown=function(e){
	const target=e.target;
	const address=parseInt(target.dataset.target,10);
	e.stopPropagation();
}

var entertimer,leavetimer;
const onPtrEnter=function(e){
	const target=e.target;
	clearTimeout(entertimer);
	clearTimeout(leavetimer);
	entertimer=setTimeout(function(){
		//+1 to include tailing puncuation
		const text=target.cor.getText(parseInt(target.dataset.target,10)+1,function(data){
			target.innerHTML=data;
		});
		target.innerHTML=text;//if text is ready, call back will be ignored
	},50);
}
const onPtrLeave=function(e){
	clearTimeout(entertimer);
	clearTimeout(leavetimer);

	const target=e.target;
	leavetimer=setTimeout(function(){
		e.target.innerHTML=e.target.dataset.text;
	},50);
}
const createPtr=function(cm,cor,linech,end,text,target){
	const dom=document.createElement("span");
	dom.className="ptr";
	dom.innerHTML=text;
	dom.dataset.text=text;
	dom.dataset.target=target;
	dom.onmousedown=onPtrMouseDown;
	dom.cor=cor;
	dom.onmouseenter=onPtrEnter;
	dom.onmouseleave=onPtrLeave;
	cm.setBookmark(linech,{widget:dom,handleMouseEvents:true});
}
module.exports=createPtr;