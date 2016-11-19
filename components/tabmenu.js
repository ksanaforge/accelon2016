const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	menubutton:{float:"left",color:"silver",
	userSelect:"none",cursor:"pointer"}
	,panel:{position:"absolute",width:150,height:100,borderRadius:"5px",
	top:"1.5em", //height of mui tab bar
	background:"silver",zIndex:255}
}

const TabMenu=React.createClass({
	getInitialState(){
		return {menuopen:false,sticky:false};
	}
	,propTypes:{
		panel:PT.func.isRequired,
	}
	,onMouseEnter(){
		clearTimeout(this.closemenu);
		if (!this.state.menuopen) this.setState({menuopen:true});
	}
	,onMouseLeave(){
		this.closemenu=setTimeout(()=>{
			if (this.state.menuopen && !this.state.sticky) this.setState({menuopen:false});
		},500);
	}
	,toggleMenu(){
		if (!this.state.sticky) {
			this.setState({sticky:true, menuopen:true})	
		} else {
			this.setState({sticky:false, menuopen:false})	
		}
	}
	,render(){
		var caption=this.state.sticky?"⏷":"⏵";
		return E("div",{onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave},
			E("span",{style:styles.menubutton,onClick:this.toggleMenu},caption),
			this.state.menuopen&&E("div",{style:styles.panel},E(this.props.panel))
		)		
	}
});

module.exports=TabMenu;