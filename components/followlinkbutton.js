/*TODO show multiple link 
highlight range when hover

yinshun@57p1262.1301 has two sources

*/
const {hasUserLinkAt}=require("../units/link");
const onlinkbutton=function(e){
	e.stopPropagation();
	e.target.actions.openLink(e.target.target);
}
var linkbutton;
const followLinkButton=function(cm,kpos,fields,actions){
	const links=hasUserLinkAt(kpos,fields);
	if (linkbutton) {
		linkbutton.clear();
		linkbutton=null;
	}
	if (!links.length)return;

	const id=links[0];
	var widget=document.createElement("span");
	widget.className="followbutton";
	widget.target=fields[id].corpus+"@"+fields[id].to;
	widget.innerHTML=widget.target;
	widget.onmousedown=onlinkbutton;
	widget.actions=actions;
	linkbutton=cm.setBookmark(cm.getCursor(),{widget,handleMouseEvents:true} );
}
module.exports=followLinkButton;