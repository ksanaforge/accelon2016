const setinnerhtml=function(dom){
	if (dom.target instanceof Array) {
		dom.innerHTML = (dom.nlink+1)+"/"+dom.target.length+" "+dom.target[dom.nlink].to;	
	} else {
		dom.innerHTML=dom.target.to;
	}
}
const updateLabel=function(dom){
	setinnerhtml(dom);
	//TODO , highlight source range	
}
const onMouseEnter=function(e){
	const dom=e.target;
	const targetcorpus=(dom.target instanceof Array)?dom.target[0].corpus:dom.target.corpus;
	dom.restore=targetcorpus+"@"+dom.actions.corpusCurrentAddress(targetcorpus);
	dom.opencount=0;
	dom.innerHTML= (dom.target instanceof Array) ? dom.target.length:dom.target.to;
}
const onMouseLeave=function(e){
	const dom=e.target;
	dom.innerHTML="●";
	if (dom.restoring) {
		if (dom.opencount) dom.actions.openLink(dom.restore);
		dom.restoring=false;
	}
}
const onMouseUp=function(e){
	const dom=e.target;
	dom.restoring=true;
}
const onMouseDown=function(e){
	const dom=e.target;
	dom.restoring=false;
	e.stopPropagation();
	var lnk=e.target.target;
	var link=e.target.target;
	if (link instanceof Array) {
		updateLabel(dom);
		lnk=link[dom.nlink];
		dom.nlink++;
		if(dom.nlink>=link.length) dom.nlink=0;
	}
	dom.actions.openLink(lnk.corpus+"@"+lnk.to);
	dom.opencount++;
}

const createLinkedBy=({cm,cor,start,end,id,target,active,actions})=>{
	const dom=document.createElement("span");
	dom.className="linkedby";
	if (active) dom.className+=" linkedby-active"
	dom.innerHTML="●";
	dom.onmouseenter=onMouseEnter;
	dom.onmouseleave=onMouseLeave;
	dom.onmousedown=onMouseDown;
	dom.onmouseup=onMouseUp;
	dom.actions=actions;
	dom.cor=cor;
	dom.nlink=0;
	dom.target=target;
	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}
module.exports=createLinkedBy;