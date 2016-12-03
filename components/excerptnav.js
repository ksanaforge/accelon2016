const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	container:{textAlign: "right",fontSize:14},
	pager:{textAlign:"center",marginLeft:3,cursor:"pointer",color:"#AfAfAf",
	background:"#2f2f2f",borderRadius:"50%",height:"1.5em",width:"1.5em",display:"inline-block"},

	selected:{textAlign:"center",marginLeft:3,color:"red",background:"silver",
	borderRadius:"50%",height:"1.5em",width:"1.5em",display:"inline-block"}
}
const ExcerptNav=React.createClass({
	renderPager(){
		var out=[],style={};
		for (let i=0;i<this.state.buttons;i++) {
			style=this.state.selected==i?styles.selected:styles.pager;
			out.push( E("span",{style,key:i},(i+10)));
		}
		return out;
	}
	,getInitialState(){
		return {buttons:10 , selected:1};
	}
	,render(){
		return E("div",{style:styles.container},
			this.renderPager()
		);
	}
})
module.exports=ExcerptNav;