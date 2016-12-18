/* create handle for a linkedby */
/* multple linkedby share a handle */
/* hover on handle show a list*/
/* hover on list item highlight linkedby text*/
/* click on list item openLink */
const onMouseEnter=(e)=>{

}
const onMouseLeave=(e)=>{

}
const onMouseDown=(e)=>{

}
const createLinkedBy=({cm,cor,start,end,id,target,active,actions})=>{
		const dom=document.createElement("span");
		dom.className="linkedby";
		if (active) dom.className+=" linkedby-active"
		dom.innerHTML="●";
		dom.onmousedown=onMouseDown;
		dom.onmouseenter=onMouseEnter;
		dom.onmouseenter=onMouseLeave;
		dom.action=actions.openLink;
		dom.cor=cor;
		dom.target=target;
		return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}
module.exports=createLinkedBy;