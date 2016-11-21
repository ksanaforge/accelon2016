const onNoteMouseDown=function(e){

}
var entertimer,leavetimer;
const onNoteEnter=function(e){
	clearTimeout(entertimer);
	clearTimeout(leavetimer);
	const target=e.target;
	entertimer=setTimeout(function(){
		target.innerHTML=target.dataset.target;	
	},100);
}
const onNoteLeave=function(e){
	clearTimeout(entertimer);
	clearTimeout(leavetimer);

	const target=e.target;
	leavetimer=setTimeout(function(){
		e.target.innerHTML=e.target.dataset.text;
	},50);
}

const note=function(cm,cor,linech,end,text,target){
	const dom=document.createElement("span");
	dom.className="note";
	dom.innerHTML=text;
	dom.dataset.text=text;
	dom.dataset.target=target;
	dom.onmousedown=onNoteMouseDown;
	dom.onmouseenter=onNoteEnter;
	dom.onmouseleave=onNoteLeave;
	dom.cor=cor;
	cm.setBookmark(linech,{widget:dom,handleMouseEvents:true});
}

module.exports=note;